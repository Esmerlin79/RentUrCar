using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repository.Interface;
using RepositoryModel.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace renturcar.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class RentarCarController : ControllerBase
    {
        private readonly IRentarCar _rentCar;
        public RentarCarController(IRentarCar rentCar)
        {
            _rentCar = rentCar;
        }
        [HttpGet("[action]")]
        public IActionResult getAllCars()
        {
            var user = _rentCar.GetAll();
            return Ok(user);
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> SaveCar(CarViewModel model)
        {
            var result = await _rentCar.saveCar(model);
            return Ok(result);
        }
        [HttpPost("[action]")]
        public IActionResult rentCar(CarViewModel model)
        {
            var result =  _rentCar.rentCar(model);
            return Ok(result);
        }
    }
}
