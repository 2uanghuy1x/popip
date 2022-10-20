using AppApi.Entities;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace AppApi.DL
{
    public class EmployeeDL : DBConnect
    {
        public List<Employee> GetEmployees(EmployeeInputDto input)
        {
            _conn.Open();

            string spName = @"dbo.[sp_GetEmployees]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@EmpId", input.EmpId);
            cmd.Parameters.AddWithValue("@EmpName", input.EmpName);

            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader sqlDataReader = cmd.ExecuteReader();

            var employees = new List<Employee>();
            if (sqlDataReader.HasRows)
            {
                while (sqlDataReader.Read())
                {
                    var employee = new Employee();
                    employee.Id = (int)sqlDataReader["Id"];
                    employee.Username = sqlDataReader["Username"].ToString();
                    employee.Password = sqlDataReader["Password"].ToString();
                    employee.EmpName = sqlDataReader["EmpName"].ToString();
                    employee.Birthday = (DateTime)sqlDataReader["Birthday"];
                    employee.EmpType = (int)sqlDataReader["EmpType"];
                    employees.Add(employee);
                }
            }
            _conn.Close();
            return employees.ToList();
        }

        public bool RegisterDL(Employee input)
        {
            _conn.Open();
            string check = string.Format("select * from Employee where Username = @Username and isDelete = 0");
            SqlCommand sqlCmd = new SqlCommand(check, _conn);
            sqlCmd.Parameters.AddWithValue("@Username", input.Username);
            SqlDataReader sqlDataReader = sqlCmd.ExecuteReader();
            if (sqlDataReader.HasRows)
            {
                _conn.Close();
                return false;
            }
            _conn.Close();
            _conn.Open();

            input.CreationTime = DateTime.Now;
            string SQL = string.Format("INSERT INTO dbo.Employee(Username, Password, EmpName, Birthday, EmpType, CreationTime, CreatorUserId, IsDelete)"
                        + " VALUES(@Username, @Password, @EmpName, @Birthday, @EmpType, @CreationTime, @CreatorUserId, 0)");
            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            sqlCommand.Parameters.AddWithValue("@Username", input.Username);
            sqlCommand.Parameters.AddWithValue("@Password", input.Password);
            sqlCommand.Parameters.AddWithValue("@EmpName", input.EmpName);
            sqlCommand.Parameters.AddWithValue("@Birthday", input.Birthday.AddDays(1));
            sqlCommand.Parameters.AddWithValue("@EmpType", input.EmpType);
            sqlCommand.Parameters.AddWithValue("@CreationTime", input.CreationTime);
            if (input.EmpId != 0) sqlCommand.Parameters.AddWithValue("@CreatorUserId", input.EmpId);
            else sqlCommand.Parameters.AddWithValue("@CreatorUserId", -1);

            if (sqlCommand.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

        public bool UpdateDL(Employee input)
        {
            _conn.Open();

            string SQL = string.Format("UPDATE dbo.Employee SET EmpName = @EmpName, Username = @Username, EmpType = @EmpType, Password = @Password,  LASTMODIFYTIME = @LASTMODIFYTIME, LASTMODIFYUSERID = @LASTMODIFYUSERID WHERE Id = @Id");

            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            sqlCommand.Parameters.AddWithValue("@Username", input.Username);
            sqlCommand.Parameters.AddWithValue("@Password", input.Password);
            sqlCommand.Parameters.AddWithValue("@EmpName", input.EmpName);
            sqlCommand.Parameters.AddWithValue("@EmpType", input.EmpType);
            sqlCommand.Parameters.AddWithValue("@Birthday", input.Birthday);
            sqlCommand.Parameters.AddWithValue("@LASTMODIFYTIME", DateTime.Now);
            sqlCommand.Parameters.AddWithValue("@LASTMODIFYUSERID", input.EmpId);
            sqlCommand.Parameters.AddWithValue("@Id", input.Id);

            if (sqlCommand.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

        public bool DeleteDL(Employee input)
        {
            _conn.Open();

            string SQL = string.Format("UPDATE dbo.Employee SET IsDelete = 1, LASTMODIFYTIME = @LASTMODIFYTIME, LASTMODIFYUSERID = @LASTMODIFYUSERID WHERE Id = @id");

            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            sqlCommand.Parameters.AddWithValue("@id", input.Id);
            sqlCommand.Parameters.AddWithValue("@LASTMODIFYTIME", DateTime.Now);
            sqlCommand.Parameters.AddWithValue("@LASTMODIFYUSERID", input.EmpId);
            if (sqlCommand.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

        public string GetToken()
        {
            string key = "my_secret_key_12345"; //Secret key which will be used later during validation    
            var issuer = "http://mysite.com";  //normally this will be your site URL    

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            //Create a List of Claims, Keep claims name short    
            var permClaims = new List<Claim>();
            permClaims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));

            //Create Security Token object by giving required parameters    
            var token = new JwtSecurityToken(issuer, //Issure    
                            issuer,  //Audience    
                            permClaims,
                            expires: DateTime.Now.AddDays(1),
                            signingCredentials: credentials);
            var jwt_token = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt_token;
        }

        public Employee LoginDL(Employee dep)
        {
            _conn.Open();

            string SQL = string.Format("select * from Employee where Username = @Username and Password = @Password and isDelete = 0");
            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            sqlCommand.Parameters.AddWithValue("@Username", dep.Username);
            sqlCommand.Parameters.AddWithValue("@Password", dep.Password);
            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

            var employees = new List<Employee>();
            if (sqlDataReader.HasRows)
            {
                while (sqlDataReader.Read())
                {
                    var employee = new Employee();
                    employee.Id = (int)sqlDataReader["Id"];
                    employee.Username = sqlDataReader["UserName"].ToString();
                    employee.Password = sqlDataReader["Password"].ToString();
                    employee.EmpName = sqlDataReader["EmpName"].ToString();
                    //employee.Birthday = (DateTime)sqlDataReader["Birthday"];
                    employee.Token = GetToken();
                    employee.EmpType = (int)sqlDataReader["EmpType"];
                    employees.Add(employee);
                }

                return employees.ToList()[0];
            }
            _conn.Close();
            return null;
        }
    }
}
