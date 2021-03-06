using Microsoft.AspNetCore.Identity;
using Repository.DataContext;
using Repository.Interface;
using RepositoryModel;
using RepositoryModel.Model;
using RepositoryModel.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Service
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IJwtGenerate _jwtGenerate;
        private readonly IUnitOfWork<AppDbContext> _context;
        //private readonly IUserSession _userSession;
        public UserService(UserManager<User> userManager, SignInManager<User> signInManager, IJwtGenerate jwtGenerate, IUnitOfWork<AppDbContext> context)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtGenerate = jwtGenerate;
          //  _userSession = userSession;
        }

        public Task<ServiceResult> Login(LoginViewModel model)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResult> RegisterUser(RegisterViewModel model)
        {
            var response = new ServiceResult();

            if (string.IsNullOrEmpty(model.Nombre) || string.IsNullOrEmpty(model.Apellidos) 
                || string.IsNullOrEmpty(model.Email) || string.IsNullOrEmpty(model.Password) || string.IsNullOrEmpty(model.Username))
            {
                response.Successfull = false;
                response.Messages.Add("Los Campos son obligatorios");
                return response;
            }

            var userExist = _context.Where<User>(x => x.Email == model.Email);
            if (userExist.Count() > 0)
            {
                response.Successfull = false;
                response.Messages.Add("Un usuario ya existe con este email");
                return response;
            }
            var existUsername = _context.Where<User>(x => x.UserName == model.Username);
            if (existUsername.Count() > 0)
            {
                response.Successfull = false;
                response.Messages.Add("Un usuario ya existe con este username");
                return response;
            }

            var user = new User
            {
                name = model.Nombre,
                lastName = model.Apellidos,
                Email = model.Email,
                UserName = model.Username
            };

            var result = await _userManager.CreateAsync(user, model.Password);


            if (!result.Succeeded)
            {
                response.Successfull = false;
                foreach (var resu in result.Errors)
                {
                    response.Messages.Add(resu.Description);
                }
                return response;
            }

            var userData = new UserViewModel
            {
                name = user.name,
                lastName = user.lastName,
                Token = _jwtGenerate.CreateToken(user),
                Username = user.UserName,
                Email = user.Email
            };
            response.Successfull = true;
            response.Messages.Add("Usuario Registrado");
            response.Data = userData;

            return response;
        }

        public Task<ServiceResult> UserSesion()
        {
            throw new NotImplementedException();
        }
    }
}
