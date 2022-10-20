using System;

namespace AppApi.Entities
{
    public class GetResolveProblemInputDto
    {
        public string RegisterNo { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public int VhcType { get; set; }
        public string EmpName { get; set; }
    }
}
