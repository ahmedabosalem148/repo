using Microsoft.AspNetCore.Mvc;
using BusinessLayer;
using DataAccessLayer;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BundlesController : ControllerBase
    {
        private readonly BundlesBL _bundlesBL;

        public BundlesController(BundlesBL bundlesBL)
        {
            _bundlesBL = bundlesBL;
        }

        [HttpGet]
        public IActionResult GetBundles()
        {
            var bundles = _bundlesBL.GetAllBundles();
            return Ok(bundles);
        }
        [HttpPost("add-item")]
        public IActionResult AddItem([FromBody] BundleItem item)
        {
            try
            {
                _bundlesBL.AddItem(item);
                return Ok(new { message = "Item added successfully and bundle updated." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred.", error = ex.Message });
            }
        }
        [HttpGet("{id}/items")]
        public IActionResult GetBundleItems(int id)
        {
            var items = _bundlesBL.GetItemsForBundle(id);
            return Ok(items);
        }

    }
}
