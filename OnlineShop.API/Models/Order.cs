using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OnlineShop.API.Models
{
    // Hóa đơn
    public class Order
    {
        [Key]
        public int IDOrder { get; set; }
        public string Paid { get; set; } // đã thanh toán
        public int OrderState { get; set; } // tình trạng đơn hàng
        public DateTime OrderDate { get; set; } // ngày đặt hàng
        public DateTime DeliveryDate { get; set; } // ngày giao hàng
        public int IdUser { get; set; } // ID khách hàng
        public string Receiver { get; set; } // người nhận
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public ICollection<OrderDetail> orderDetails { get; set; }
    }
}