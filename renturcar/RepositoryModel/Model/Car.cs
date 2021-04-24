using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RepositoryModel.Model
{
    public class Car
    {
        [Required]
        public int Id { get; set; }
        public string Brand {get; set;}
        public string Model {get; set;}
        public string OwnerId {get; set;}

        [ForeignKey(nameof(OwnerId))]
        public User Owner {get; set;}   
        public string photo {get; set;}
        public int PricePerDay { get; set; }
        public int? status { get; set; }

    }
}