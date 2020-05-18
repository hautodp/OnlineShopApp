using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using OnlineShop.API.Data;
using OnlineShop.API.Dtos;
using AutoMapper;
using OnlineShop.API.Models;
using OnlineShop.API.Dtos.Admin;
using Microsoft.AspNetCore.Authorization;

namespace OnlineShop.API.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase 
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
         private readonly IMapper _mapper;

        public AuthController (IAuthRepository repo, IConfiguration config,IMapper mapper)
        {
            _config = config;
            _repo = repo;
            _mapper= mapper;
        }

        // [HttpGet("{id}")]
        // public async Task<IActionResult> GetUser(int id){
        //     var user = await _repo.GetUser(id);
        //     return Ok(user);
        // }

        [HttpPost ("register")]
        public async Task<IActionResult> Register (UserForRegisterDto userForRegisterDto) {
            // validate request
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower ();

            if (await _repo.UserExists (userForRegisterDto.Username))
                return BadRequest ("Username already exisits");

            var userToCreate = _mapper.Map<User>(userForRegisterDto);

            var createUser = await _repo.Register (userToCreate, userForRegisterDto.Password);
            var userToReturn=_mapper.Map<UserForDetailDto>(createUser);

            return CreatedAtRoute("GetUser", new {controller="User", id=createUser.Id}, userToReturn);
        }

        [HttpPost ("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto) {
            var userFromRepo = await _repo.Login (userForLoginDto.Username.ToLower(), userForLoginDto.Password);

            if (userFromRepo == null)
                return null;

            var claims = new [] {
                new Claim (ClaimTypes.NameIdentifier, userFromRepo.Id.ToString ()),
                new Claim (ClaimTypes.Name, userFromRepo.Username)
            };

            var key = new SymmetricSecurityKey (Encoding.UTF8
                .GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds=new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor=new SecurityTokenDescriptor
            {
                Subject= new ClaimsIdentity(claims),
                Expires= DateTime.Now.AddDays(1),
                SigningCredentials=creds
            };

            var tokenHandler=new JwtSecurityTokenHandler();

            var token= tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new {
                token=tokenHandler.WriteToken(token)
            });
        }

        [HttpPost ("admin/register")]
        public async Task<IActionResult> RegisterAdmin (AdminForRegisterDto adminForRegisterDto) {
            // validate request
            adminForRegisterDto.Username = adminForRegisterDto.Username.ToLower ();

            if (await _repo.AdminExists (adminForRegisterDto.Username))
                return BadRequest ("Username already exisits");

            var adminToCreate = _mapper.Map<Admin>(adminForRegisterDto);

            var createAdmin = await _repo.RegisterAdmin(adminToCreate, adminForRegisterDto.Password);
            var adminToReturn=_mapper.Map<AdminForDetailDto>(createAdmin);

            return CreatedAtRoute("GetAdmin", new {controller="Admin", id=createAdmin.Id}, adminToReturn);
        }

        [HttpPost ("admin/login")]
        public async Task<IActionResult> Login(AdminForLoginDto adminForLoginDto) {
            var adminFromRepo = await _repo.LoginAdmin(adminForLoginDto.Username.ToLower(), adminForLoginDto.Password);

            if (adminFromRepo == null)
                return null;

            var claims = new [] {
                new Claim (ClaimTypes.NameIdentifier, adminFromRepo.Id.ToString ()),
                new Claim (ClaimTypes.Name, adminFromRepo.Username)
            };

            var key = new SymmetricSecurityKey (Encoding.UTF8
                .GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds=new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor=new SecurityTokenDescriptor
            {
                Subject= new ClaimsIdentity(claims),
                Expires= DateTime.Now.AddDays(1),
                SigningCredentials=creds
            };

            var tokenHandler=new JwtSecurityTokenHandler();

            var token= tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new {
                token=tokenHandler.WriteToken(token)
            });
        }
    }
}