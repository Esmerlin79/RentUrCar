using renturcar.Tests.Seeds;
using RepositoryModel.Model;
using RepositoryModel.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace renturcar.tests.Tests.Services
{
    public class UserServicesTest : Configuration
    {
        private readonly User _newUser;
        public UserServicesTest()
        {
            _newUser = new User()
            {
                Id = Guid.NewGuid().ToString(),
                UserName = $"Usuario de Prueba",
                EmailConfirmed = true,
                PasswordHash = "AQAAAAEAACcQAAAAEP32z2z2+NZt4O2IBFP8O3gvf1n1cVQSBG0LSEHMEUwxtK6VzViI9/hiO2x64NkNqA==",
                SecurityStamp = "YG7CEDAPLPJ2KZ6EWFFZOZSTM27XSAK7",
                ConcurrencyStamp = "abbd5e06-2115-42e5-9f07-534aa3ea974f",
                PhoneNumber = "(809) 111-1111",
                PhoneNumberConfirmed = true,
                TwoFactorEnabled = false,
                LockoutEnabled = true,
            };

            _context.Users.Add(_newUser);
            _context.SaveChangesAsync();
        }

        [Fact]
        public async Task LoginUser_WhenLoginIncorrectUser_SuccessfullShouldBeFalse()
        {

            var loginModel = new LoginViewModel()
            {
                Password = "aA!12345",
                UserName = "Usuario de Prueb"
            };

            var result = await _userServiceMock.Login(loginModel);

            Assert.False(result.Successfull);

        }

        [Fact]
        public async Task LoginUser_WhenLoginWithoutUsername_SuccessfullShouldBeFalse()
        {

            var loginModel = new LoginViewModel()
            {
                Password = "aA!12345",
                UserName = ""
            };

            var result = await _userServiceMock.Login(loginModel);

            Assert.False(result.Successfull);

        }

        [Fact]
        public async Task RegisterUser_WhenRegisteringWIthoutAField_SuccessfullShouldBeFalse()
        {

            var mockUser = new RegisterViewModel() { Username = null, Apellidos = null, Email = null, Nombre=null, Password=null };

            var result = await _userServiceMock.RegisterUser(mockUser);

            Assert.False(result.Successfull);

        }
    }

}
