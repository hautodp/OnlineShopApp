using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.API.Data;
using OnlineShop.API.Dtos;
using OnlineShop.API.Models;

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

		//Get Orders by UserID
		[HttpGet("{id}")]
		public async Task<IActionResult> GetOrdersByUserID(int id)
		{
			var ordersByUserID = await _repo.GetOrdersByUserID(id);
			return Ok(ordersByUserID);
		}

		[HttpGet("detail/{idOrder}")]
		public async Task<IActionResult> GetOrderDetailsByOrderID(int idOrder)
		{
			var targetDetailOrders = await _repo.GetOrderDetails(idOrder);
			return Ok(targetDetailOrders);
		}


		[HttpPost]
		public async Task<IActionResult> CreateOrder([FromBody] OrderForPaymentDto orderForPayment)
		{
			var createdOrder = await _repo.CreateOrder(orderForPayment);
			var listOrderDetails = await _repo.CreateOrderDetail(createdOrder, orderForPayment.Selections);
			return Ok(listOrderDetails);
		}


	}
}