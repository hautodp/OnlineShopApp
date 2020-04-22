using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.API.Models
{
    public class OrderDetail
    { 
        public Order order { get; set; }
        [Key, Column(Order = 0)]
        public int IDOrder { get; set; }
        public virtual Product product { get; set; }
        [Key, Column(Order = 1)]
        public int IDProduct { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
    }
}