using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OnlineShop.API.Dtos;
using OnlineShop.API.Helpers;
using OnlineShop.API.Models;

namespace OnlineShop.API.Data
{
	public class ShoppingRepository : IShoppingRepository
	{
		public readonly DataContext _context ;
		public ShoppingRepository(DataContext context)
		{
			_context = context;

		}
		public void Add<T>(T entity) where T : class
		{
			_context.Add(entity);
		}

		public void Delete<T>(T entity) where T : class
		{
			_context.Remove(entity);
		}

		public async Task<Product> GetProduct(int id)
		{
			var product=await _context.Products.Include(p=>p.Photos).FirstOrDefaultAsync(u=>u.IDProduct==id);
			return product;
		}

		public async Task<PagedList<Product>> GetProducts(ProductParams productParams)
		{
			var products = _context.Products.Include(p => p.Photos).AsQueryable(); //tải thông tin liên quan đến hình ảnh với từng sản phẩm
			products = products.Where(pro => pro.Price >= productParams.MinPrice && pro.Price <= productParams.MaxPrice); //Tìm kiếm sản phẩm theo giá min và max

			if (!string.IsNullOrEmpty(productParams.Name) && !(productParams.Name == "null"))
			{
				products = products.Where(pro => pro.Name.Contains(productParams.Name)); //.Contain() hoặc StartWith() or EndWith() ~ like '%12%'
			}

			//Filter products by Manufacturer
			if (productParams.IdManufacturer != -1)
			{
				products = products.Where(pro => pro.manufacturer.IDManufacturer == productParams.IdManufacturer);
			}
			if (!string.IsNullOrEmpty(productParams.OrderBy))
			{
				switch (productParams.OrderBy)
				{
					case "name":
						products = products.OrderByDescending(p => p.Name);
						break;
					case "price":
						products = products.OrderByDescending(p => p.Price);
						break;
				}
			}
			return await PagedList<Product>.CreateAsync(products, productParams.PageNumber, productParams.PageSize);
		}

		public async Task<bool> SaveAll()
		{
			return await _context.SaveChangesAsync()>0;
		}
		
		public async Task<User> GetUser(int id)
		{
			var user=await _context.Users.FirstOrDefaultAsync(u=>u.Id==id);
			return user;
		}

		public async Task<Manufacturer> GetManufacturer(int id)
		{
			var manufacturer = await _context.Manufacturers.FirstOrDefaultAsync(m=>m.IDManufacturer==id);
			return manufacturer;
		}
		public async Task<IEnumerable<Manufacturer>> GetManufacturers()
		{
			var manufacturers = await _context.Manufacturers.ToListAsync();
			return manufacturers;
		}

		public async Task<Product> FindProduct(int id)
		{
			var product=await _context.Products.FirstOrDefaultAsync(u=>u.IDProduct==id);
			return product;
		}

		//order controller
		public async Task<IEnumerable<Order>> GetOrders()
		{
			var orders = await _context.Orders.ToListAsync();
			return orders;
		}

		public async Task<Order> CreateOrder(OrderForPaymentDto orderFor)
		{
			DateTime today = DateTime.Now;
			Order order = new Order();
			order.Address = orderFor.Address;
			order.Email = orderFor.Email;
			order.IdUser = orderFor.IdUser;
			order.OrderState = 1;
			order.Paid = "Chua thanh toan";
			order.PhoneNumber = orderFor.PhoneNumber;
			order.Receiver = orderFor.Receiver;
			order.OrderDate = today;
			order.DeliveryDate = today.AddDays(3);
			await _context.Orders.AddAsync(order);
			await _context.SaveChangesAsync();
			return order;
		}


	}
}