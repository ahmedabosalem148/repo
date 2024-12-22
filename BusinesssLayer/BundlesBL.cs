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
        public List<BundleItem> GetItemsForBundle(int bundleId)
        {
            return _bundlesDAL.GetBundleItems(bundleId);
        }

        public List<Bundle> GetAllBundles()
        {
            // Retrieve data from DAL and apply business rules or transformations
            return _bundlesDAL.GetBundles();
        }
        public void AddItem(BundleItem item)
        {
            _bundlesDAL.AddItemToBundle(item);
        }

    }
}
