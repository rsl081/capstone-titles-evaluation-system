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
    public class ContentsController : BaseApiController
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public ContentsController(DataContext dataContext, IMapper mapper)
        {
            this._mapper = mapper;
            this._dataContext = dataContext;
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
        [Authorize]
        public async Task<ActionResult> GetContents()
        {
            return Ok(await _dataContext.Contents.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteContents(Guid id)
        {
            var content = await _dataContext.Contents.FindAsync(id);

            if(content == null) return BadRequest();

            _dataContext.Contents.Remove(content);
            await _dataContext.SaveChangesAsync();
            
            
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

            return Ok("Successfull Updated");
        }


    }
}