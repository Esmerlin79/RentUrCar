using System;
using System.Collections.Generic;
using System.Text;

namespace RepositoryModel.ViewModels
{
    public class RegisterViewModel
    {
        public string Nombre { get; set; }
        public string Apellidos { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
