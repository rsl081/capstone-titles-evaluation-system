using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class ContentsController : BaseApiController
    {
        
        public ContentsController(DataContext dataContext, IMapper mapper)
            : base(dataContext, mapper)
        {
          
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

            return Ok("Successfully Updated");
        }


    }
}