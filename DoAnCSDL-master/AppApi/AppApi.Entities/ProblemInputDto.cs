using System.ComponentModel.DataAnnotations;

namespace AppApi.Entities
{
    public class ProblemInputDto
    {
        [StringLength(100)]
        public string ProblemName { get; set; }
        public int? VehicleType { get; set; }
    }
}
