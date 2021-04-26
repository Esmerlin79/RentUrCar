using Microsoft.IdentityModel.Tokens;
using renturcar.Tests.Seeds;
using Repository.Service;
using RepositoryModel.Model;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using Xunit;

namespace renturcar.Tests.Services
{
    public class JwtGenerateTest
    {
        public JwtGenerateTest ()
        {
            this.users = UsersSeed.FakeData().ToList();
        }
        private List<User> users;
        [Fact]
        public void CreateToken_WhenCreateTokenWithAValidUser_ShouldReturnAValidToken()
        {
            //Given
            var user = new User()
            {
                Id = new Random().ToString(),
                name = new Guid().ToString(),
                lastName = new Guid().ToString(),
                Email = new Guid().ToString(),
                UserName = new Guid().ToString()
            };
            //When
            var jwtGenerate = new JwtGenerate();
            var token = jwtGenerate.CreateToken(user);
            var tokenHandler = new JwtSecurityTokenHandler();
            //Then
            Assert.True(tokenHandler.CanReadToken(token));
        }

        [Fact]
        public void CreateToke_WhenCreateTokenWithInvalidUser_ShouldThrowAnException()
        {
            //Given
            var user = new User() // User Without username
            {
                Id = new Random().ToString(),
                name = new Guid().ToString(),
                lastName = new Guid().ToString(),
                Email = new Guid().ToString()
            };
            //When
            var jwtGenerate = new JwtGenerate();
            //Then
            Assert.Throws<ArgumentNullException>(() => jwtGenerate.CreateToken(user));
        }
    }
}