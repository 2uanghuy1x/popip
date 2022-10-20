using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppApi.Entities
{
    public class GetInOutGateInputDto
    {
        public string RegisterNo { get; set; }
        public int? CardId { get; set; }
        public DateTime? ToDate { get; set; }
        public DateTime? FromDate { get; set; }
        public int? VhcType { get; set; }
        public int? Status { get; set; }
    }
}
