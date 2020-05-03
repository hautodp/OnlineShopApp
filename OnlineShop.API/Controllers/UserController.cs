using System;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.API.Data;
using OnlineShop.API.Dtos;

namespace OnlineShop.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController: ControllerBase
    {
        private readonly IShoppingRepository _repo;
        private readonly IMapper _mapper;
        public UserController(IShoppingRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet("{id}", Name="GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user=await _repo.GetUser(id);

            var userToReturn=_mapper.Map<UserForDetailDto>(user);
            return Ok(userToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id,UserForUpdateDto userForUpdateDto)
        {
            if(id!=int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var userFromRepo= await _repo.GetUser(id);
            _mapper.Map(userForUpdateDto,userFromRepo);

            if (await _repo.SaveAll())
                return NoContent();
            
            throw new Exception($"Cập nhập user {id} thất bại");
        }
    }
}