using RepositoryModel.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Repository.Interface
{
    public interface IJwtGenerate
    {
        string CreateToken(User user);
    }
}
