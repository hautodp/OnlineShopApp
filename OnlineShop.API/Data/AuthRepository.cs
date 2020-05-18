using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OnlineShop.API.Models;

namespace OnlineShop.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;

        public AuthRepository(DataContext context)
        {
            _context=context;
        }
        public async Task<User> Login(string username, string password)
        {
            var user=await _context.Users.FirstOrDefaultAsync(x =>x.Username==username);

            if(user==null)
                return null;

            if(!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using(var hmac=new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computeHash=hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for(int i=0;i<computeHash.Length;i++){
                    if(computeHash[i]!=passwordHash[i])
                        return false;
                }
                return true;
            }
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash,passwordSalt;
            CreatePasswordHash(password,out passwordHash,out passwordSalt);

            user.PasswordHash=passwordHash;
            user.PasswordSalt=passwordSalt;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
           using(var hmac=new System.Security.Cryptography.HMACSHA512())
           {
               passwordSalt=hmac.Key;
               passwordHash=hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
           }
        }

        public async Task<bool> UserExists(string username)
        {
            if(await _context.Users.AnyAsync(x =>x.Username==username))
                return true;
            return false;
        }

        public async Task<Admin> RegisterAdmin(Admin admin, string password)
        {
            byte[] passwordHash,passwordSalt;
            CreatePasswordHash(password,out passwordHash,out passwordSalt);

            admin.PasswordHash=passwordHash;
            admin.PasswordSalt=passwordSalt;

            await _context.Admins.AddAsync(admin);
            await _context.SaveChangesAsync();

            return admin;
        }

        public async Task<Admin> LoginAdmin(string username, string password)
        {
            var admin = await _context.Admins.FirstOrDefaultAsync(x =>x.Username==username);
            if(admin==null)
                return null;

            if(!VerifyPasswordHash(password, admin.PasswordHash, admin.PasswordSalt))
                return null;

            return admin;
        }

        public async Task<bool> AdminExists(string username)
        {
            if(await _context.Admins.AnyAsync(x =>x.Username==username))
                return true;
            return false;
        }
    }
}