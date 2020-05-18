using System;
using System.ComponentModel.DataAnnotations;

namespace OnlineShop.API.Dtos.Admin
{
    public class AdminForRegisterDto
    {
        [Required]
        public string Username { get; set; }
        public string Fullname { get; set; }
        [Required]
        [StringLength(10, MinimumLength=4, ErrorMessage="You must specify password between 4 and 10 characters")]
        public string Password { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public DateTime Created { get; set; }
        public bool Status { get; set; }
        public AdminForRegisterDto()
        {
            Created=DateTime.Now;
            Status=true;
        }
    }
}