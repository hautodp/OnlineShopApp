using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.API.Data;
using OnlineShop.API.Dtos;
using OnlineShop.API.Helpers;

namespace OnlineShop.API.Controllers
{
	// [Authorize]
	[Route("api/[controller]")]
	[ApiController]
	public class ProductsController : ControllerBase
	{
		private readonly IShoppingRepository _repo;
		private readonly IMapper _mapper;
		public ProductsController(IShoppingRepository repo, IMapper mapper)
		{
			_mapper = mapper;
			_repo = repo;
		}

		[HttpGet]
		public async Task<IActionResult> GetProducts([FromQuery] ProductParams productParams)
		{
			var products = await _repo.GetProducts(productParams);

			var productsToReturn = _mapper.Map<IEnumerable<ProductForListDto>>(products);
			Response.AddPagination(products.CurrentPage, products.PageSize, products.TotalCount, products.TotalPages);
			return Ok(productsToReturn);
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> GetProduct(int id)
		{
			var product = await _repo.GetProduct(id);

			var productToReturn =_mapper.Map<ProductForDetailDto>(product);
			return Ok(productToReturn);
		}
	}
}