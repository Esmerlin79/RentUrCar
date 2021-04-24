using Microsoft.AspNetCore.Http;
using RepositoryModel;
using RepositoryModel.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interface
{
    public interface IRentarCar
    {
        IEnumerable<CarViewModel> GetAll();
        Task<ServiceResult> saveCar(CarViewModel model);
        ServiceResult rentCar(CarViewModel model);
        Task<ServiceResult> saveImg(IFormFile File);
    }
}
