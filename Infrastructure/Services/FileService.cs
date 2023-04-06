using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;


namespace Infrastructure.Services
{
    public class FileService : IFileService
    {
        private readonly Cloudinary _cloudinary;
        public FileService(IOptions<CloudinarySettings> config)
        {
            var acc = new Account
            (
                "dsb2zudcg",
                "212943122885599",
                "fJqpCnbYMtWk114SBqAtsyBnv0o"
            );
//  "CloudName": "dsb2zudcg",
//     "ApiKey": "212943122885599",
//     "ApiSecret": "fJqpCnbYMtWk114SBqAtsyBnv0o"
            _cloudinary = new Cloudinary(acc);
        }

        public async Task<RawUploadResult> AddFileAsync(IFormFile file)
        {
            var uploadResult = new RawUploadResult();

            if (file.Length > 0)
            {
                using var stream = file.OpenReadStream();
               
                var uploadParams = new RawUploadParams
                {
                    File = new FileDescription(file.FileName, stream)
                };

                
                uploadResult = await _cloudinary.UploadAsync(uploadParams);
            }

            return uploadResult;
        }

        public async Task<DeletionResult> DeleteFileAsync(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);

            var result = await _cloudinary.DestroyAsync(deleteParams);

            return result;
        }

    }
}