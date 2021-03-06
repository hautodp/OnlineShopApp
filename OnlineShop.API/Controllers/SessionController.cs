using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using OnlineShop.API.Models;
using System;

namespace OnlineShop.API.Controllers
{
    [Route("/api/session")]
    [ApiController]
    public class SessionController : Controller
    {
        [HttpGet("cart")]
        public IActionResult GetCart() {
            return Ok(HttpContext.Session.GetString("cart"));
        }

        [HttpPost("cart")]
        public void StoreCart([FromBody] ProductSelection[] products) {
            if (HttpContext.Session.GetString("cart") != null)
            {
                var jsonData = JsonConvert.SerializeObject(products);
                HttpContext.Session.SetString("cart", jsonData);
            }
        }
    }
}