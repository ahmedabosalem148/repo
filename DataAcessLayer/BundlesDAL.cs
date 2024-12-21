using System.Collections.Generic;
using System.Data.SqlClient;

namespace DataAccessLayer
{
    public class BundlesDAL
    {
        public List<Bundle> GetBundles()
        {
            var bundles = new List<Bundle>();

            using (var connection = DatabaseHelper.GetConnection())
            {
                connection.Open();
                string query = "SELECT * FROM Bundles";

                using (var command = new SqlCommand(query, connection))
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        bundles.Add(new Bundle
                        {
                            BundleId = reader.GetInt32(0),
                            Name = reader.GetString(1),
                            Type = reader.GetString(2),
                            Price = reader.GetDouble(3),
                            Description = reader.GetString(4),
                            Savings = reader.GetDouble(5),
                            Popularity = reader.GetInt32(6)
                        });
                    }
                }
            }

            return bundles;
        }
    }

    public class Bundle
    {
        public int BundleId { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public double Savings { get; set; }
        public int Popularity { get; set; }
    }
}
