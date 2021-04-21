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
        private readonly IUserSession _userSession;
        public UserService(UserManager<User> userManager, SignInManager<User> signInManager, IJwtGenerate jwtGenerate, IUnitOfWork<AppDbContext> context, IUserSession userSession)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtGenerate = jwtGenerate;
            _userSession = userSession;
        }

        public async Task<ServiceResult> Login(LoginViewModel model)
        {
            ServiceResult response = new ServiceResult();
            response.Successfull = false;

            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user == null)
            {
                response.Successfull = false;
                response.Messages.Add("El usuario No existe");
                return response;
            }
            var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);
            if (!result.Succeeded)
            {
                response.Successfull = false;
                response.Messages.Add("El password es invalido vuelva a intentarlo");
                return response;
            }
            try
            {
                var userView = new UserViewModel
                {
                    name = user.name,
                    lastName = user.lastName,
                    Token = _jwtGenerate.CreateToken(user),
                    Username = user.UserName,
                    Email = user.Email
                };

                response.Successfull = true;
                response.Messages.Add("Registro Exitoso");
                response.Data = userView;

            }
            catch (Exception ex)
            {
                response.Successfull = false;
                response.LogError(ex);
            }


            return response;
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

        public async Task<ServiceResult> UserSesion()
        {
            var response = new ServiceResult();
            response.Successfull = false;
            try
            {
                var findUser = await _userManager.FindByNameAsync(_userSession.getUserSession());

                var user = new UserViewModel
                {
                    name = findUser.name,
                    lastName = findUser.lastName,
                    Token = _jwtGenerate.CreateToken(findUser),
                    Username = findUser.UserName,
                    Email = findUser.Email
                };
                response.Successfull = true;
                response.Data = user;
                response.Messages.Add("Usuario Actual");
            }
            catch (Exception ex)
            {
                response.Successfull = false;
                response.Messages.Add("Hubo un error al momento de buscar el usuario" + " " + ex);

            }
            return response;
        }
    }
}
