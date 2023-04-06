using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class JustificationController : BaseApiController
    {   
        /*
            * To update the file, first is to wait the callback 
            *  of post method then triggred the put.
        */
        private readonly UserManager<AppUser> _userManager;
        
        private readonly IFileService _fileService;
        public JustificationController(
            UserManager<AppUser> userManager, 
            DataContext dataContext, IMapper mapper, IFileService fileService) 
                : base(dataContext, mapper)
        {
            this._userManager = userManager;
            this._fileService = fileService;
            
        }

        [HttpGet]
        public async Task<ActionResult> GetJustificationFile()
        {
            return Ok(await _dataContext.JustiFiles.ToListAsync());
        }


        [HttpPost("add-justification/{id}")]
        public async Task<ActionResult<JustiCreateDto>> AddJustiFile(
            IFormFile file, string id)
        {
            var appUser = await _userManager.Users.SingleOrDefaultAsync(
                x => x.Id == id);

            var result = await _fileService.AddFileAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var fileRepo = new JustiFile
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,
                AppUserId = appUser.Id,
            };

            _dataContext.JustiFiles.Add(fileRepo);
            var saveResult = await _dataContext.SaveChangesAsync();
        
            if (saveResult <= 0)
            {
                return BadRequest("Problem adding justification file");
            }

            return Ok(_mapper.Map<JustiCreateDto>(fileRepo));

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteJustiFile(Guid id)
        {
            var justiFile = await _dataContext.JustiFiles.FindAsync(id);

            if(justiFile == null) return BadRequest();

            _dataContext.JustiFiles.Remove(justiFile);
            var result = await _dataContext.SaveChangesAsync();

            if (result <= 0)
            {
                return BadRequest("Problem adding deleting the file");
            }
            
            return Ok("Successfully Deleted");
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<JustiUpdateDto>> UpdateJusti(
            Guid id, 
            JustiUpdateDto justiUpdateDto)
        {
            var justifi = await _dataContext.JustiFiles.FindAsync(id);

            if(justifi == null) return BadRequest();

            _mapper.Map(justiUpdateDto, justifi);

            _dataContext.JustiFiles.Update(justifi);
            var result = await _dataContext.SaveChangesAsync();

            if (result <= 0)
            {
                return BadRequest("Problem adding updating the file");
            }

            return Ok("Successfully Updated");
        }

        [HttpPut("update-file/{id}")]
        public async Task<ActionResult<JustiUpdateDto>> UpdateFileJusti(
            Guid id, 
            IFormFile file)
        {
            var justifi = await _dataContext.JustiFiles.FindAsync(id);

            if(justifi == null) return BadRequest();

            if (justifi.PublicId != null)
            {
                var resultFileDelete = await _fileService.DeleteFileAsync(justifi.PublicId);
                if (resultFileDelete.Error != null) return BadRequest(resultFileDelete.Error.Message);
             
                var resultAddFile =  await _fileService.AddFileAsync(file);
                if (resultAddFile.Error != null) return BadRequest(resultAddFile.Error.Message);

                _mapper.Map(resultAddFile, justifi);
                _dataContext.JustiFiles.Update(justifi);

            }

            // var justiDto = _mapper.Map<JustiCreateDto, JustiFile>(file);

            // _dataContext.JustiFiles.Update(justiDto);
            var result = await _dataContext.SaveChangesAsync();

            if (result <= 0)
            {
                return BadRequest("Problem adding updating the url file");
            }

            return Ok("Successfully Updated");
        }



    }
}