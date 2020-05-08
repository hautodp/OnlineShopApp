using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.API.Data;
using OnlineShop.API.Dtos;

namespace OnlineShop.API.Controllers
{
    [Route ("api/[controller]")]
    [ApiController]
    public class ManufacturersController:ControllerBase
    {
        private readonly IShoppingRepository _repo;
        private readonly IMapper _mapper;
        public ManufacturersController(IShoppingRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetManufacturers()
        {
            var manufacturers = await _repo.GetManufacturers();

            var manufacturersToReturn=_mapper.Map<IEnumerable<ManufacturerForListDto>>(manufacturers);
            return Ok(manufacturersToReturn);
        }
    }
}