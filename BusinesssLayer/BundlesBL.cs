using System.Collections.Generic;
using DataAccessLayer;

namespace BusinessLayer
{
    public class BundlesBL
    {
        private readonly BundlesDAL _bundlesDAL;

        public BundlesBL()
        {
            _bundlesDAL = new BundlesDAL();
        }

        public List<Bundle> GetAllBundles()
        {
            // Retrieve data from DAL and apply business rules or transformations
            return _bundlesDAL.GetBundles();
        }
    }
}
