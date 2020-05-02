using System;

namespace OnlineShop.API.Dtos
{
    public class UserForDetailDto
    {
        public int Id { get; set; }
        public string Fullname { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public DateTime DateOfBirthday { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActived { get; set; }
    }
}