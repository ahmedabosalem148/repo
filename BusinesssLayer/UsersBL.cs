using System;
using DataAccessLayer;

namespace BusinessLayer
{
    public class UsersBL
    {
        private readonly UsersDAL _usersDAL;

        public UsersBL()
        {
            _usersDAL = new UsersDAL();
        }

        public bool Login(string username, string password)
        {
            // Here, you would hash the password before sending it to DAL
            string passwordHash = HashPassword(password);

            return _usersDAL.ValidateUser(username, passwordHash);
        }

        private string HashPassword(string password)
        {
            // Simple example; replace with a secure hashing method (e.g., SHA256 or BCrypt)
            using (var sha256 = System.Security.Cryptography.SHA256.Create())
            {
                var bytes = System.Text.Encoding.UTF8.GetBytes(password);
                var hash = sha256.ComputeHash(bytes);
                return Convert.ToBase64String(hash);
            }
        }
    }
}
