using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.API.Data;
using OnlineShop.API.Helpers;
using OnlineShop.API.Models;

namespace OnlineShop.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController: ControllerBase
    {
		private readonly IShoppingRepository _repo;
		private readonly IMapper _mapper;
		public CartController(IShoppingRepository repo, IMapper mapper)
		{
			_mapper = mapper;
			_repo = repo;
		}

        [HttpGet]
        public IActionResult GetCartItems()
        {
            var cart =SessionHelper.GetObjectFromJson<List<CartItem>>(HttpContext.Session, "cart");
            return Ok(cart);
        }
        [HttpGet("{idProduct}")]
        public async Task<IActionResult> AddItem(int idProduct)
        {
            var product=await _repo.GetProduct(idProduct);
            var productToReturn =_mapper.Map<ProductItem>(product);

            if (SessionHelper.GetObjectFromJson<List<CartItem>>(HttpContext.Session, "cart") == null)
            {
                var cart = new List<CartItem>();
                
                cart.Add(new CartItem {ProductItem=productToReturn, Quantity=1});
               
                SessionHelper.SetObjectAsJson(HttpContext.Session, "cart", cart);
            }
            else
            {
                var cart = SessionHelper.GetObjectFromJson<List<CartItem>>(HttpContext.Session, "cart");
                if (cart.Exists(x => x.ProductItem.IDProduct == idProduct))
                {
                    foreach (var item in cart)
                    {
                        if (item.ProductItem.IDProduct == idProduct)
                        {
                            item.Quantity ++;
                        }
                    }
                }
                else
                {
                    cart.Add(new CartItem {ProductItem=productToReturn, Quantity=1});
                }
                //Gan vao Session
                SessionHelper.SetObjectAsJson(HttpContext.Session, "cart", cart);
            }
            return Ok();
        }
    }
}