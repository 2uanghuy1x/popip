using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppApi.DL
{
    public class DBConnect
    {
        protected SqlConnection _conn = new SqlConnection(@"Data Source=localhost; 
                           Initial Catalog=CARPARK_MGMT; Integrated Security=True");
    }
}
