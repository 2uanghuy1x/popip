namespace AppApi.Entities
{
    public class PriceList
    {
        public int Id { get; set; }
        public int VehicleType { get; set; }
        public int TimeFrame1 { get; set; }
        public int TimeFrame2 { get; set; }
        public int TimeFrame3 { get; set; }
        public int TimePrice1 { get; set; }
        public int TimePrice2 { get; set; }
        public int TimePrice3 { get; set; }
        public int EmpId { get; set; }
    }
}