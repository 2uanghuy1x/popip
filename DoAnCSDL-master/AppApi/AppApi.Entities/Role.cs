using System.ComponentModel.DataAnnotations;

namespace AppApi.Entities
{
    public class Role
    {
        public int Id { get; set; }
        [StringLength(20)]
        public string RoleName { get; set; }
    }
}