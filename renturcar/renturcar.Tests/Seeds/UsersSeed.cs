using Repository.DataContext;
using RepositoryModel.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace renturcar.Tests.Seeds
{
    public class UsersSeed
    {
        public static IEnumerable<User> FakeData()
        {
            int totalUsers = 3;
            var users = new List<User>();

            for(int index = 1; index <= totalUsers; index++)
            {
                var user = new User()
                {
                    Id = new Random().ToString(),
                    name = new Guid().ToString(),
                    lastName = new Guid().ToString(),
                    Email = new Guid().ToString()
                };

                users.Add(user);
            }

            return users;
        }

        public static int Seed(AppDbContext context)
        {
            var users = FakeData();

            context.Set<User>().AddRange(users);
            context.SaveChanges();

            return users.Count();
        }
    }
}