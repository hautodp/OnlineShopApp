using System.Collections.Generic;
using System.Threading.Tasks;
using OnlineShop.API.Dtos;
using OnlineShop.API.Helpers;
using OnlineShop.API.Models;

namespace OnlineShop.API.Data
{
	public interface IShoppingRepository
	{
		void Add<T>(T entity) where T : class;
		void Delete<T>(T entity) where T : class;

		Task<bool> SaveAll();

		// Product

        Task<PagedList<Product>> GetProducts(ProductParams productParams);
        Task<PagedList<Product>> GetProductsForAdmin(ProductParamsForAdmin productParamsForAdmin);
        Task<Product> GetProduct(int id);
        Task<IEnumerable<Product>> GetAllProducts();
        // User
        Task<PagedList<User>> GetUsers(UserParams userParams);
        Task<User> GetUser(int id);
        Task<Photo> GetPhoto(int id);
        Task<Photo> GetMainPhotoForProduct(int idProduct);
        // Manufacturer
        //Task<IEnumerable<Manufacturer>> GetManufacturers();
        Task<PagedList<Manufacturer>> GetManufacturers(ManufacturerParams manufacturerParams);
        Task<Manufacturer> GetManufacturer(int id);
        Task<Product> FindProduct(int id);		//Order
		Task<IEnumerable<Order>> GetOrders();
		Task<IEnumerable<Order>> GetOrdersByUserID(int UserID);
		Task<Order> GetOrderById(int id);
		Task<int> CreateOrder(OrderForPaymentDto orderFor);

		//Order Detail
		Task<int> CreateOrderDetail(int IdOrder, ProductSelection[] productSelections);
		Task<IEnumerable<OrderDetail>> GetOrderDetails(int OrderID);
	}
}