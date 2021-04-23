using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace RepositoryModel.Model
{
    public class CarRent
    {
        public int Id { get; set; }
        public DateTime RentalBegin { get; set; }
        public DateTime RentalEnd { get; set; }
        
        [ForeignKey(nameof(RenterId))]
        public User Renter { get; set; }
        public string RenterId { get; set; }
        
        [ForeignKey(nameof(CarForRentId))]
        public Car CarForRent { get; set; }
        public int CarForRentId { get; set; }

        public bool Rented { get; set; } = false;

    }   
}