using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PRS_server.Models;

namespace PRS_server.Data
{
    public class PRS_serverContext : DbContext
    {
        public PRS_serverContext (DbContextOptions<PRS_serverContext> options)
            : base(options)
        {
        }

        public DbSet<PRS_server.Models.User> Users { get; set; }

        public DbSet<PRS_server.Models.Vendor> Vendors { get; set; }

        public DbSet<PRS_server.Models.Product> Products { get; set; }

        public DbSet<PRS_server.Models.Request> Requests { get; set; }

        public DbSet<PRS_server.Models.RequestLine> RequestLines { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();
            builder.Entity<Vendor>()
                .HasIndex(v => v.Code)
                .IsUnique();
            builder.Entity<Product>()
                .HasIndex(p => p.PartNbr)
                .IsUnique();
        }
    }
}
