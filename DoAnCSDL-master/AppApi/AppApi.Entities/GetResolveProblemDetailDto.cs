namespace AppApi.Entities
{
    public class GetResolveProblemDetailDto
    {
        public int Id { get; set; }
        public int RecordId { get; set; }
        public int ResolveCost { get; set; }
        public string ResolveContent { get; set; }
        public int ProblemId { get; set; }
        public string ProblemName { get; set; }
        public int VehicleType { get; set; }
        public int CompensatoryCost { get; set; }
    }
}
