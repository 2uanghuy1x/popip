using System;
using System.ComponentModel.DataAnnotations;

namespace AppApi.Entities
{
    public class Employee
    {
        public int Id { get; set; }
        [StringLength(50)]
        public string EmpName { get; set; }
        [StringLength(50)]
        public string Username { get; set; }
        public DateTime Birthday { get; set; }
        [StringLength(10)]
        public string Password { get; set; }
        public int EmpType { get; set; }
        public string Token { get; set; }
        public DateTime CreationTime { get; set; }
        public int CreatorUserId { get; set; }
        public int EmpId { get; set; }
    }
}