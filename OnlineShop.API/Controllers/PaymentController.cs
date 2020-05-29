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
using OnlineShop.API.Helpers;
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

		[HttpGet("ForAdmin")]
		public async Task<IActionResult> GetOrdersForAdmin([FromQuery]OrderParamsForAdmin orderParamsForAdmin)
		{
			var orders = await _repo.GetOrdersForAdmin(orderParamsForAdmin);
			Response.AddPagination(orders.CurrentPage, orders.PageSize,
				orders.TotalCount, orders.TotalPages);

			return Ok(orders);
		}

		//Get Orders by UserID
		[HttpGet("order")]
		public async Task<IActionResult> GetOrdersByUserID([FromQuery] OrderParams orderParams)
		{
			var ordersByUserID = await _repo.GetOrdersByUserID(orderParams.IdUser);
			return Ok(ordersByUserID);
		}

		[HttpGet("order/detail/{id}")]
		public async Task<IActionResult> GetOrderDetailsByOrderID(int id)
		{
			var targetDetailOrders = await _repo.GetOrderDetails(id);
			return Ok(targetDetailOrders);
		}


		[HttpPost]
		public async Task<IActionResult> CreateOrder([FromBody] OrderForPaymentDto orderForPayment)
		{
			var createdOrder = await _repo.CreateOrder(orderForPayment);
			var listOrderDetails = await _repo.CreateOrderDetail(createdOrder, orderForPayment.Selections);
			return Ok(listOrderDetails);
		}

		[HttpPut("{id}/{state}")]
		public async Task<IActionResult> UpdateOrder(int id, int state)
		{
			var orderFromRepo = await _repo.GetOrderById(id);
			var orderUpated = orderFromRepo;
			orderUpated.OrderState = state;
			_mapper.Map(orderUpated, orderFromRepo);

			if (await _repo.SaveAll())
				return NoContent();

			throw new Exception($"Duyệt hóa đơn = {id} thất bại.");
		}
	}
}