using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.API.Data;
using OnlineShop.API.Dtos;
using OnlineShop.API.Models;

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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetManufacturer(int id)
        {
            var manufacturer = await _repo.GetManufacturer(id);

            var manufacturerToReturn = _mapper.Map<ManufacturerForListDto>(manufacturer);
            return Ok(manufacturerToReturn);
        }

        [HttpPost ("add")]
        public async Task<IActionResult> AddManufacturer(Manufacturer manufacturer)
        {
            _repo.Add<Manufacturer>(manufacturer);
            await _repo.SaveAll();
            
            return CreatedAtAction("GetManufacturers", new {id = manufacturer.IDManufacturer}, manufacturer);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Manufacturer>> UpdateManufacturer(int id, Manufacturer manufacturer)
        {
            if (id != manufacturer.IDManufacturer)
                return BadRequest();

            var manufacturerFromRepo = await _repo.GetManufacturer(id);
            _mapper.Map(manufacturer, manufacturerFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Cập nhập thất bại");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Manufacturer>> DeleteManufacturer(int id)
        {
            var manufacturer = await _repo.GetManufacturer(id);

            if (manufacturer == null)
            {
                return NotFound();
            }

            _repo.Delete<Manufacturer>(manufacturer);
            await _repo.SaveAll();

            return manufacturer;
        }
    }
}