
using Autolib.Helpers;
using Autolib.Modeles;
using Autolib.Modeles.DAO;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Autolib.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    { 
        private IUserService _userService;

        public ClientController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var response = _userService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }
        
        /*
         [HttpPost]
        public async Task<IActionResult> Inscription([FromBody] Client c)
        {
            Client client = await createClient(c);
            if (client == null)
            {
                return NotFound();
            }
            return Ok(client);
        }
        */

        private Task<Client> createClient(Client client)
        {
            throw new NotImplementedException();
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
            return Ok(users);
        }
    }
}
