namespace OnlineShop.API.Models
{
    public class ProductSelection
    {
        public int idProduct { get; set; }
        public string name { get; set; }
        public decimal price { get; set; }
        //public string photoURL { get; set; }
        public int quantity { get; set; }
    }
}