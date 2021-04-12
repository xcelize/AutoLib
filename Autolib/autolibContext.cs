using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace Autolib
{
    public partial class autolibContext : DbContext
    {
        public autolibContext()
        {
        }

        public autolibContext(DbContextOptions<autolibContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Borne> Bornes { get; set; }
        public virtual DbSet<Client> Clients { get; set; }
        public virtual DbSet<Reservation> Reservations { get; set; }
        public virtual DbSet<Station> Stations { get; set; }
        public virtual DbSet<TypeVehicule> TypeVehicules { get; set; }
        public virtual DbSet<Utilise> Utilises { get; set; }
        public virtual DbSet<Vehicule> Vehicules { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySql("server=localhost;database=autolib;user=root;treattinyasboolean=true", Microsoft.EntityFrameworkCore.ServerVersion.FromString("5.7.31-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Borne>(entity =>
            {
                entity.HasKey(e => e.IdBorne)
                    .HasName("PRIMARY");

                entity.ToTable("borne");

                entity.HasIndex(e => e.Station, "fk_Borne_Station1_idx");

                entity.HasIndex(e => e.IdVehicule, "fk_Borne_Vehicule1_idx");

                entity.Property(e => e.IdBorne)
                    .HasColumnType("int(11)")
                    .HasColumnName("idBorne");

                entity.Property(e => e.EtatBorne).HasColumnName("etatBorne");

                entity.Property(e => e.IdVehicule)
                    .HasColumnType("int(11)")
                    .HasColumnName("idVehicule");

                entity.Property(e => e.Station)
                    .HasColumnType("int(11)")
                    .HasColumnName("station");

                entity.HasOne(d => d.IdVehiculeNavigation)
                    .WithMany(p => p.Bornes)
                    .HasForeignKey(d => d.IdVehicule)
                    .HasConstraintName("fk_Borne_Vehicule1");

                entity.HasOne(d => d.StationNavigation)
                    .WithMany(p => p.Bornes)
                    .HasForeignKey(d => d.Station)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_Borne_Station1");
            });

            modelBuilder.Entity<Client>(entity =>
            {
                entity.HasKey(e => e.IdClient)
                    .HasName("PRIMARY");

                entity.ToTable("client");

                entity.Property(e => e.IdClient)
                    .HasColumnType("int(11)")
                    .HasColumnName("idClient");

                entity.Property(e => e.DateNaissance)
                    .HasColumnType("date")
                    .HasColumnName("date_naissance");

                entity.Property(e => e.Nom)
                    .IsRequired()
                    .HasColumnType("varchar(45)")
                    .HasColumnName("nom")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Prenom)
                    .IsRequired()
                    .HasColumnType("varchar(45)")
                    .HasColumnName("prenom")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");
            });

            modelBuilder.Entity<Reservation>(entity =>
            {
                entity.HasKey(e => new { e.Vehicule, e.Client, e.DateReservation })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0, 0 });

                entity.ToTable("reservation");

                entity.HasIndex(e => e.Client, "fk_Reservation_Client1_idx");

                entity.HasIndex(e => e.Vehicule, "fk_Reservation_Vehicule1_idx");

                entity.Property(e => e.Vehicule)
                    .HasColumnType("int(11)")
                    .HasColumnName("vehicule");

                entity.Property(e => e.Client)
                    .HasColumnType("int(11)")
                    .HasColumnName("client");

                entity.Property(e => e.DateReservation)
                    .HasColumnType("datetime")
                    .HasColumnName("date_reservation");

                entity.Property(e => e.DateEcheance)
                    .HasColumnType("datetime")
                    .HasColumnName("date_echeance");

                entity.HasOne(d => d.ClientNavigation)
                    .WithMany(p => p.Reservations)
                    .HasForeignKey(d => d.Client)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_Reservation_Client1");

                entity.HasOne(d => d.VehiculeNavigation)
                    .WithMany(p => p.Reservations)
                    .HasForeignKey(d => d.Vehicule)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_Reservation_Vehicule1");
            });

            modelBuilder.Entity<Station>(entity =>
            {
                entity.HasKey(e => e.IdStation)
                    .HasName("PRIMARY");

                entity.ToTable("station");

                entity.Property(e => e.IdStation)
                    .HasColumnType("int(11)")
                    .HasColumnName("idStation");

                entity.Property(e => e.Adresse)
                    .HasColumnType("varchar(200)")
                    .HasColumnName("adresse")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.CodePostal)
                    .HasColumnType("int(11)")
                    .HasColumnName("code_postal");

                entity.Property(e => e.Latitude)
                    .HasPrecision(9, 6)
                    .HasColumnName("latitude");

                entity.Property(e => e.Longitude)
                    .HasPrecision(9, 6)
                    .HasColumnName("longitude");

                entity.Property(e => e.Numero)
                    .HasColumnType("int(11)")
                    .HasColumnName("numero");

                entity.Property(e => e.Ville)
                    .HasColumnType("varchar(100)")
                    .HasColumnName("ville")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");
            });

            modelBuilder.Entity<TypeVehicule>(entity =>
            {
                entity.HasKey(e => e.IdTypeVehicule)
                    .HasName("PRIMARY");

                entity.ToTable("type_vehicule");

                entity.Property(e => e.IdTypeVehicule)
                    .HasColumnType("int(11)")
                    .HasColumnName("idType_vehicule");

                entity.Property(e => e.Categorie)
                    .IsRequired()
                    .HasColumnType("varchar(45)")
                    .HasColumnName("categorie")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.TypeVehicule1)
                    .IsRequired()
                    .HasColumnType("varchar(45)")
                    .HasColumnName("type_vehicule")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");
            });

            modelBuilder.Entity<Utilise>(entity =>
            {
                entity.HasKey(e => new { e.Vehicule, e.Client, e.Date })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0, 0 });

                entity.ToTable("utilise");

                entity.HasIndex(e => e.Client, "fk_table1_Client1_idx");

                entity.HasIndex(e => e.BorneDepart, "fk_utilise_Borne1_idx");

                entity.HasIndex(e => e.BorneArrivee, "fk_utilise_Borne2_idx");

                entity.Property(e => e.Vehicule).HasColumnType("int(11)");

                entity.Property(e => e.Client).HasColumnType("int(11)");

                entity.Property(e => e.Date)
                    .HasColumnType("datetime")
                    .HasColumnName("date");

                entity.Property(e => e.BorneArrivee)
                    .HasColumnType("int(11)")
                    .HasColumnName("borne_arrivee");

                entity.Property(e => e.BorneDepart)
                    .HasColumnType("int(11)")
                    .HasColumnName("borne_depart");

                entity.HasOne(d => d.BorneArriveeNavigation)
                    .WithMany(p => p.UtiliseBorneArriveeNavigations)
                    .HasForeignKey(d => d.BorneArrivee)
                    .HasConstraintName("fk_utilise_Borne2");

                entity.HasOne(d => d.BorneDepartNavigation)
                    .WithMany(p => p.UtiliseBorneDepartNavigations)
                    .HasForeignKey(d => d.BorneDepart)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_utilise_Borne1");

                entity.HasOne(d => d.ClientNavigation)
                    .WithMany(p => p.Utilises)
                    .HasForeignKey(d => d.Client)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_table1_Client1");

                entity.HasOne(d => d.VehiculeNavigation)
                    .WithMany(p => p.Utilises)
                    .HasForeignKey(d => d.Vehicule)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_table1_Vehicule1");
            });

            modelBuilder.Entity<Vehicule>(entity =>
            {
                entity.HasKey(e => e.IdVehicule)
                    .HasName("PRIMARY");

                entity.ToTable("vehicule");

                entity.HasIndex(e => e.Rfid, "RFID_UNIQUE")
                    .IsUnique();

                entity.HasIndex(e => e.TypeVehicule, "fk_Vehicule_Type_vehicule1_idx");

                entity.Property(e => e.IdVehicule)
                    .HasColumnType("int(11)")
                    .HasColumnName("idVehicule");

                entity.Property(e => e.Disponibilite)
                    .IsRequired()
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.EtatBatterie)
                    .HasColumnType("int(11)")
                    .HasColumnName("etatBatterie");

                entity.Property(e => e.Latitude)
                    .HasPrecision(9, 6)
                    .HasColumnName("latitude");

                entity.Property(e => e.Longitude)
                    .HasPrecision(9, 6)
                    .HasColumnName("longitude");

                entity.Property(e => e.Rfid)
                    .HasColumnType("int(11)")
                    .HasColumnName("RFID");

                entity.Property(e => e.TypeVehicule)
                    .HasColumnType("int(11)")
                    .HasColumnName("type_vehicule");

                entity.HasOne(d => d.TypeVehiculeNavigation)
                    .WithMany(p => p.Vehicules)
                    .HasForeignKey(d => d.TypeVehicule)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_Vehicule_Type_vehicule1");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
