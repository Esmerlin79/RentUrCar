using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RepositoryModel.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Repository.DataContext
{
    public class AppDbContext : IdentityDbContext<User>
    {
       public AppDbContext(DbContextOptions<AppDbContext> options)
          : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
