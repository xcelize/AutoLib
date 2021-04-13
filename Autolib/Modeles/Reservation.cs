using System;
using System.Collections.Generic;

#nullable disable

namespace Autolib
{
    public partial class Reservation
    {
        public int Vehicule { get; set; }
        public int Client { get; set; }
        public DateTime DateReservation { get; set; }
        public DateTime? DateEcheance { get; set; }

        public virtual Client ClientNavigation { get; set; }
        public virtual Vehicule VehiculeNavigation { get; set; }
    }
}
