using Autolib.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Autolib.Modeles
{
    public class AuthenticateResponse
    {
        public int Id { get; set; }
        public string Prenom { get; set; }
        public string Nom { get; set; }

        public DateTime? DateNaissance { get; set; }
        public string Login { get; set; }
        public string Token { get; set; }


        public AuthenticateResponse(ClientEntity client, string token)
        {
            Id = client.IdClient;
            Login = client.Login;
            Prenom = client.Prenom;
            Nom = client.Nom;
            DateNaissance = client.DateNaissance;
            Login = client.Login;
            Token = token;
        }
    }
}
