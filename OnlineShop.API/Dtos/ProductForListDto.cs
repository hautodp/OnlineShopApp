using OnlineShop.API.Models;

namespace OnlineShop.API.Dtos
{
	public class ProductForListDto
	{
		public int IDProduct { get; set; }
		public string Name { get; set; }
		public decimal Price { get; set; }
		public bool IsNew { get; set; }
        public int Quantity { get; set; }
        public string PhotoURL { get; set; }
		public int IDManufacturer { get; set; }
	}
}