using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.API.Data;
using OnlineShop.API.Dtos;

namespace OnlineShop.API.Controllers
{
	//[Authorize]
	[Route("api/[controller]")]
	[ApiController]
	public class PaymentController : ControllerBase
	{
		private readonly IShoppingRepository _repo;
		private readonly IMapper _mapper;

		public PaymentController(IShoppingRepository repo, IMapper mapper)
		{
			this._repo = repo;
			this._mapper = mapper;
		}


		[HttpGet]
		public async Task<IActionResult> GetOrders()
		{
			var orders = await _repo.GetOrders();
			return Ok(orders);
		}

		[HttpPost]
		public async Task<IActionResult> CreateOrder(OrderForPaymentDto orderForPayment)
		{
			var createdOrder = await _repo.CreateOrder(orderForPayment);
			return Ok(createdOrder);
		}


	}
}