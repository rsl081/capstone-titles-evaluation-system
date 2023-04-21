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
    public class TeamsController : BaseApiController
    {
        public TeamsController(DataContext dataContext, IMapper mapper) : base(dataContext, mapper)
        {
        }

        [HttpPost]
        public async Task<ActionResult> CreateTeam(TeamCreateDto
         teamCreateDto)
        {
            var team = _mapper.Map<TeamCreateDto, 
                            Team>(teamCreateDto);

            _dataContext.Teams.Add(team);
            await _dataContext.SaveChangesAsync();

            return Ok(team.Id);
        }

        [HttpGet]
        public async Task<ActionResult> GetTeams()
        {
            return Ok(await _dataContext.Teams.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTeam(Guid id)
        {
            var team = await _dataContext.Teams.FindAsync(id);

            if(team == null) return BadRequest();

            _dataContext.Teams.Remove(team);
            await _dataContext.SaveChangesAsync();
            
            return Ok();
        }


        [HttpPut("{id}")]
        public async Task<ActionResult<TeamCreateDto>> UpdateTeam(
            Guid id, 
            TeamCreateDto teamCreateDto)
        {
            var team = await _dataContext.Teams.FindAsync(id);

            if(team == null) return BadRequest();

            _mapper.Map(teamCreateDto, team);

            _dataContext.Teams.Update(team);
            await _dataContext.SaveChangesAsync();

            return Ok();
        }
        //-------------------
        [HttpPut("assign/{id}")]
        public async Task<ActionResult<TeamAssignDto>> AssignTeamStudent(
            Guid id, 
            TeamAssignDto teamAssignDto)
        {
            var team = await _dataContext.Teams.FindAsync(id);

            if(team == null) return BadRequest();

            _mapper.Map(teamAssignDto, team);

            _dataContext.Teams.Update(team);
            await _dataContext.SaveChangesAsync();

            return Ok();
        }
    }
}