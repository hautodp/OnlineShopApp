using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using OnlineShop.API.Data;

namespace OnlineShop.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message){
            response.Headers.Add("Application-Error",message);
            response.Headers.Add("Access-Control-Expose-Headers","Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin","*");
        }

		//Them thong tin ve phan trang cho header

		public static void AddPagination(this HttpResponse response, int currentPage, int itemsPerPage, int totalItems, int totalPages)
		{
			var paginationHeader = new PaginationHeader(currentPage, itemsPerPage, totalItems, totalPages);
			var camelFormatter = new JsonSerializerSettings();
			camelFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
			response.Headers.Add("Pagination", JsonConvert.SerializeObject(paginationHeader, camelFormatter));
			response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
		}
	}
}