using System.Threading.Tasks;
using OnlineShop.API.Models;

namespace OnlineShop.API.Data
{
    public interface IAuthRepository
    {
         Task<User> Register(User customer, string password);
         Task<User> Login(string username,string password);
         Task<bool> UserExists(string username);

         // Admin
         Task<Admin> RegisterAdmin(Admin admin, string password);
         Task<Admin> LoginAdmin(string username, string password);
         Task<bool> AdminExists(string username);
    }
}