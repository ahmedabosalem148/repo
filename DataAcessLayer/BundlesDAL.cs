using System.Collections.Generic;
using System.Data.SqlClient;

namespace DataAccessLayer
{
    public class BundlesDAL
    {
        public void AddItemToBundle(BundleItem item)
        {
            using (var connection = DatabaseHelper.GetConnection())
            {
                connection.Open();

                int bundleId;
                if (item.Price < 5000)
                {
                    bundleId = GetBundleIdByName("Entertainment Package", connection);
                }
                else if (item.Price >= 5000 && item.Price < 10000)
                {
                    bundleId = GetBundleIdByName("Standard Bundle", connection);
                }
                else
                {
                    bundleId = GetBundleIdByName("Premium Bundle", connection);
                }

                string insertQuery = @"
                INSERT INTO BundleItems (Name, Description, Category, Price, Image, BundleId)
                VALUES (@Name, @Description, @Category, @Price, @Image, @BundleId)";

                using (var command = new SqlCommand(insertQuery, connection))
                {
                    command.Parameters.AddWithValue("@Name", item.Name);
                    command.Parameters.AddWithValue("@Description", item.Description);
                    command.Parameters.AddWithValue("@Category", item.Category);
                    command.Parameters.AddWithValue("@Price", item.Price);
                    command.Parameters.AddWithValue("@Image", item.Image);
                    command.Parameters.AddWithValue("@BundleId", bundleId);
                    command.ExecuteNonQuery();
                }

                UpdateBundleTotalPrice(bundleId, connection);
            }
        }

        private int GetBundleIdByName(string bundleName, SqlConnection connection)
        {
            string query = "SELECT BundleId FROM Bundles WHERE Name = @Name";
            using (var command = new SqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@Name", bundleName);
                return (int)command.ExecuteScalar();
            }
        }

        private void UpdateBundleTotalPrice(int bundleId, SqlConnection connection)
        {
            string updateQuery = @"
            UPDATE Bundles
            SET TotalPrice = (SELECT SUM(Price) FROM BundleItems WHERE BundleId = @BundleId)
            WHERE BundleId = @BundleId";

            using (var command = new SqlCommand(updateQuery, connection))
            {
                command.Parameters.AddWithValue("@BundleId", bundleId);
                command.ExecuteNonQuery();
            }
        }

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

        public List<BundleItem> GetBundleItems(int bundleId)
        {
            var items = new List<BundleItem>();

            using (var connection = DatabaseHelper.GetConnection())
            {
                connection.Open();
                string query = "SELECT BundleItemId, Name, Description, Category, Price, Image FROM BundleItems WHERE BundleId = @BundleId";

                using (var command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@BundleId", bundleId);

                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            items.Add(new BundleItem
                            {
                                Id = reader.GetInt32(0),              // INT
                                Name = reader.GetString(1),           // NVARCHAR
                                Description = reader.GetString(2),    // NVARCHAR
                                Category = reader.GetString(3),       // NVARCHAR
                                Price = reader.GetDouble(4),         // DECIMAL
                                Image = reader.GetString(5)           // NVARCHAR
                            });
                        }
                    }
                }
            }

            return items;
        }



    }

    public class BundleItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public double Price { get; set; }
        public string Image { get; set; }
        public int BundleId { get; set; }
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
