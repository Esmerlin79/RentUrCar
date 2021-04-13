using RepositoryModel;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Repository.Interface
{
    public interface IRepository<DB>
    {
        IEnumerable<Ent> Find<Ent>(Expression<Func<Ent, bool>> specification) where Ent : class;
        IEnumerable<Ent> GetAll<Ent>() where Ent : class;
        Ent GetById<Ent>(int id) where Ent : class;
        ServiceResult Insert<Ent>(Ent entity) where Ent : class;
        ServiceResult Edit<Ent>(Ent entity) where Ent : class;
        ServiceResult Delete<Ent>(int id) where Ent : class;
    }
}
