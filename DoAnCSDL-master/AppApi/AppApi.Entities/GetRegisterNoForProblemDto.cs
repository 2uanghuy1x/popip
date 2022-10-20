using System;

namespace AppApi.Entities
{
    public class GetRegisterNoForProblemDto
    {
        public string RegisterNo { get; set; }
        public string Location { get; set; }
        public int InGateEmpId { get; set; }
        public string InGateEmpName { get; set; }
        public DateTime InGateDate { get; set; }
    }
}
