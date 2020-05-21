using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShop.API.Dtos
{
    public class ProductForUpdateDto
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Introduction { get; set; } // giới thiệu
        public DateTime Updated { get; set; } // Ngày cập nhập
        public int Quantity { get; set; } // Số lượng còn
        public bool IsNew { get; set; }
        public string Description { get; set; }
        public int IDManufacturer { get; set; } // ID nhà sản xuất

        public ProductForUpdateDto()
        {
            Updated = DateTime.Now;
        }
    }
}
