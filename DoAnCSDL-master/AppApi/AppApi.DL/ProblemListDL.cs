using AppApi.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppApi.DL
{
   public class ProblemListDL : DBConnect
    {

        public List<ProblemList> GetProblemListDL(ProblemList input)
        {
            _conn.Open();
            string sql = string.Format("select * from dbo.ProblemList a WHERE (@Id is null or @Id = 0 or a.Id = @Id) and (@VehicleType is null or @VehicleType = 3 or a.VehicleType = @VehicleType) and ISNULL(IsDelete, 0) = 0");

            SqlCommand sqlCommand = new SqlCommand(sql, _conn);
            sqlCommand.Parameters.AddWithValue("@Id", input.Id);
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

        public bool AddProblemListDL(ProblemList input)
        {
            _conn.Open();

            string SQL = string.Format("INSERT INTO dbo.ProblemList(VehicleType, ProblemName, CompensatoryCost, IsDelete) VALUES(@vehicleType, @problemName, @compensatoryCost, 0)");

            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            sqlCommand.Parameters.AddWithValue("@compensatoryCost", input.CompensatoryCost);
            sqlCommand.Parameters.AddWithValue("@vehicleType", input.VehicleType);
            sqlCommand.Parameters.AddWithValue("@problemName", input.ProblemName);
            //sqlCommand.Parameters.AddWithValue("@CreationTime", DateTime.Now);
            //sqlCommand.Parameters.AddWithValue("@CreatorUserId", input.EmpId);
            if (sqlCommand.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

        public bool UpdateProblemListDL(ProblemList input)
        {
            _conn.Open();

            string SQL = string.Format("UPDATE dbo.ProblemList SET CompensatoryCost = @compensatoryCost, ProblemName = @problemName, VehicleType = @vehicleType WHERE Id = @id");

            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            sqlCommand.Parameters.AddWithValue("@id", input.Id);
            sqlCommand.Parameters.AddWithValue("@compensatoryCost", input.CompensatoryCost);
            sqlCommand.Parameters.AddWithValue("@problemName", input.ProblemName);
            sqlCommand.Parameters.AddWithValue("@vehicleType", input.VehicleType);
            //sqlCommand.Parameters.AddWithValue("@LASTMODIFYTIME", DateTime.Now);
            //sqlCommand.Parameters.AddWithValue("@LASTMODIFYUSERID", input.EmpId);
            if (sqlCommand.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

        public bool DeleteProblemListDL(ProblemList input)
        {
            _conn.Open();

            string SQL = string.Format("UPDATE dbo.ProblemList SET IsDelete = 1 WHERE Id = @id");

            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            sqlCommand.Parameters.AddWithValue("@id", input.Id);
            //sqlCommand.Parameters.AddWithValue("@LASTMODIFYTIME", DateTime.Now);
            //sqlCommand.Parameters.AddWithValue("@LASTMODIFYUSERID", input.EmpId);
            if (sqlCommand.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }
    }
}
