using AppApi.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace AppApi.DL
{
   public class MonthlyTicketDL : DBConnect
    {
        public List<MonthlyTicket> GetMonthlyTicketsDL(MonthlyTicket input)
        {
            _conn.Open();
            string sql = string.Format("select * from dbo.MonthlyTicket a WHERE (@TicketType is null or @TicketType = 5 or a.TicketType = @TicketType) and (@VehicleType is null or @VehicleType = 3 or a.VehicleType = @VehicleType) and a.RegisterNo like '%' + @RegisterNo + '%' and IsNull(a.IsDelete, 0) = 0");

            SqlCommand sqlCommand = new SqlCommand(sql, _conn);
            sqlCommand.Parameters.AddWithValue("@VehicleType", input.VehicleType);
            sqlCommand.Parameters.AddWithValue("@RegisterNo", string.IsNullOrWhiteSpace(input.RegisterNo) ? "" : input.RegisterNo);
            sqlCommand.Parameters.AddWithValue("@TicketType", input.TicketType);

            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

            var monthlyTickets = new List<MonthlyTicket>();
            while (sqlDataReader.Read())
            {
                var monthlyTicket = new MonthlyTicket();
                monthlyTicket.Id = (int)sqlDataReader["Id"];
                monthlyTicket.VehicleType = (byte)sqlDataReader["VehicleType"];
                monthlyTicket.RegisterNo = sqlDataReader["RegisterNo"].ToString();
                monthlyTicket.TicketType = (byte)sqlDataReader["TicketType"];
                monthlyTickets.Add(monthlyTicket);
            }
            _conn.Close();
            return monthlyTickets.ToList();
        }

        public bool AddMonthlyTicketDL(MonthlyTicket input)
        {
            _conn.Open();

            string SQL = string.Format("INSERT INTO dbo.MonthlyTicket VALUES (@VehicleType, @RegisterNo, @TicketType, 0)");

            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            sqlCommand.Parameters.AddWithValue("@RegisterNo", input.RegisterNo);
            sqlCommand.Parameters.AddWithValue("@VehicleType", input.VehicleType);
            sqlCommand.Parameters.AddWithValue("@TicketType", input.TicketType);

            if (sqlCommand.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

        public bool UpdateMonthlyTicketDL(MonthlyTicket input)
        {
            _conn.Open();

            string SQL = string.Format("UPDATE dbo.MonthlyTicket SET VehicleType = @VehicleType, TicketType = @TicketType, RegisterNo = @RegisterNo WHERE Id = @id");

            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            sqlCommand.Parameters.AddWithValue("@id", input.Id);
            sqlCommand.Parameters.AddWithValue("@VehicleType", input.VehicleType);
            sqlCommand.Parameters.AddWithValue("@TicketType", input.TicketType);
            sqlCommand.Parameters.AddWithValue("@RegisterNo", input.RegisterNo);
            if (sqlCommand.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

        public bool DeleteMonthlyTicketDL(MonthlyTicket input)
        {
            _conn.Open();

            string SQL = string.Format("UPDATE dbo.MonthlyTicket SET IsDelete = 1 WHERE Id = @Id");

            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            sqlCommand.Parameters.AddWithValue("@Id", input.Id);
            if (sqlCommand.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }



    }
}
