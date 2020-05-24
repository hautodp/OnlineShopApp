using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OnlineShop.API.Models
{
	// Sản phẩm
	public class Product
	{
		[Key]
		public int IDProduct { get; set; }
		public string Name { get; set; }
		public decimal Price { get; set; }
		public string Introduction { get; set; } // giới thiệu
		public DateTime Created { get; set; } // Ngày tạo
		public DateTime Updated { get; set; } // Ngày cập nhập
		public int Quantity { get; set; } // Số lượng còn
		public bool IsNew { get; set; }
		public string Description { get; set; }
		public Manufacturer manufacturer { get; set; }
		public int IDManufacturer { get; set; } // ID nhà sản xuất
		public ICollection<Photo> Photos{ get; set; } // album photos of product
	}
}