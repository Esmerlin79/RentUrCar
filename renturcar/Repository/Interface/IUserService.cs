using RepositoryModel;
using RepositoryModel.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interface
{
    public interface IUserService
    {
        Task<ServiceResult> Login(LoginViewModel model);
        Task<ServiceResult> RegisterUser(RegisterViewModel model);
        Task<ServiceResult> UserSesion();
    }
}
