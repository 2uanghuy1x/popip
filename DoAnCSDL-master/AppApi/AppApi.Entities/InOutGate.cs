using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace AppApi.Entities
{
    public class InOutGate
    {
        public int Id { get; set; }
        public int CardId { get; set; }
        [StringLength(20)]
        public string RegisterNo { get; set; }
        public int InGateEmpId { get; set; }
        public string InGateEmp { get; set; }
        public string OutGateEmp { get; set; }
        public int OutGateEmpId { get; set; }
        public int VehicleType { get; set; }
        public DateTime? InGateDate { get; set; }
        public DateTime? OutGateDate { get; set; }
        public int SellPrice { get; set; }
        [StringLength(20)]
        public string Location { get; set; }
    }
}