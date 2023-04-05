using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<ContentCreateDto, Content>();
            CreateMap<SYCreateDto, School>();
            CreateMap<SectionCreateDto, Section>();
            CreateMap<SectionCoordinatorDto, Section>();

            CreateMap<AppUser, FacultyToReturn>()
                .ForMember(p => p.UserPhoto, o => o.MapFrom(s => s.UserPhoto.Url))
                .ForMember(p => p.UserRoles, o => 
                    o.MapFrom(s => s.UserRoles.Select(user => user.Role)));

            CreateMap<AppUser, CoordinatorToReturn>()
                .ForMember(p => p.UserPhoto, o => o.MapFrom(s => s.UserPhoto.Url))
                .ForMember(p => p.Sections, o => 
                    o.MapFrom(s => s.Sections.Select(s => s.Name)));

            CreateMap<FacultyUpdateDto, AppUser>();
        }
    }
}