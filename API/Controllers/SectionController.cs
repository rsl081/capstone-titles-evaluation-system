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
    public class SectionController : BaseApiController
    {
        public SectionController(DataContext dataContext, IMapper mapper) 
            : base(dataContext, mapper)
        {
        }

        [HttpPost]
        public async Task<ActionResult> CreateSection(SectionCreateDto
         sectionCreateDto)
        {
            var section = _mapper.Map<SectionCreateDto, 
                            Section>(sectionCreateDto);

            _dataContext.Sections.Add(section);
            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult> GetSections()
        {
            return Ok(await _dataContext.Sections
                .Include(g => g.Groups)
                .ThenInclude(t => t.Teams)
                .ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteSection(Guid id)
        {
            var section = await _dataContext.Sections.FindAsync(id);

            if(section == null) return BadRequest();

            _dataContext.Sections.Remove(section);
            await _dataContext.SaveChangesAsync();
            
            return Ok();
        }


        [HttpPut("{id}")]
        public async Task<ActionResult<SectionCreateDto>> UpdateSection(
            Guid id, 
            SectionCreateDto sectionCreateDto)
        {
            var section = await _dataContext.Sections.FindAsync(id);

            if(section == null) return BadRequest();

            _mapper.Map(sectionCreateDto, section);

            _dataContext.Sections.Update(section);
            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("assign/{id}")]
        public async Task<ActionResult<SectionAssignDto>> AssignSectionCoordinator(
            Guid id, 
            SectionAssignDto sectionCreateDto)
        {
            var section = await _dataContext
                                    .Sections.FindAsync(id);

            if(section == null) return BadRequest();

            _mapper.Map(sectionCreateDto, section);

            _dataContext.Sections.Update(section);
            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("{sectionName}")]
        public async Task<ActionResult> GetSpecificSection(
            string sectionName
        )
        {
            return Ok(await _dataContext.Sections
                            .Include(g => g.Groups.OrderBy(x => x.GroupName))
                            .ThenInclude(s => s.Teams.OrderBy(x => x.Name))
                            .Where(x => x.Name.ToLower() == sectionName.ToLower())
                            .ToListAsync());
        }

    }
}