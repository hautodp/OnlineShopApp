using System.Linq;
using AutoMapper;
using OnlineShop.API.Dtos;
using OnlineShop.API.Dtos.Admin;
using OnlineShop.API.Models;

namespace OnlineShop.API.Helpers
{
 public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Product,ProductForListDto>()
                .ForMember(dest => dest.PhotoURL, opt =>
                    opt.MapFrom(src =>src.Photos.FirstOrDefault(p =>p.IsMain).Url));
            CreateMap<Product,ProductForDetailDto>()
                .ForMember(dest => dest.PhotoURL, opt =>
                    opt.MapFrom(src =>src.Photos.FirstOrDefault(p =>p.IsMain).Url));
            CreateMap<ProductForUpdateDto, Product>();
            CreateMap<ProductForCreationDto, Product>();

            CreateMap<User,UserForDetailDto>();
            CreateMap<Photo, PhotosForDetailDto>();
            CreateMap<UserForRegisterDto, User>();
            CreateMap<UserForUpdateDto, User>();

            CreateMap<Manufacturer, ManufacturerForListDto>();
            CreateMap<Manufacturer, Manufacturer>();

            CreateMap<Admin,AdminForDetailDto>();
            CreateMap<AdminForRegisterDto,Admin>();

            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<Photo, PhotoForReturnDto > ();
        }
    }
}