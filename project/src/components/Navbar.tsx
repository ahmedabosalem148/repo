import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingCart, User, Package } from "lucide-react";
import { RootState } from "../store";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { bundle } = useSelector((state: RootState) => state.cart);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Package className="h-6 w-6 text-indigo-600" />
            <span className="font-bold text-xl text-gray-900">BundleBox</span>
          </Link>

          <div className="flex items-center space-x-8">
            <Link to="/bundles" className="text-gray-700 hover:text-indigo-600">
              Bundles
            </Link>
            <Link
              to="/track-order"
              className="text-gray-700 hover:text-indigo-600"
            >
              Track Order
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-indigo-600"
            >
              <ShoppingCart className="h-6 w-6" />
              {bundle && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  1
                </span>
              )}
            </Link>
            <Link
              to={isAuthenticated ? "/profile" : "/login"}
              className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600"
            >
              <User className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
