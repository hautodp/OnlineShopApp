namespace OnlineShop.API.Models
{
    public class ProductSelection
    {
        public int IdProduct { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string PhotoUrl { get; set; }
        public int Quantity { get; set; }
    }
}