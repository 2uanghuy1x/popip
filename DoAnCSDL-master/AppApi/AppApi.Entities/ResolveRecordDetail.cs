namespace AppApi.Entities
{
    public class ResolveRecordDetail
    {
        public int Id { get; set; }
        public int ProblemId { get; set; }
        public int RecordId { get; set; }
        public int ResolveCost { get; set; }
        public string ResolveContent { get; set; }
    }
}