using System.Threading;
using System.Security.AccessControl;
using System;
using Newtonsoft.Json;
using System.Collections.Generic;
using OnlineShop.API.Models;
using System.Linq;

namespace OnlineShop.API.Data
{
    public class Seed
    {
        public static void SeedProducts(DataContext context)
        {
            if(!context.Products.Any())
            {
                var productData=System.IO.File.ReadAllText("Data/ProductSeedData.json");
                var products=JsonConvert.DeserializeObject<List<Product>>(productData);
                foreach(var product in products)
                {
                    context.Products.Add(product);
                }
                context.SaveChanges();
            }
        }
    }
}