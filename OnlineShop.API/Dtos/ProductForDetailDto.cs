using System;
using System.Collections.Generic;
using OnlineShop.API.Models;

namespace OnlineShop.API.Dtos
{
    public class ProductForDetailDto
    {
        public int IDProduct { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Introduction { get; set; } // giới thiệu
        public DateTime Created { get; set; } // Ngày tạo
        public DateTime Updated { get; set; } // Ngày cập nhập
        public int Quantity { get; set; } // Số lượng còn
        public bool IsNew { get; set; }
        public string PhotoURL { get; set; }
        public ICollection<PhotosForDetailDto> Photos{ get; set; } // album photos of product
    }
}