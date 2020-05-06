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
		Task<PagedList<Product>> GetProducts(ProductParams productParams);
		Task<Product> GetProduct(int id);
		Task<User> GetUser(int id);
	}
}