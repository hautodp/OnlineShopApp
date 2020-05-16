using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShop.API.Dtos
{
	public class OrderForPaymentDto
	{
		public int IdUser { get; set; } // ID khách hàng
		public string Receiver { get; set; } // người nhận
		public string Email { get; set; }
		public string PhoneNumber { get; set; }
		public string Address { get; set; }
	}
}
