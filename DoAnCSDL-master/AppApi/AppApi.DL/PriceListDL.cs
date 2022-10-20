using AppApi.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppApi.DL
{
   public class PriceListDL : DBConnect
    {
        public List<PriceList> GetPriceListDL(PriceList input)
        {
            _conn.Open();
            string sql = string.Format("select * from dbo.PriceList WHERE IsNull(IsDelete, 0) = 0");

            SqlCommand sqlCommand = new SqlCommand(sql, _conn);
            sqlCommand.Parameters.AddWithValue("@VehicleType", input.VehicleType);

            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

            var priceLists = new List<PriceList>();
            while (sqlDataReader.Read())
            {
                var price = new PriceList();
                price.Id = (int)sqlDataReader["Id"];
                price.TimeFrame1 = (int)sqlDataReader["TimeFrame1"];
                price.TimeFrame2 = (int)sqlDataReader["TimeFrame2"];
                price.TimeFrame3 = (int)sqlDataReader["TimeFrame3"];
                price.TimePrice1 = (int)sqlDataReader["TimePrice1"];
                price.TimePrice2 = (int)sqlDataReader["TimePrice2"];
                price.TimePrice3 = (int)sqlDataReader["TimePrice3"];
                price.VehicleType = (int)sqlDataReader["VehicleType"];
                priceLists.Add(price);
            }
            _conn.Close();
            return priceLists.ToList();
        }

        public bool AddPriceListDL(PriceList input)
        {
            _conn.Open();

            string SQL = string.Format("INSERT INTO dbo.PriceList(VehicleType, TimeFrame1, TimeFrame2, TimeFrame3, TimePrice1, TimePrice2, TimePrice3, IsDelete) VALUES(@vehicleType, @timeFrame1, @timeFrame2,  @timeFrame3, @timePrice1,  @timePrice2, @timePrice3, 0)");

            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            sqlCommand.Parameters.AddWithValue("@timeFrame1", input.TimeFrame1);
            sqlCommand.Parameters.AddWithValue("@timeFrame2", input.TimeFrame2);
            sqlCommand.Parameters.AddWithValue("@timeFrame3", input.TimeFrame3);
            sqlCommand.Parameters.AddWithValue("@timePrice1", input.TimePrice1);
            sqlCommand.Parameters.AddWithValue("@timePrice2", input.TimePrice2);
            sqlCommand.Parameters.AddWithValue("@timePrice3", input.TimePrice3);
            sqlCommand.Parameters.AddWithValue("@vehicleType", input.VehicleType);
            if (sqlCommand.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

        public bool UpdatePriceListDL(PriceList input)
        {
            _conn.Open();

            string SQL = string.Format("UPDATE dbo.PriceList SET VehicleType = @VehicleType, TimeFrame1 = @timeFrame1, TimeFrame2 = @timeFrame2, TimeFrame3 = @timeFrame3, TimePrice1 = @timePrice1, TimePrice2 = @timePrice2, TimePrice3 = @timePrice3 WHERE Id = @Id");

            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            sqlCommand.Parameters.AddWithValue("@id", input.Id);
            sqlCommand.Parameters.AddWithValue("@timeFrame1", input.TimeFrame1);
            sqlCommand.Parameters.AddWithValue("@timeFrame2", input.TimeFrame2);
            sqlCommand.Parameters.AddWithValue("@timeFrame3", input.TimeFrame3);
            sqlCommand.Parameters.AddWithValue("@timePrice1", input.TimePrice1);
            sqlCommand.Parameters.AddWithValue("@timePrice2", input.TimePrice2);
            sqlCommand.Parameters.AddWithValue("@timePrice3", input.TimePrice3);
            sqlCommand.Parameters.AddWithValue("@vehicleType", input.VehicleType);
            if (sqlCommand.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

        public bool DeletePriceListDL(PriceList input)
        {
            _conn.Open();

            string SQL = string.Format("UPDATE dbo.PriceList SET IsDelete = 1 WHERE Id = @id");

            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            //sqlCommand.Parameters.AddWithValue("@id", input.Id);
            if (sqlCommand.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }
    }
}
