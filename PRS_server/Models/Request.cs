using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PRS_server.Models
{
    public class Request
    {
        public readonly string New = "NEW";
        public readonly string Review = "REVIEW";
        public readonly string Approved = "APPROVED";
        public readonly string Rejected = "REJECTED";

        public int Id { get; set; }
        [Required, StringLength(80)]
        public string Description { get; set; }
        [Required, StringLength(80)]
        public string Justification { get; set; }
        [StringLength(80)]
        public string RejectionReason { get; set; }
        [StringLength(20)]
        public string DeliveryMode { get; set; } = "Pickup";

        [StringLength(10)]
        public string Status { get; set; } = "NEW";
        [Required, Column(TypeName = "decimal(11, 2)")]
        public decimal Total { get; set; } = 0;

        //foreign key
        public int UserId { get; set; }
        public  virtual User User { get; set; }
        //end fk

        //collection of requestlines
        public virtual List<RequestLine> RequestLines { get; set; }
    }
}
