using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace RepositoryModel.MapperProfile
{
    public class MapperHelper
    {
        static MapperHelper _instance;

        private MapperHelper()
        {
            Mapper.Initialize(conf => {
                

            });

        }

        public static MapperHelper Instance
        {
            get
            {
                if (_instance == null)
                    _instance = new MapperHelper();

                return _instance;
            }
        }

        public To Map<From, To>(From obj)
        {
            return Mapper.Map<To>(obj);
        }

        public To Map<From, To>(From from, To to)
        {
            return Mapper.Map(from, to);
        }
    }
}
