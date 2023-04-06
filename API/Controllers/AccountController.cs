using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IConfiguration _config;


        public AccountController(DataContext dataContext, 
        UserManager<AppUser> userManager, 
            SignInManager<AppUser> signInManager,
            ITokenService tokenService,
            IMapper mapper,
            IConfiguration config
            ) : base (mapper)
        {
            this._signInManager = signInManager;
            this._userManager = userManager;
            this._tokenService = tokenService;
            this._config = config;
        }

        [HttpPost("Login")]
        public async Task<ActionResult<UserDto>> LoginUser(LoginDto loginDto)
        {
            
            var user = await _userManager.Users
                .SingleOrDefaultAsync(x => x.Email == loginDto.Email);
            
            if(user == null) return Unauthorized();

            var result = await _signInManager.CheckPasswordSignInAsync(
                user, loginDto.Password, false
            );

            if (!await _userManager.IsEmailConfirmedAsync(user))
                return Unauthorized("Email is not confirmed");

            if (!await _userManager.CheckPasswordAsync(user, loginDto.Password))
                return Unauthorized("Invalid Authentication");

            if(!result.Succeeded)  return Unauthorized();

            return new UserDto
            {
                Id = user.Id,
                // PhotoUrl = user.UserPhoto.Url,
                Email = user.Email,
                Token = await _tokenService.CreateToken(user),
                DisplayName = user.DisplayName,  
                Created = user.Created,
            };

        }

        // [HttpPost("capstone-group/register")]
        // public async Task<ActionResult> RegisterCapstoneGroup()
        // {
            
        // }

    }
}