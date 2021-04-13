using Autolib.Modeles.DAO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Autolib.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StationController : ControllerBase
    {

        // GET: api/<StationController>
        [HttpGet]
        public async Task<IEnumerable<Station>> Get()
        {
            var stations = await StationService.getInstance().getAll();
            return stations;
        }

        // GET api/<StationController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            Station station = await StationService.getInstance().getStation(id);
            if (station == null)
            {
                return NotFound();
            }
            return Ok(station);
        }

        // POST api/<StationController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Station value)
        {
            Station station = await StationService.getInstance().postStation(value);
            if (station == null)
            {
                return NotFound();
            }
            return Ok(station);      
        }

        // PUT api/<StationController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<StationController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
