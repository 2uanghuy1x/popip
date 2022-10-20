using AppApi.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace AppApi.DL
{
   public class VehicleCardDL : DBConnect
    {
        public List<VehicleCard> GetVehicleCardDL(VehicleCard input)
        {
            _conn.Open();
            string sql = string.Format("select * from dbo.VehicleCard a WHERE (@Id is null or @Id = 0 or a.Id = @Id) and (@VehicleType is null or @VehicleType = 3 or a.VehicleType = @VehicleType) and IsNull(IsDelete, 0) = 0");

            SqlCommand sqlCommand = new SqlCommand(sql, _conn);
            sqlCommand.Parameters.AddWithValue("@Id", input.Id);
            sqlCommand.Parameters.AddWithValue("@VehicleType", input.VehicleType);

            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

            var vehicleCards = new List<VehicleCard>();
            while (sqlDataReader.Read())
            {
                var vehicleCard = new VehicleCard();
                vehicleCard.Id = (int)sqlDataReader["Id"];
                vehicleCard.Exist = (bool)sqlDataReader["Exist"];
                vehicleCard.Status = (bool)sqlDataReader["Status"];
                vehicleCard.VehicleType = (int)sqlDataReader["VehicleType"];
                vehicleCard.VehicleTypeName = sqlDataReader["VhcTypeName"].ToString();
                vehicleCards.Add(vehicleCard);
            }
            _conn.Close();
            return vehicleCards.ToList();
        }

        public int AddVehicleCardDL(VehicleCard input)
        {
            _conn.Open();

            string SQL = @"dbo.[sp_CreateVehicleCard]";

            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            sqlCommand.Parameters.AddWithValue("@Id", input.Id);
            sqlCommand.Parameters.AddWithValue("@vehicleType", input.VehicleType);
            sqlCommand.Parameters.AddWithValue("@vhcTypeName", input.VehicleTypeName);

            sqlCommand.CommandType = CommandType.StoredProcedure;
            var res = sqlCommand.ExecuteScalar().ToString();
            _conn.Close();
            return Int16.Parse(res);
        }

        public bool UpdateVehicleCardDL(VehicleCard input)
        {
            _conn.Open();

            string SQL = string.Format("UPDATE dbo.VehicleCard SET Exist = @exist, Status = @status, VehicleType = @vehicleType, VhcTypeName = @vhcTypeName WHERE Id = @id");

            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            sqlCommand.Parameters.AddWithValue("@id", input.Id);
            sqlCommand.Parameters.AddWithValue("@exist", input.Exist);
            sqlCommand.Parameters.AddWithValue("@status", input.Status);
            sqlCommand.Parameters.AddWithValue("@vehicleType", input.VehicleType);
            sqlCommand.Parameters.AddWithValue("@vhcTypeName", input.VehicleTypeName);
            if (sqlCommand.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

        public bool DeleteVehicleCardDL(VehicleCard input)
        {
            _conn.Open();

            string SQL = string.Format("UPDATE dbo.VehicleCard SET IsDelete = 1 WHERE Id = @id");

            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            //sqlCommand.Parameters.AddWithValue("@LASTMODIFYTIME", DateTime.Now);
            //sqlCommand.Parameters.AddWithValue("@LASTMODIFYUSERID", input.EmpId);
            sqlCommand.Parameters.AddWithValue("@id", input.Id);
            if (sqlCommand.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }



    }
}
