using System.Collections.Generic;
using System.Threading.Tasks;
using OnlineShop.API.Models;

namespace OnlineShop.API.Data
{
    public interface IProductRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
        Task<IEnumerable<Product>> GetProducts();
        Task<Product> GetProduct(int id);
    }
}