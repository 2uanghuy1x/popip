using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AppApi.Entities
{
    public class CreateOrEditResolveProblemInputDto
    {
        public int Id { get; set; }
        public int CardId { get; set; }
        [StringLength(20)]
        public string RegisterNo { get; set; }
        public int InGateEmpId { get; set; }
        public int ResolveEmpId { get; set; }
        public DateTime InGateDate { get; set; }
        public DateTime ResolveTime { get; set; }
        public int VehicleType { get; set; }
        public List<CreateOrEditResolveProblemDetailDto> ResolveProblemDetail { get; set; }
    }
}
