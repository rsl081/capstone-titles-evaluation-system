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
        private readonly IPhotoService _photoService;
        public AccountController(DataContext dataContext, 
        UserManager<AppUser> userManager, 
            SignInManager<AppUser> signInManager,
            ITokenService tokenService,
            IMapper mapper,
            IConfiguration config,
            IPhotoService photoService
            ) : base (mapper)
        {
            this._signInManager = signInManager;
            this._userManager = userManager;
            this._tokenService = tokenService;
            this._config = config;
            this._photoService = photoService;
        }



        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> LoginUser(LoginDto loginDto)
        {
            
            var user = await _userManager.Users
                .Include(p => p.UserPhoto)
                .Include(j => j.JustiFiles)
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
                UserPhoto = user.UserPhoto.Url,
                Email = user.Email,
                Token = await _tokenService.CreateToken(user),
                DisplayName = user.DisplayName,  
                Created = user.Created,
                JustiFiles = user.JustiFiles,
            };

        }

        // [Authorize]
        [HttpGet("get-current-user/{id}")]
        public async Task<ActionResult<UserDto>> GetCurrentUser(string id)
        {
            var appUser = await _userManager.Users.FirstOrDefaultAsync(
                x => x.Id == id
            );

            var user = await _userManager.Users
                .Include(p => p.UserPhoto)
                .Include(j => j.JustiFiles)
                .Include(h => h.HearingFiles)
                .Include(t => t.Teams)
                .Include(g => g.Groups)
                .SingleOrDefaultAsync(x => x.Email == appUser.Email);

            return new UserDto
            {
                Id = user.Id,
                UserPhoto = user.UserPhoto.Url,
                Email = user.Email,
                Token = await _tokenService.CreateToken(user),
                DisplayName = user.DisplayName,
                Created = user.Created,
                JustiFiles = user.JustiFiles,
                Teams = user.Teams,
                Groups = user.Groups,
                HearingFiles = user.HearingFiles
            };

        }

        [HttpPost("faculty/register")]
        public async Task<ActionResult<UserDto>> RegisterFaculty(
            RegisterUserDto registerFacultyDto)
        {

            var user = new AppUser
            {
                DisplayName = registerFacultyDto.DisplayName,
                Email = registerFacultyDto.Email,
                UserName = registerFacultyDto.Email,
                Expertise = registerFacultyDto.Expertise,
                // UserPhoto = new UserPhoto("assets/img/user_icon_default.png")
            };

            var result = await _userManager.CreateAsync(
                user, 
                registerFacultyDto.Password);

            if(!result.Succeeded) {
                return BadRequest("A problem creating the faculty");
            }

            // if(result.Succeeded)
            // {

            //     var confirmationToken = await _userManager
            //                                     .GenerateEmailConfirmationTokenAsync(user);
            
            //     var uriBuilder = new UriBuilder(_config["ReturnPaths:ConfirmEmail"]);
            //     var query = HttpUtility.ParseQueryString(uriBuilder.Query);
            //     query["userId"] = user.Id;
            //     query["token"] = confirmationToken;
            //     uriBuilder.Query = query.ToString();
            //     var urlString = uriBuilder.ToString();

            //     await _emailService.SendAsync(
            //         "rodriguez.johnrussel.d.1592@gmail.com",
            //         user.Email, 
            //         "Please confirm your email",
            //         $"Please click on this link to confirm your email <a href=\"{urlString}\">Verify Email</a>");
                
            // }


            var roleAddResult = 
                await _userManager.AddToRoleAsync(user, "Faculty");
            
            if (!roleAddResult.Succeeded){

              return BadRequest("Failed to add to role");  
            }

            return new UserDto
            {
                Id = user.Id,
                // PhotoUrl = user.UserPhoto.Url,
                DisplayName = user.DisplayName,
                Expertise = user.Expertise,
                Token = await _tokenService.CreateToken(user),
                Email = user.Email,
                Created = user.Created
            };
        }

        [HttpPost("capstone-group/register")]
        public async Task<ActionResult<StudentToReturnDto>> RegisterCapstoneGroup(
            RegisterStudentDto registerStudentDto
        )
        {
             var user = new AppUser
            {
                DisplayName = registerStudentDto.DisplayName,
                Email = registerStudentDto.Email,
                UserName = registerStudentDto.Email,
                // Teams = registerStudentDto.Teams,
                // UserPhoto = new UserPhoto("assets/img/user_icon_default.png")
            };

            var result = await _userManager.CreateAsync(
                user, 
                registerStudentDto.Password);

            if(!result.Succeeded) {

                return BadRequest("A problem creating the faculty");
            }

            // if(result.Succeeded)
            // {

            //     var confirmationToken = await _userManager
            //                                     .GenerateEmailConfirmationTokenAsync(user);
                
            
            //     var uriBuilder = new UriBuilder(_config["ReturnPaths:ConfirmEmail"]);
            //     var query = HttpUtility.ParseQueryString(uriBuilder.Query);
            //     query["userId"] = user.Id;
            //     query["token"] = confirmationToken;
            //     uriBuilder.Query = query.ToString();
            //     var urlString = uriBuilder.ToString();

            //     await _emailService.SendAsync(
            //         "rodriguez.johnrussel.d.1592@gmail.com",
            //         user.Email, 
            //         "Please confirm your email",
            //         $"Please click on this link to confirm your email <a href=\"{urlString}\">Verify Email</a>");
                
            // }


            var roleAddResult = 
                await _userManager.AddToRoleAsync(user, "Student");
            
            if (!roleAddResult.Succeeded){

              return BadRequest("Failed to add to role");  
            }

            return new StudentToReturnDto
            {
                Id = user.Id,
                // PhotoUrl = user.UserPhoto.Url,
                DisplayName = user.DisplayName,
                // Teams = user.Teams,
                Token = await _tokenService.CreateToken(user),
                Email = user.Email,
                Created = user.Created
            };
        }

        [HttpGet("coordinator/total")]
        public async Task<ActionResult> GetTotalCoordinator()
        {

            var user = await _userManager.Users
                .Where(u => u.UserRoles.All(r => r.Role.Name == "Coordinator"))
                .ToListAsync();
          
            var totalItems = user.Count();

            return Ok(totalItems);
        }

        [HttpGet("adviser/total")]
        public async Task<ActionResult> GetTotalAdviser()
        {

            var user = await _userManager.Users
                .Where(u => u.UserRoles.All(r => r.Role.Name == "Adviser"))
                .ToListAsync();
          
            var totalItems = user.Count();

            return Ok(totalItems);
        }

        [HttpGet("panel/total")]
        public async Task<ActionResult> GetTotalPanel()
        {

            var user = await _userManager.Users
                .Where(u => u.UserRoles.All(r => r.Role.Name == "Panel"))
                .ToListAsync();
          
            var totalItems = user.Count();

            return Ok(totalItems);
        }

        [HttpGet("admin/total")]
        public async Task<ActionResult> GetTotalAdmin()
        {
            var user = await _userManager.Users
                .Where(u => u.UserRoles.All(r => r.Role.Name == "Admin"))
                .ToListAsync();
          
            var totalItems = user.Count();

            return Ok(totalItems);
        }


        [HttpPost("resetpassword")]
        public async Task<ActionResult<UserDto>> ResetPasswordUser(
            UserResetDto userResetDto)
        {   
            
            var user = await _userManager.FindByIdAsync(userResetDto.Id);

            var confirmationToken = await _userManager
                                            .GeneratePasswordResetTokenAsync(user);

            var result = await _userManager.ResetPasswordAsync(user, 
                confirmationToken, userResetDto.Password);
            
            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest();
        }

        //The var name file must match the input name in the client
        // for example input='file'
        [HttpPost("add-photo/{id}")]
        public async Task<ActionResult> AddPhoto(
            IFormFile file, string id)
        {
            var user = await _userManager.Users
                .Include(p => p.UserPhoto)
                .SingleOrDefaultAsync(
                x => x.Id == id);

            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var userPhoto = new UserPhoto {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            user.UserPhoto = userPhoto;
            
            var saveResult = await _userManager.UpdateAsync(user);

            if (!saveResult.Succeeded)
            {
                return BadRequest("Problem adding photo");
            }

            return Ok(_mapper.Map<ContentPhotoCreateDto>(user.UserPhoto));
        }



        

        

    }
}