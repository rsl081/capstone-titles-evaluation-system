using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    // [Authorize]
    public class ContentsController : BaseApiController
    {
        private readonly IPhotoService _photoService;
        
        public ContentsController(
            IPhotoService photoService,
            DataContext dataContext, IMapper mapper)
            : base(dataContext, mapper)
        {
          this._photoService = photoService;
        }
        
        [HttpPost]
        public async Task<ActionResult> CreateContent(ContentCreateDto
         contentCreateDto)
        {
            var content = _mapper.Map<ContentCreateDto, 
                            Content>(contentCreateDto);

            _dataContext.Contents.Add(content);
            await _dataContext.SaveChangesAsync();

            return Ok("Successfully Created");
        }

        [HttpGet]
        public async Task<ActionResult> GetContents()
        {
            return Ok(await _dataContext.Contents.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteContent(Guid id)
        {
            var content = await _dataContext.Contents.FindAsync(id);

            if(content == null) return BadRequest();

            _dataContext.Contents.Remove(content);
            var result = await _dataContext.SaveChangesAsync();

            if (result <= 0)
            {
                return BadRequest("Problem adding deleting content");
            }
            
            
            return Ok("Successfully Deleted");
        }

        

        [HttpPut("{id}")]
        public async Task<ActionResult<ContentCreateDto>> EditContent(
            Guid id, 
            ContentCreateDto contentCreateDto)
        {
            var content = await _dataContext.Contents.FindAsync(id);

            if(content == null) return BadRequest();

            _mapper.Map(contentCreateDto, content);

            _dataContext.Contents.Update(content);
            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("add-photo/{id}")]
        public async Task<ActionResult<ContentPhotoCreateDto>> AddPhoto(
            IFormFile file, Guid id)
        {
            var content = await _dataContext.Contents.SingleOrDefaultAsync(
                x => x.Id == id);

            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            content.Url = result.SecureUrl.AbsoluteUri;
            content.PublicId = result.PublicId;
            
            _dataContext.Contents.Update(content);
            var saveResult = await _dataContext.SaveChangesAsync();
        
            if (saveResult <= 0)
            {
                return BadRequest("Problem adding justification file");
            }

            return Ok(_mapper.Map<ContentPhotoCreateDto>(content));

        }


    }
}