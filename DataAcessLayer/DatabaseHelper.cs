using System.Configuration;
using System.Data.SqlClient;

namespace DataAccessLayer
{
    public static class DatabaseHelper
    {
        public static string GetConnectionString()
        {
            return "Server=localhost;Database=ReactAppDB;Trusted_Connection=True;";
        }

        public static SqlConnection GetConnection()
        {
            return new SqlConnection(GetConnectionString());
        }
    }
}
