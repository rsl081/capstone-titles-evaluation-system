using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using CloudinaryDotNet.Actions;
using Core.Entities;
using Core.Entities.Identity;
using Infrastructure.Services;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Content, ContentPhotoCreateDto>();
            CreateMap<ContentCreateDto, Content>();
            CreateMap<SYCreateDto, School>();
            CreateMap<SectionCreateDto, Section>();
            CreateMap<SectionCoordinatorDto, Section>();
            CreateMap<SectionAssignDto, Section>();
            CreateMap<JustiCreateDto, JustiFile>().ReverseMap();
            CreateMap<JustiUpdateDto, JustiFile>();
            CreateMap<RawUploadResult , JustiFile>();
            
            CreateMap<UserPhoto, ContentPhotoCreateDto>();
            CreateMap<AppUser, FacultyToReturn>()
                .ForMember(p => p.UserPhoto, o => o.MapFrom(s => s.UserPhoto.Url))
                .ForMember(p => p.AppUserSections, o => 
                    o.MapFrom(s => s.AppUserSections.Select(s => s.Section)))
                .ForMember(p => p.AppUserGroups, o => 
                    o.MapFrom(s => s.AppUserGroups.Select(s => s.Group)))
                .ForMember(p => p.UserRoles, o => 
                    o.MapFrom(s => s.UserRoles.Select(user => user.Role)));

            CreateMap<AppUser, CoordinatorToReturn>()
                .ForMember(p => p.UserPhoto, o => o.MapFrom(s => s.UserPhoto.Url))
                .ForMember(p => p.AppUserSections, o => 
                    o.MapFrom(s => s.AppUserSections.Select(s => s.Section)))
                .ForMember(p => p.AppUserGroups, o => 
                    o.MapFrom(s => s.AppUserGroups.Select(s => s.Group)))
                .ForMember(p => p.UserRoles, o => 
                    o.MapFrom(s => s.UserRoles.Select(user => user.Role)));

            CreateMap<AppUser, StudentToReturnDto>()
                .ForMember(p => p.UserPhoto, o => o.MapFrom(s => s.UserPhoto.Url))
                .ForMember(p => p.AppUserSections, o => 
                    o.MapFrom(s => s.AppUserSections.Select(s => s.Section)))
                .ForMember(p => p.AppUserGroups, o => 
                    o.MapFrom(s => s.AppUserGroups.Select(s => s.Group)))
                .ForMember(j => j.JustiFile, o => o.MapFrom(
                    s => s.JustiFiles.Select(j => j)
                ));

            CreateMap<FacultyUpdateDto, AppUser>();
            CreateMap<GroupCreateDto, Group>();
            CreateMap<GroupAssignDto, Group>(); 
            CreateMap<GroupAssignDto, AppUserGroup>(); 

            CreateMap<JustiCreateDto, HearingFile>().ReverseMap();
            CreateMap<JustiUpdateDto, HearingFile>();


            CreateMap<TeamCreateDto, Team>();
            CreateMap<TeamAssignDto, Team>(); 
            
            CreateMap<SectionAssignDto, AppUserSection>();
        }
    }
}