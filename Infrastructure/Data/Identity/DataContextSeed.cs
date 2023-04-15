using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Infrastructure.Data.Identity
{
    public class DataContextSeed
    {
        public static async Task SeedDataAsync(DataContext dataContext)
        {
            if(!dataContext.Contents.Any())
            {
                var content = new List<Content>
                {
                    //Data
                    new Content
                    {
                        Url = "https://res.cloudinary.com/dsb2zudcg/image/upload/v1681538302/cover-bsu_z1imva.png",
                        PublicId = "cover-bsu_z1imva",
                        SchoolName = "Bulacan State University",
                        Vision = "Bulacan State University is a progressive knowledge-generating institution globally recognized for excellent instruction, pioneering research, and responsive community engagements",
                        Mission = "Bulacan State University exists to produce highly competent, ethical and service-oriented professionals that contribute to the sustainable socio-economic growth and development of the nation",
                    }
                };

                await dataContext.Contents.AddRangeAsync(content);
                await dataContext.SaveChangesAsync();

            }


            if(!dataContext.Schools.Any())
            {
                var content = new List<School>
                {
                    //Data
                    new School
                    {
                        SchoolYear = "2023",
                    }
                };

                await dataContext.Schools.AddRangeAsync(content);
                await dataContext.SaveChangesAsync();

            }
        }
    }
}