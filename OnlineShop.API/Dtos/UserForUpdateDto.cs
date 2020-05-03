using System;

namespace OnlineShop.API.Dtos
{
    public class UserForUpdateDto
    {
        public string Fullname { get; set; }
        public string Username { get; set; }
        public DateTime DateOfBirthday { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public DateTime LastActived { get; set; }

        public UserForUpdateDto()
        {
            LastActived=DateTime.Now;
        }
    }
}