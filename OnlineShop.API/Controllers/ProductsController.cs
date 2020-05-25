using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using OnlineShop.API.Data;
using OnlineShop.API.Dtos;
using OnlineShop.API.Helpers;
using OnlineShop.API.Models;

namespace OnlineShop.API.Controllers
{
    // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IShoppingRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public ProductsController(IShoppingRepository repo, IMapper mapper,
            IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _repo = repo;
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }
	//	[HttpGet("{id}")]
	//	public async Task<IActionResult> GetProduct(int id)
	//	{
	//		var product = await _repo.GetProduct(id);
	//		var productToReturn =_mapper.Map<ProductForDetailDto>(product);
	//}

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

            var productToReturn = _mapper.Map<ProductForDetailDto>(product);
            return Ok(productToReturn);
        }

        [HttpGet("ForAdmin")]
        public async Task<IActionResult> GetProductsForAdmin([FromQuery]ProductParamsForAdmin productParamsForAdmin)
        {
            var products = await _repo.GetProductsForAdmin(productParamsForAdmin);

            var productsToReturn = _mapper.Map<IEnumerable<ProductForListDto>>(products);
            Response.AddPagination(products.CurrentPage, products.PageSize,
                products.TotalCount, products.TotalPages);

            return Ok(productsToReturn);
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _repo.GetAllProducts();

            var productsToReturn = _mapper.Map<IEnumerable<ProductForListDto>>(products);
            return Ok(productsToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, ProductForUpdateDto productForUpdateDto)
        {
            var productFromRepo = await _repo.GetProduct(id);

            _mapper.Map(productForUpdateDto, productFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Cập nhật sản phẩm id= {id} thất bại.");
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddProduct(ProductForCreationDto productForCreationDto)
        {
            var productToCreate = _mapper.Map<Product>(productForCreationDto);

            _repo.Add<Product>(productToCreate);
            await _repo.SaveAll();

            return CreatedAtAction("GetProducts", new { id = productToCreate.IDProduct }, productToCreate);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Product>> DeleteProduct(int id)
        {
            var product = await _repo.GetProduct(id);

            if (product == null)
            {
                return NotFound();
            }

            _repo.Delete<Product>(product);
            await _repo.SaveAll();

            return product;
        }
    }
}