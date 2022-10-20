using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppApi.Entities
{
    public class AddInDateInputDto
    {
        public string RegisterNo { get; set; }
        public string Location { get; set; }
        public int? CardId { get; set; }
        public int? EmpId { get; set; }
    }
}
