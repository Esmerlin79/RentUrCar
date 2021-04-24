using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryModel.ViewModels
{
    public class CarViewModel
    {
        public int Id { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string OwnerId { get; set; }
        public string photo { get; set; }
        public int PricePerDay { get; set; }
        public int status { get; set; }
    }
}
