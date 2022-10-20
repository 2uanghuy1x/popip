namespace AppApi.Entities
{
    public class CreateOrEditResolveProblemDetailDto
    {
        public string ProblemName { get; set; }
        public int Id { get; set; }
        public string ResolveContent { get; set; }
        public int CompensatoryCost { get; set; }
        public bool IsDelete { get; set; }
        public int ProblemId { get; set; }
    }
}
