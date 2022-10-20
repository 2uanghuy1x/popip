using System.ComponentModel.DataAnnotations;

namespace AppApi.Entities
{
    public class ProblemList
    {
        public int Id { get; set; }
        [StringLength(200)]
        public string ProblemName { get; set; }
        public int VehicleType { get; set; }
        public int CompensatoryCost { get; set; }
        public int EmpId { get; set; }
    }
}