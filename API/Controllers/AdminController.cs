using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Dtos;
using API.Helpers;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AdminController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        // private readonly IPhotoService _photoService;
        // private readonly IUnitOfWork _unitOfWork;
        // private readonly IEmailService _emailService;
        private readonly IConfiguration _config;

        public AdminController(UserManager<AppUser> userManager, 
            SignInManager<AppUser> signInManager,
            ITokenService tokenService,
            IMapper mapper,
            IConfiguration config) : base (mapper) {

            this._signInManager = signInManager;
            this._userManager = userManager;
            this._tokenService = tokenService;
            this._config = config;
        }

        [HttpGet("user/all")]
        public async Task<ActionResult<Pagination<FacultyToReturn>>> GetAllUser()
        {

            var user = await _userManager.Users
                .Include(p => p.UserPhoto)
                .Include(r => r.UserRoles)
                .ThenInclude(r => r.Role)
                .Include(s => s.Sections)
                .ToListAsync();
          
            var totalItems = user.Count();

            var data = _mapper.Map<IReadOnlyList<AppUser>,
                IReadOnlyList<FacultyToReturn>>(user);

            return Ok(new Pagination<FacultyToReturn>(totalItems, data));

        }

        [HttpGet("faculty/all")]
        public async Task<ActionResult<Pagination<FacultyToReturn>>> GetAllFaculty()
        {

            var user = await _userManager.Users
                .Include(p => p.UserPhoto)
                .Include(r => r.UserRoles)
                .ThenInclude(r => r.Role)
                .Where(u => u.UserRoles.All(r => r.Role.Name == "Faculty"))
                .ToListAsync();
          
            var totalItems = user.Count();

            var data = _mapper.Map<IReadOnlyList<AppUser>,
                IReadOnlyList<FacultyToReturn>>(user);

            return Ok(new Pagination<FacultyToReturn>(totalItems, data));

        }

        [HttpGet("coordinator/all")]
        public async Task<ActionResult<Pagination<CoordinatorToReturn>>> GetAllCoordinator()
        {

            var user = await _userManager.Users
                .Include(p => p.UserPhoto)
                .Include(r => r.UserRoles)
                .ThenInclude(r => r.Role)
                .Include(s => s.AppUserSections)
                .ThenInclude(s => s.Section)
                .Where(u => u.UserRoles.All(r => r.Role.Name == "Coordinator"))
                .ToListAsync();
          
            var totalItems = user.Count();

            var data = _mapper.Map<IReadOnlyList<AppUser>,
                IReadOnlyList<CoordinatorToReturn>>(user);

            return Ok(new Pagination<CoordinatorToReturn>(totalItems, data));

        }

        
        [HttpGet("student/all")]
        public async Task<ActionResult<Pagination<StudentToReturnDto>>> GetAllStudent()
        {

            var user = await _userManager.Users
                .Include(p => p.UserPhoto)
                .Include(j => j.JustiFiles)
                .Include(r => r.UserRoles)
                .ThenInclude(r => r.Role)
                .Include(s => s.AppUserSections)
                .ThenInclude(s => s.Section)
                .ThenInclude(g => g.Groups)
                .Where(u => u.UserRoles.All(r => r.Role.Name == "Student"))
                .ToListAsync();
          
            var totalItems = user.Count();

            var data = _mapper.Map<IReadOnlyList<AppUser>,
                IReadOnlyList<StudentToReturnDto>>(user);

            return Ok(new Pagination<StudentToReturnDto>(totalItems, data));

        }

        [HttpPut("faculty/edit")]
        public async Task<ActionResult<FacultyUpdateDto>> UpdateFaculty(
            FacultyUpdateDto facultyUpdateDto)
        {  
            var faculty = await _userManager.Users.SingleOrDefaultAsync(
                x=> x.Email == facultyUpdateDto.Email);

            if(faculty == null) return BadRequest();

            _mapper.Map(facultyUpdateDto, faculty); 

            await _userManager.UpdateAsync(faculty);
           
            return Ok();
        }
        
        [HttpPut("faculty/edit-roles/{username}")]
        public async Task<ActionResult> EditRoles(string username, 
            [FromQuery]string roles)
        {
            if(string.IsNullOrEmpty(roles)) return BadRequest("You must select atleast one role");

            var selectedRoles = roles.Split(",").ToArray();

            var user = await _userManager.FindByEmailAsync(username);
            if(user == null) return NotFound();

            var userRoles = await _userManager.GetRolesAsync(user);

            var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));
            if(!result.Succeeded) return BadRequest("Failed to add to roles");

            result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

            if(!result.Succeeded) return BadRequest("Failed to remove from roles");

            return Ok(await _userManager.GetRolesAsync(user));
        }


        


    }
}