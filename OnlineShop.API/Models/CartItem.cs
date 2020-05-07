using System;

namespace OnlineShop.API.Models
{
    [Serializable]
    public class CartItem
    {
        public ProductItem ProductItem { get; set; }
        public int Quantity { get; set; }
    }

    public class ProductItem{
        public int IDProduct { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string PhotoURL { get; set; }
    }
}