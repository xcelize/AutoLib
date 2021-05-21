using Autolib.Entities;
using Autolib.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Autolib.Modeles.DAO
{
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        IEnumerable<ClientEntity> GetAll();
        ClientEntity GetById(int id);
        Client createClient(Client client);
    }
    public class UserService : IUserService
    {
        private readonly AppSettings _appSettings;
        private autolibContext context = new autolibContext();
        // users hardcoded for simplicity, store in a db with hashed passwords in production applications
        private List<ClientEntity> _users = new List<ClientEntity>();

        public UserService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
            foreach(Client c  in context.Clients.ToList())
            {
                _users.Add(new ClientEntity { IdClient = c.IdClient, DateNaissance = c.DateNaissance, Login = c.Login, Nom = c.Nom, Password = c.Password, Prenom=c.Prenom });
            }
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            var client = _users.SingleOrDefault(x => x.Login == model.Username && x.Password == model.Password);

            // return null if user not found
            if (client == null) return null;

            // authentication successful so generate jwt token
            var token = generateJwtToken(client);

            return new AuthenticateResponse(client, token);
        }

        public IEnumerable<ClientEntity> GetAll()
        {
            return _users;
        }

        public ClientEntity GetById(int id)
        {
            return _users.FirstOrDefault(x => x.IdClient == id);
        }

        public async Task<Client> createClient(Client client)
        {
            try
            {
                await context.AddAsync(client);
                await context.SaveChangesAsync();
                return client;
            }
            catch
            {
                return null;
            }
        }

        // helper methods

        private string generateJwtToken(ClientEntity user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.IdClient.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
