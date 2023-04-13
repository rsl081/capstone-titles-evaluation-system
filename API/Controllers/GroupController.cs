using API.Dtos;
using AutoMapper;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class GroupController : BaseApiController
    {
        public GroupController(DataContext dataContext, IMapper mapper) : base(dataContext, mapper)
        {
        }

        [HttpPost]
        public async Task<ActionResult> CreateGroup(GroupCreateDto
         groupCreateDto)
        {
            var group = _mapper.Map<GroupCreateDto, 
                            Group>(groupCreateDto);

            _dataContext.Groups.Add(group);
            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult> GetGroups()
        {
            return Ok(await _dataContext.Groups.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteGroup(Guid id)
        {
            var group = await _dataContext.Groups.FindAsync(id);

            if(group == null) return BadRequest();

            _dataContext.Groups.Remove(group);
            await _dataContext.SaveChangesAsync();
            
            return Ok();
        }


        [HttpPut("{id}")]
        public async Task<ActionResult<GroupCreateDto>> UpdateGroup(
            Guid id, 
            GroupCreateDto groupCreateDto)
        {
            var group = await _dataContext.Groups.FindAsync(id);

            if(group == null) return BadRequest();

            _mapper.Map(groupCreateDto, group);

            _dataContext.Groups.Update(group);
            await _dataContext.SaveChangesAsync();

            return Ok();
        }
        //-------------------
        [HttpPut("Assign/{id}")]
        public async Task<ActionResult<GroupAssignDto>> AssignGroupAdviserOrPanel(
            Guid id, 
            GroupAssignDto groupAssignDto)
        {
            var section = await _dataContext.Groups.FindAsync(id);

            if(section == null) return BadRequest();

            _mapper.Map(groupAssignDto, section);

            _dataContext.Groups.Update(section);
            await _dataContext.SaveChangesAsync();

            return Ok();
        }


    }
}