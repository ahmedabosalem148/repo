using Microsoft.AspNetCore.Mvc;
using BusinessLayer;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UsersBL _usersBL;

        public UsersController(UsersBL usersBL)
        {
            _usersBL = usersBL;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            bool isValidUser = _usersBL.Login(request.Username, request.Password);
            if (isValidUser)
            {
                return Ok(new { Message = "Login successful" });
            }
            return Unauthorized(new { Message = "Invalid username or password" });
        }
    }

    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
