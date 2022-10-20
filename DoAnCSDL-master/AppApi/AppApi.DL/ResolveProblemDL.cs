using AppApi.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace AppApi.DL
{
    public class ResolveProblemDL : DBConnect
    {
        public List<GetAllResolveProblemDto> GetResolveRecords(GetResolveProblemInputDto input)
        {
            _conn.Open();
            string spName = @"dbo.[sp_GetResolveProblemList]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@RegisterNo", input.RegisterNo);
            cmd.Parameters.AddWithValue("@ToDate", input.ToDate);
            cmd.Parameters.AddWithValue("@FromDate", input.FromDate);
            cmd.Parameters.AddWithValue("@EmpName", input.EmpName);
            cmd.Parameters.AddWithValue("@VhcType", input.VhcType);

            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader sqlDataReader = cmd.ExecuteReader();

            List<GetAllResolveProblemDto> resolveProblems = new List<GetAllResolveProblemDto>();
            if (sqlDataReader.HasRows)
            {
                while (sqlDataReader.Read())
                {
                    GetAllResolveProblemDto resolveProblem = new GetAllResolveProblemDto();
                    resolveProblem.Id = (int)sqlDataReader["Id"];
                    resolveProblem.RegisterNo = sqlDataReader["RegisterNo"].ToString();
                    resolveProblem.CardId = (int)sqlDataReader["CardId"];
                    resolveProblem.InGateDate = (DateTime)sqlDataReader["InGateDate"];
                    resolveProblem.InGateEmpId = (int)sqlDataReader["InGateEmpId"];
                    resolveProblem.InGateEmpName = sqlDataReader["InGateEmpName"].ToString();
                    resolveProblem.VehicleType = (int)sqlDataReader["VehicleType"];
                    resolveProblem.ResolveEmpId = (int)sqlDataReader["ResolveEmpId"];
                    resolveProblem.ResolveEmpName = sqlDataReader["ResolveEmpName"].ToString();
                    resolveProblem.ResolveTime = (DateTime)sqlDataReader["ResolveTime"];

                    resolveProblems.Add(resolveProblem);
                }
            }

            _conn.Close();
            return resolveProblems.ToList();
        }

        public List<GetResolveProblemDetailDto> getResolveProblemDetails(int recordId)
        {
            _conn.Open();
            string spName = @"dbo.[sp_GetResolveProblemDetails]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@RecordId", recordId);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader sqlDataReader = cmd.ExecuteReader();
            List<GetResolveProblemDetailDto> resolveProblems = new List<GetResolveProblemDetailDto>();
            if (sqlDataReader.HasRows)
            {
                while (sqlDataReader.Read())
                {
                    GetResolveProblemDetailDto problemDetail = new GetResolveProblemDetailDto();
                    problemDetail.Id = (int)sqlDataReader["Id"];
                    problemDetail.RecordId = (int)sqlDataReader["RecordId"];
                    problemDetail.ResolveCost = (int)sqlDataReader["ResolveCost"];
                    problemDetail.ResolveContent = sqlDataReader["ResolveContent"].ToString();
                    problemDetail.VehicleType = (int)sqlDataReader["VehicleType"];
                    problemDetail.CompensatoryCost = (int)sqlDataReader["CompensatoryCost"];
                    problemDetail.ProblemName = sqlDataReader["ProblemName"].ToString();
                    problemDetail.ProblemId = (int)sqlDataReader["ProblemId"];

                    resolveProblems.Add(problemDetail);
                }
            }

            _conn.Close();
            return resolveProblems.ToList();
        }

        public List<ProblemList> GetProblemListForResolve(ProblemInputDto input)
        {
            _conn.Open();
            string sql = string.Format("select * from dbo.ProblemList a WHERE (@VehicleType is null or @VehicleType = 3 or a.VehicleType = @VehicleType) and IsDelete = 0");

            SqlCommand sqlCommand = new SqlCommand(sql, _conn);
            //sqlCommand.Parameters.AddWithValue("@ProblemName", input.ProblemName);
            sqlCommand.Parameters.AddWithValue("@VehicleType", input.VehicleType);

            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

            var problemLists = new List<ProblemList>();
            while (sqlDataReader.Read())
            {
                var problem = new ProblemList();
                problem.Id = (int)sqlDataReader["Id"];
                problem.CompensatoryCost = (int)sqlDataReader["CompensatoryCost"];
                problem.ProblemName = sqlDataReader["ProblemName"].ToString();
                problem.VehicleType = (int)sqlDataReader["VehicleType"];
                problemLists.Add(problem);
            }
            _conn.Close();
            return problemLists.ToList();
        }

        public List<VehicleCard> GetUsedVehicleCard()
        {
            _conn.Open();
            string sql = string.Format("SELECT * FROM VEHICLECARD WHERE STATUS = 1 AND EXIST = 1 AND ISDELETE = 0");
            SqlCommand cmd = new SqlCommand(sql, _conn);

            SqlDataReader sqlDataReader = cmd.ExecuteReader();

            var vhcCards = new List<VehicleCard>();
            while (sqlDataReader.Read())
            {
                var vhcCard = new VehicleCard();
                vhcCard.Id = (int)sqlDataReader["Id"];
                vhcCard.VehicleType = (int)sqlDataReader["VehicleType"];
                vhcCards.Add(vhcCard);
            }
            _conn.Close();
            return vhcCards.ToList();
        }

        public GetRegisterNoForProblemDto GetRegisterNoForProblem(int cardId)
        {
            _conn.Open();
            string spName = @"dbo.[sp_GetRegisterNoForProblem]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@CardId", cardId);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader sqlDataReader = cmd.ExecuteReader();
            GetRegisterNoForProblemDto registerNoForProblem = new GetRegisterNoForProblemDto();
            if (sqlDataReader.HasRows)
            {
                sqlDataReader.Read();
                registerNoForProblem.RegisterNo = sqlDataReader["RegisterNo"].ToString();
                registerNoForProblem.Location = sqlDataReader["Location"].ToString();
                registerNoForProblem.InGateEmpId = (int)sqlDataReader["InGateEmpId"];
                registerNoForProblem.InGateEmpName = sqlDataReader["EmpName"].ToString();
                registerNoForProblem.InGateDate = (DateTime)sqlDataReader["InGateDate"];

            }
            return registerNoForProblem;
        }

        public int CreateResolveProblem(CreateOrEditResolveProblemInputDto input)
        {
            _conn.Open();
            string spName = @"dbo.[sp_CreateResolveProblem]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@CardId", input.CardId);
            cmd.Parameters.AddWithValue("@RegisterNo", input.RegisterNo);
            cmd.Parameters.AddWithValue("@InGateEmpId", input.InGateEmpId);
            cmd.Parameters.AddWithValue("@InGateDate", input.InGateDate);
            cmd.Parameters.AddWithValue("@ResolveEmpId", input.ResolveEmpId);
            cmd.Parameters.AddWithValue("@ResolveTime", input.ResolveTime);
            //cmd.Parameters.AddWithValue("@CREATORUSERID", input.ResolveEmpId);

            cmd.CommandType = CommandType.StoredProcedure;
            var id = cmd.ExecuteScalar().ToString();

            if (input.ResolveProblemDetail.Count > 0)
            {
                foreach (var problemDetail in input.ResolveProblemDetail)
                {
                    string spDetail = @"dbo.[sp_CreateResolveProblemDetail]";
                    SqlCommand detailCmd = new SqlCommand(spDetail, _conn);

                    detailCmd.Parameters.AddWithValue("@RecordId", Int16.Parse(id));
                    detailCmd.Parameters.AddWithValue("@VehicleType", input.VehicleType);
                    detailCmd.Parameters.AddWithValue("@ProblemId", problemDetail.ProblemId);
                    detailCmd.Parameters.AddWithValue("@ProblemName", problemDetail.ProblemName);
                    detailCmd.Parameters.AddWithValue("@ResolveContent", problemDetail.ResolveContent);
                    detailCmd.Parameters.AddWithValue("@ResolveCost", problemDetail.CompensatoryCost);
                    detailCmd.Parameters.AddWithValue("@CardId", input.CardId);
                    //detailCmd.Parameters.AddWithValue("@CREATORUSERID", input.ResolveEmpId);
                    detailCmd.CommandType = CommandType.StoredProcedure;
                    detailCmd.ExecuteScalar().ToString();
                }
            }
            _conn.Close();
            return Int16.Parse(id);
        }

        public int RemoveResolveProblem(GetResolveProblemDetailInputDto input)
        {
            _conn.Open();
            string sql = @"dbo.[sp_RemoveResolveProblem]";
            SqlCommand sqlCommand = new SqlCommand(sql, _conn);
            sqlCommand.Parameters.AddWithValue("@RecordId", input.RecordId);
            //sqlCommand.Parameters.AddWithValue("@LASTMODIFYUSERID", input.EmpId);
            sqlCommand.CommandType = CommandType.StoredProcedure;
            var res = sqlCommand.ExecuteScalar().ToString();
            _conn.Close();
            return Int16.Parse(res);
        }

        public bool RemoveResolveProblemDetail(GetResolveProblemDetailInputDto input)
        {
            _conn.Open();
            string SQL = string.Format("Update ResolveRecordDetail SET IsDelete = 1 WHERE Id = @RecordId");
            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            sqlCommand.Parameters.AddWithValue("@RecordId", input.RecordId);
            //sqlCommand.Parameters.AddWithValue("@LASTMODIFYTIME", DateTime.Now);
            //sqlCommand.Parameters.AddWithValue("@LASTMODIFYUSERID", input.EmpId);
            if (sqlCommand.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

        public bool UpdateResolveProblem(CreateOrEditResolveProblemInputDto input)
        {
            _conn.Open();

            if ((input.Id != null || input.Id != 0) && input.ResolveProblemDetail.Count > 0)
            {
                foreach (var problemDetail in input.ResolveProblemDetail)
                {
                    string spDetail = @"dbo.[sp_UpdateResolveProblem]";
                    SqlCommand detailCmd = new SqlCommand(spDetail, _conn);

                    detailCmd.Parameters.AddWithValue("@RecordId", input.Id);
                    detailCmd.Parameters.AddWithValue("@RecordDetailId", problemDetail.Id);
                    detailCmd.Parameters.AddWithValue("@VehicleType", input.VehicleType);
                    detailCmd.Parameters.AddWithValue("@ProblemId", problemDetail.ProblemId);
                    detailCmd.Parameters.AddWithValue("@ProblemName", problemDetail.ProblemName);
                    detailCmd.Parameters.AddWithValue("@ResolveContent", problemDetail.ResolveContent);
                    detailCmd.Parameters.AddWithValue("@ResolveCost", problemDetail.CompensatoryCost);
                    detailCmd.Parameters.AddWithValue("@CardId", input.CardId);
                    //detailCmd.Parameters.AddWithValue("@LASTMODIFYUSERID", input.ResolveEmpId);
                    detailCmd.CommandType = CommandType.StoredProcedure;
                    var res = detailCmd.ExecuteScalar().ToString();

                    if (Int16.Parse(res) == -1) return false;
                }
            }
            _conn.Close();
            return true;
        }
    }
}
