using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Autolib.Entities
{
    public class ClientEntity
    {
        public int IdClient { get; set; }
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public DateTime? DateNaissance { get; set; }

        public string Login { get; set; }
        [JsonIgnore]
        public string Password { get; set; }
    }
}
