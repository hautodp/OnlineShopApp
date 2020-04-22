using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OnlineShop.API.Models
{
    // Nhà sản xuất
    public class Manufacturer
    {
        [Key]
        public int IDManufacturer { get; set; }
        public string Name { get; set; } 
        public string Contact { get; set; } // Liên hệ
        public bool IsAtive { get; set; } // Trạng thái
        public ICollection<Product> products{ get; set; }
    }
}