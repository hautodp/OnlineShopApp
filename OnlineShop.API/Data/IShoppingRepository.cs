using System.Collections.Generic;
using System.Threading.Tasks;
using OnlineShop.API.Helpers;
using OnlineShop.API.Models;

namespace OnlineShop.API.Data
{
    public interface IShoppingRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();

        // Product
        
	    Task<PagedList<Product>> GetProducts(ProductParams productParams);
        Task<Product> GetProduct(int id);

        // User
        Task<User> GetUser(int id);

        // Manufacturer
        Task<IEnumerable<Manufacturer>> GetManufacturers();
        Task<Manufacturer> GetManufacturer(int id);
		Task<Product> FindProduct(int id);
    }
}