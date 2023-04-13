using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities.Identity;

namespace API.Helpers
{
    public class CoordinatorUrlResolver
        : IValueResolver<AppUser, CoordinatorToReturn, string>
    {
        private readonly IConfiguration _config;
        public CoordinatorUrlResolver(IConfiguration config) {
            this._config = config;
        }

        public string Resolve(AppUser source, CoordinatorToReturn destination, string destMember, ResolutionContext context)
        {
            if(!string.IsNullOrEmpty(source.UserPhoto.Url)) {
                return _config["ApiUrl"] + source.UserPhoto.Url;
            }

            return null;
        }
    }
}