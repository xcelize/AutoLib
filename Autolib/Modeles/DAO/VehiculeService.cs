using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Autolib.Modeles.DAO
{
    public class VehiculeService
    {
        private static VehiculeService instance;
        private static autolibContext context;
        public static VehiculeService getInstance()
        {
            if (VehiculeService.instance == null)
            {
                VehiculeService.instance = new VehiculeService();
                context = new autolibContext();
            }
            return VehiculeService.instance;
        }

        private VehiculeService() { }

        public async Task<Vehicule> getVehicule(int id)
        {
            var vehicule = await context.Vehicules.FindAsync(id);
            if (vehicule == null)
            {
                return null;
            }
            return vehicule;
        }

    }
}
