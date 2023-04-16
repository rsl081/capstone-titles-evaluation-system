using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class HearingController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        
        private readonly IFileService _fileService;
        public HearingController(
            UserManager<AppUser> userManager, 
            IFileService fileService,
            DataContext dataContext, IMapper mapper) : base(dataContext, mapper)
        {
            this._userManager = userManager;
            this._fileService = fileService;
        }


        [HttpGet]
        public async Task<ActionResult> GetHearingFile()
        {
            return Ok(await _dataContext.HearingFiles.ToListAsync());
        }


        [HttpPost("add-hearing/{appUserId}")]
        public async Task<ActionResult<JustiCreateDto>> AddHearingFile(
            IFormFile file, string appUserId)
        {
            var appUser = await _userManager.Users.SingleOrDefaultAsync(
                x => x.Id == appUserId);

            var result = await _fileService.AddFileAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var fileRepo = new HearingFile
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,
                FileName = result.PublicId,
                AppUserId = appUser.Id,
            };

            _dataContext.HearingFiles.Add(fileRepo);
            var saveResult = await _dataContext.SaveChangesAsync();
        
            if (saveResult <= 0)
            {
                return BadRequest("Problem adding hearing file");
            }

            return Ok(_mapper.Map<JustiCreateDto>(fileRepo));

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteHearingFile(Guid id)
        {
            var hearingFile = await _dataContext.HearingFiles.FindAsync(id);

            if(hearingFile == null) return BadRequest();

            _dataContext.HearingFiles.Remove(hearingFile);
            var result = await _dataContext.SaveChangesAsync();

            if (result <= 0)
            {
                return BadRequest("Problem adding deleting the file");
            }
            
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<JustiUpdateDto>> UpdateHearing(
            Guid id, 
            JustiUpdateDto hearingUpdateDto)
        {
            var hearingFile = await _dataContext.HearingFiles.FindAsync(id);

            if(hearingFile == null) return BadRequest();

            _mapper.Map(hearingUpdateDto, hearingFile);

            _dataContext.HearingFiles.Update(hearingFile);
            var result = await _dataContext.SaveChangesAsync();

            if (result <= 0)
            {
                return BadRequest("Problem adding updating the file");
            }

            return Ok();
        }

        [HttpPut("update-file/{id}")]
        public async Task<ActionResult<JustiUpdateDto>> UpdateFileHearing(
            Guid id, 
            IFormFile file)
        {
            var hearing = await _dataContext.HearingFiles.FindAsync(id);

            if(hearing == null) return BadRequest();

            if (hearing.PublicId != null)
            {
                var resultFileDelete = await _fileService.DeleteFileAsync(hearing.PublicId);
                if (resultFileDelete.Error != null) return BadRequest(resultFileDelete.Error.Message);
             
                var resultAddFile =  await _fileService.AddFileAsync(file);
                if (resultAddFile.Error != null) return BadRequest(resultAddFile.Error.Message);

                _mapper.Map(resultAddFile, hearing);
                _dataContext.HearingFiles.Update(hearing);

            }

        
            var result = await _dataContext.SaveChangesAsync();

            if (result <= 0)
            {
                return BadRequest("Problem adding updating the url file");
            }

            return Ok();
        }

    }
}