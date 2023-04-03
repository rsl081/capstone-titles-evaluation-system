using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Data.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager,
            RoleManager<AppRole> roleManager)
        {
            if(!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    //Data
                    new AppUser
                    {
                        DisplayName = "Admin",
                        Email = "admin@test.com",
                        UserName = "admin@test.com",
                        // UserPhoto = new UserPhoto("assets/img/user_icon_default.png"),
                        EmailConfirmed = true,
                    },
                    new AppUser
                    {
                        DisplayName = "Coordinator",
                        Email = "coordinator@test.com",
                        UserName = "coordinator@test.com",
                        // UserPhoto = new UserPhoto("assets/img/user_icon_default.png"),
                        EmailConfirmed = true,
                    },
                    new AppUser
                    {
                        DisplayName = "Panel",
                        Email = "panel@test.com",
                        UserName = "panel@test.com",
                        // UserPhoto = new UserPhoto("assets/img/user_icon_default.png"),
                        EmailConfirmed = true,
                    },
                    new AppUser
                    {
                        DisplayName = "Adviser",
                        Email = "adviser@test.com",
                        UserName = "adviser@test.com",
                        // UserPhoto = new UserPhoto("assets/img/user_icon_default.png"),
                        EmailConfirmed = true,
                    },
                    new AppUser
                    {
                        DisplayName = "Faculty",
                        Email = "faculty@test.com",
                        UserName = "faculty@test.com",
                        // UserPhoto = new UserPhoto("assets/img/user_icon_default.png"),
                        EmailConfirmed = true,
                        IsApproved = false,
                    }
                };


                var roles = new List<AppRole>
                {
                    new AppRole {Name = "Admin"},
                    new AppRole {Name = "Coordinator"},
                    new AppRole {Name = "Panel"},
                    new AppRole {Name = "Adviser"},
                    new AppRole {Name = "Faculty"},
                };

                foreach (var role in roles)
                {
                    await roleManager.CreateAsync(role);
                } 

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                    if (user.Email == "admin@test.com") await userManager.AddToRoleAsync(user, "Admin");
                    if (user.Email == "coordinator@test.com") await userManager.AddToRoleAsync(user, "Coordinator");
                    if (user.Email == "panel@test.com") await userManager.AddToRoleAsync(user, "Panel");
                    if (user.Email == "adviser@test.com") await userManager.AddToRoleAsync(user, "Adviser");
                    if (user.Email == "faculty@test.com") await userManager.AddToRoleAsync(user, "Faculty");
                }

            }
        }
    }
}