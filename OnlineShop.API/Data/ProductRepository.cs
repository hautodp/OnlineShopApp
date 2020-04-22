using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OnlineShop.API.Models;

namespace OnlineShop.API.Data
{
    public class ProductRepository : IProductRepository
    {
        public readonly DataContext _context ;
        public ProductRepository(DataContext context)
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

        public async Task<IEnumerable<Product>> GetProducts()
        {
            var products=await _context.Products.Include(p =>p.Photos).ToListAsync();
            return products;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync()>0;
        }
    }
}