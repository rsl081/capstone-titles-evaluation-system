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
        [HttpPost("assign")]
        public async Task<ActionResult<GroupAssignDto>> AssignGroupAdviserOrPanel(
            GroupAssignDto groupAssignDto)
        {

            var section = _mapper.Map<GroupAssignDto, 
                            AppUserGroup>(groupAssignDto);

            _dataContext.AppUserGroups.Add(section);
            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("{groupName}")]
        public async Task<ActionResult> GetSpecificGroup(
            string groupName
        )
        {
            return Ok(await _dataContext.Groups
                            .Include(j => j.JustiFiles)
                            .OrderBy(g => g.GroupName)
                            .Where(x => x.GroupName.ToLower() == groupName.ToLower())
                            .ToListAsync());
        }


    }
}