using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class SchoolController : BaseApiController
    {
        public SchoolController(DataContext dataContext, IMapper mapper) 
            : base(dataContext, mapper)
        {

        }

        [HttpPost]
        public async Task<ActionResult> CreateSchoolYear(SYCreateDto
         schoolYearCreateDto)
        {
            var schoolYear = _mapper.Map<SYCreateDto, 
                            School>(schoolYearCreateDto);

            _dataContext.Schools.Add(schoolYear);
            await _dataContext.SaveChangesAsync();

            return Ok("Successfully Created");
        }

        [HttpGet]
        public async Task<ActionResult> GetSY()
        {
            return Ok(await _dataContext.Schools.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteSchoolYear(Guid id)
        {
            var school = await _dataContext.Schools.FindAsync(id);

            if(school == null) return BadRequest();

            _dataContext.Schools.Remove(school);
            await _dataContext.SaveChangesAsync();
            
            return Ok("Successfully Deleted");
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<SYCreateDto>> UpdateSY(
            Guid id, 
            SYCreateDto syCreateDto)
        {
            var sy = await _dataContext.Schools.FindAsync(id);

            if(sy == null) return BadRequest();

            _mapper.Map(syCreateDto, sy);

            _dataContext.Schools.Update(sy);
            await _dataContext.SaveChangesAsync();

            return Ok("Successfull Updated");
        }

    }
}