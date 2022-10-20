using AppApi.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppApi.DL
{
    public class InOutGateDL : DBConnect
    {
        public List<InOutGate> GetInOutGates(GetInOutGateInputDto input)
        {
            _conn.Open();

            string spName = @"dbo.[sp_GetInOutGate]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@Status", input.Status);
            cmd.Parameters.AddWithValue("@ToDate", input.ToDate);
            cmd.Parameters.AddWithValue("@FromDate", input.FromDate);
            cmd.Parameters.AddWithValue("@CardId", input.CardId);
            cmd.Parameters.AddWithValue("@VhcType", input.VhcType);
            cmd.Parameters.AddWithValue("@RegisterNo", input.RegisterNo);

            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader sqlDataReader = cmd.ExecuteReader();

            var inOutGates = new List<InOutGate>();
            if (sqlDataReader.HasRows)
            {
                while (sqlDataReader.Read())
                {
                    var inOutGate = new InOutGate();
                    inOutGate.Id = (int)sqlDataReader["Id"];
                    inOutGate.RegisterNo = sqlDataReader["RegisterNo"].ToString();
                    inOutGate.CardId = (int)sqlDataReader["CardId"];
                    inOutGate.InGateDate = (DateTime)sqlDataReader["InGateDate"];
                    inOutGate.OutGateDate = null;
                    inOutGate.InGateEmp = sqlDataReader["InGateEmp"].ToString();
                    inOutGate.OutGateEmp = sqlDataReader["OutGateEmp"].ToString();
                    inOutGate.InGateEmpId = (int)sqlDataReader["InGateEmpId"];
                    inOutGate.OutGateEmpId = (int)sqlDataReader["OutGateEmpId"];
                    inOutGate.Location = sqlDataReader["Location"].ToString();
                    inOutGate.SellPrice = (int)sqlDataReader["SellPrice"];
                    inOutGate.VehicleType = (int)sqlDataReader["VehicleType"];
                    var x = sqlDataReader["OutGateDate"].ToString();
                    if(x != "")
                    {
                        inOutGate.OutGateDate = Convert.ToDateTime(x);
                    }
                    inOutGates.Add(inOutGate);
                }
            }

            _conn.Close();
            return inOutGates.ToList();
        }

        public List<VehicleCard> GetCardEmpty()
        {
            _conn.Open();
            string sql = string.Format("select * from VEHICLECARD WHERE STATUS = 0 AND EXIST = 1 AND ISDELETE = 0");
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

        public int GetCardIdFromRegisterNo(string register)
        {
            _conn.Open();

            string SQL = string.Format("select i.CardId from InOutGate i where i.RegisterNo = @RegisterNo");
            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            sqlCommand.Parameters.AddWithValue("@RegisterNo", register);
            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
            int cardId = -1;
            if (sqlDataReader.HasRows)
            {
                while (sqlDataReader.Read())
                {
                    cardId = (int)sqlDataReader["CardId"];
                }
            }
            _conn.Close();
            return cardId;
        }

        public int AddInGate(AddInDateInputDto input)
        {
            _conn.Open();

            string spName = @"dbo.[sp_UpdateInGate]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@RegisterNo", input.RegisterNo);
            cmd.Parameters.AddWithValue("@InGateEmpId", input.EmpId);
            cmd.Parameters.AddWithValue("@CardId", input.CardId);
            cmd.Parameters.AddWithValue("@Location", input.Location);
            //cmd.Parameters.AddWithValue("@CREATORUDERID", input.EmpId);

            cmd.CommandType = CommandType.StoredProcedure;
            //SqlDataReader sqlDataReader = cmd.ExecuteReader();
            var res = cmd.ExecuteScalar().ToString();
            _conn.Close();
            return Int16.Parse(res);
        }

        public int OutGate(OutGateInputDto input)
        {
            _conn.Open();

            string spName = @"dbo.[sp_UpdateOutGate]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@RegisterNo", input.RegisterNo);
            cmd.Parameters.AddWithValue("@CardId", input.CardId);
            cmd.Parameters.AddWithValue("@OutGateEmpId", input.OutGateEmpId);
            //cmd.Parameters.AddWithValue("@LASTMODIFYUSERID", input.OutGateEmpId);

            cmd.CommandType = CommandType.StoredProcedure;
            var res = cmd.ExecuteScalar().ToString();
            _conn.Close();
            return Int16.Parse(res);
        }

        public int UpdateInOutGate(UpdateInOutGateInputDto input)
        {
            _conn.Open();

            string spName = @"dbo.[sp_UpdateInOutGate]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@RegisterNo", input.RegisterNo);
            cmd.Parameters.AddWithValue("@Id", input.Id);
            //cmd.Parameters.AddWithValue("@LASTMODIFYUSERID", input.EmpId);

            cmd.CommandType = CommandType.StoredProcedure;
            var res = cmd.ExecuteScalar().ToString();
            _conn.Close();
            return Int16.Parse(res);
        }
        public bool CheckHaveMonthlyTicket(GetInOutGateInputDto input)
        {
            _conn.Open();

            string spName = @"dbo.[sp_CheckHaveMonthlyTicket]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@VehicleType", input.VhcType);
            cmd.Parameters.AddWithValue("@RegisterNo", input.RegisterNo);

            cmd.CommandType = CommandType.StoredProcedure;

            var res = cmd.ExecuteScalar().ToString();
            _conn.Close();

            return Int16.Parse(res) == -1;
        }
    }
}
