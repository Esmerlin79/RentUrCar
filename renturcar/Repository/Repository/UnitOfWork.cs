using Repository.Interface;
using RepositoryModel;
using RepositoryModel.MapperProfile;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Repository.Repository
{
    public class UnitOfWork<Db> : IUnitOfWork<Db>
    {
        private readonly IRepository<Db> _context;
        public UnitOfWork(IRepository<Db> context)
        {
            _context = context;
        }
        public IEnumerable<vm> GetAll<vm, Ent>() where vm : class where Ent : class
        {
            var repo = _context.GetAll<Ent>();
            var response = MapperHelper.Instance.Map<IEnumerable<Ent>, IEnumerable<vm>>(repo);
            return response;
        }

        public ServiceResult GetById<vm, Ent>(int id) where vm : class where Ent : class
        {
            ServiceResult result = new ServiceResult();
            var repo = _context.GetById<Ent>(id);
            if (repo == null)
            {
                result.Successfull = false;
                result.Messages.Add("El Registro no se encontro");
                return result;
            }
            result.Successfull = true;
            result.Messages.Add("Registro encontrado");
            var response = MapperHelper.Instance.Map<Ent, vm>(repo);
            result.Data = response;
            return result;
        }

        public ServiceResult Insert<vm, ent>(vm viewmodel) where vm : class where ent : class
        {
            ServiceResult result = new ServiceResult();
            try
            {
                var entidad = MapperHelper.Instance.Map<vm, ent>(viewmodel);
                result = _context.Insert(entidad);
                result.Messages.Add(result.Successfull ? "Registro Agregado" : "Hubo un error");

            }
            catch (Exception ex)
            {
                result.LogError(ex);
            }
            return result;
        }

        public ServiceResult Update<vm, ent>(vm data) where vm : class where ent : class
        {
            ServiceResult result = new ServiceResult();
            try
            {
                var entidad = MapperHelper.Instance.Map<vm, ent>(data);
                result = _context.Edit(entidad);
                result.Messages.Add(result.Successfull ? "Datos Actualizados" : "Hubo un error");
            }
            catch (Exception ex)
            {
                result.LogError(ex);
            }
            return result;
        }

        public IEnumerable<Ent> Where<Ent>(Expression<Func<Ent, bool>> specification) where Ent : class
        {
            return _context.Find(specification);
        }
    }
}
