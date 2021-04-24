using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Repository.DataContext;
using Repository.Interface;
using RepositoryModel;
using RepositoryModel.Model;
using RepositoryModel.ViewModels;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Service
{
    public class RentarCarService : IRentarCar
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IUnitOfWork<AppDbContext> _context;
        private readonly IUserSession _userSession;
        public RentarCarService(UserManager<User> userManager, SignInManager<User> signInManager,  IUnitOfWork<AppDbContext> context, IUserSession userSession)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _userSession = userSession;
        }

        public IEnumerable<CarViewModel> GetAll()
        {
            return _context.GetAll<CarViewModel, Car>();
        }

        public ServiceResult rentCar(CarViewModel model)
        {
            var response = new ServiceResult();
            response.Successfull = false;

            try
            {
               
                response = _context.Update<CarViewModel, Car>(model);
                response.Successfull = true;
                return response;
            }
            catch(Exception ex)
            {
                response.Messages.Add("Hubo un error");
                return response;
            }
        }

        public async Task<ServiceResult> saveImg(IFormFile File)
        {
            var response = new ServiceResult();
            response.Successfull = false;

            if (File == null || File.Length == 0)
            {
                response.Messages.Add("Seleccione una imagen");
                return response;
            }
            try
            {
                string strFileExtension = System.IO.Path.GetExtension(File.FileName);

                Guid guid = Guid.NewGuid();
                var name = guid.ToString() + strFileExtension;
                var path = Path.Combine(
                            Directory.GetCurrentDirectory(), "wwwroot/imgCars",
                            name);

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await File.CopyToAsync(stream);
                }
                response.Successfull = true;
                response.Data = "imgCars/" + name;
                return response;
            }
            catch(Exception ex)
            {
                response.Messages.Add("Hubo un error");
                return response;
            }
        }
        public async Task<ServiceResult> saveCar(CarViewModel model)
        {
            var response = new ServiceResult();
            response.Successfull = false;
            try
            {
                var findUser = await _userManager.FindByNameAsync(_userSession.getUserSession());
                model.OwnerId = findUser.Id;
                response = _context.Insert<CarViewModel, Car>(model);
                response.Successfull = true;
                return response;
            }
            catch(Exception ex)
            {
                response.Messages.Add("Hubo un error");
                return response;
            }
        }
    }
}
