using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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
			var products = _context.Products.Include(p => p.Photos); //tải thông tin liên quan đến hình ảnh với từng sản phẩm
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
    }
}