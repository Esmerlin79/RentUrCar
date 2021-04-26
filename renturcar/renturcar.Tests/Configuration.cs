using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Moq;
using Repository.DataContext;
using Repository.Service;
using RepositoryModel.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace renturcar.tests
{
    public class Configuration : IDisposable
    {
        protected AppDbContext _context;
        protected readonly UserManager<User> _userManagerMock;
        protected readonly SignInManager<User> _signInManagerMock;

        protected readonly DbContextOptions<AppDbContext> _optionsMock;
        protected readonly UserService _userServiceMock;

        public Configuration()
        {
            _optionsMock = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking)
                .EnableSensitiveDataLogging()
                .Options;

            _context = new AppDbContext(_optionsMock);

            _context.Database.EnsureCreated();

            var userStore = new Mock<IUserStore<User>>().Object;

            var userManager = new Mock<UserManager<User>>(
                userStore, null, null, null, null, null, null, null, null
            );

            userManager.Setup(userMnger => userMnger.CreateAsync(It.IsAny<User>(), It.IsAny<string>())).ReturnsAsync(IdentityResult.Success);
            userManager.Setup(userMnger => userMnger.DeleteAsync(It.IsAny<User>())).ReturnsAsync(IdentityResult.Success);

            _signInManagerMock = new Mock<SignInManager<User>>(
                userManager.Object,
                Mock.Of<HttpContextAccessor>(),
                Mock.Of<IUserClaimsPrincipalFactory<User>>(),
                null, null, null, null
            ).Object;

            _userManagerMock = userManager.Object;
            _userServiceMock = new UserService(_userManagerMock, _signInManagerMock, new JwtGenerate(), null, null);
        }

        public void Dispose()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }
    }
}
