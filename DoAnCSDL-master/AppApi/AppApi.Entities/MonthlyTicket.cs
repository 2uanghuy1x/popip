using System.ComponentModel.DataAnnotations;

namespace AppApi.Entities
{
    public class MonthlyTicket
    {
        public int Id { get; set; }
        [StringLength(20)]
        public string RegisterNo { get; set; }
        public byte VehicleType { get; set; }
        public byte TicketType { get; set; }
        public byte IsDelete { get; set; }
    }
}
