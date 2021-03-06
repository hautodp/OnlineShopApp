﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShop.API.Dtos
{
    public class UserForListDto
    {
        public int Id { get; set; }
        public string Fullname { get; set; }
        public string Username { get; set; }
        public DateTime DateOfBirthday { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public DateTime Created { get; set; }
    }
}
