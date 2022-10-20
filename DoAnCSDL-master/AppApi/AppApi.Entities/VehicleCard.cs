namespace AppApi.Entities
{
    public class VehicleCard
    {
        public int Id { get; set; }
        public bool Status { get; set; }
        public bool Exist { get; set; }
        public int VehicleType { get; set; }
        public string VehicleTypeName { get; set; }
        public int EmpId { get; set; }
    }
}