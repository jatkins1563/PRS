using System;
using System.ComponentModel.DataAnnotations;

namespace PRS_server.Models
{
    public class Vendor
    {
        public int Id { get; set; }
        [Required, StringLength(30)]
        public String Code { get; set; }
        public String Name { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
    }
}
