using System;
using System.ComponentModel.DataAnnotations;

namespace AppApi.Entities
{
    public class ResolveRecord
    {
        public int Id { get; set; }
        public int CardId { get; set; }
        [StringLength(20)]
        public string RegisterNo { get; set; }
        public int InGateEmpId { get; set; }
        public int ResolveEmpId { get; set; }
        public DateTime InGateDate { get; set; }
        public DateTime ResolveTime { get; set; }
    }
}