using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Autolib.Modeles.DAO
{
    public class StationService
    {

        private static StationService instance;
        private static autolibContext context;

        public static StationService getInstance()
        {
            if (StationService.instance == null)
            {
                StationService.instance = new StationService();
                context = new autolibContext();
            }
            return StationService.instance;
        }

        private StationService() { }

        public async Task<IEnumerable<Station>> getAll()
        {
            var stations = await context.Stations.Include(a => a.Bornes).ToListAsync();
            return stations;
        }

        public async Task<Station> getStation(int id)
        {
            var station = await context.Stations.FindAsync(id);
            if (station == null)
            {
                return null;
            }
            return station;
        }

        public async Task<Station> updateStation(int id, Station p_station)
        {
            var station = await context.Stations.FindAsync(id);
            station = p_station;
            try
            {
                await context.SaveChangesAsync();
                return station;
            }
            catch (DbUpdateConcurrencyException) when (!StationExists(id))
            {
                return null;
            }
        }

        public async Task<Station> postStation(Station station)
        {
            try
            {
                await context.AddAsync(station);
                await context.SaveChangesAsync();
                return station;
            }
            catch
            {
                return null;
            }
        }

        private bool StationExists(long id) =>context.Stations.Any(e => e.IdStation == id);



    }
}
