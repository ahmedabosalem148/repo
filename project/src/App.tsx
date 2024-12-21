import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "./components/layout/Navbar";
import { Hero } from "./components/home/Hero";
import { BundleCard } from "./components/home/BundleCard";
import { CartSidebar } from "./components/cart/CartSidebar";
import { BundleDetails } from "./components/bundle/BundleDetails";
import { LoginModal } from "./components/auth/LoginModal";
import type { Bundle } from "./types";

interface BundleResponse {
  bundleId: string;
  name: string;
  type: string;
  price: number;
  description: string;
  savings: number;
  popularity: number;
}

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedBundle, setSelectedBundle] = useState<Bundle | null>(null);
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch bundles from API
  useEffect(() => {
    const fetchBundles = async () => {
      try {
        const response = await axios.get("https://localhost:7237/api/Bundles");

        // Map raw API response to expected format
        const mappedBundles = response.data.map((bundle: BundleResponse) => ({
          id: bundle.bundleId, // Mapping bundleId to id
          name: bundle.name,
          type: bundle.type,
          price: bundle.price,
          description: bundle.description,
          savings: bundle.savings,
          popularity: bundle.popularity,
          items: [], // Default empty items if not included in the API
        }));

        setBundles(mappedBundles); // Update state with mapped data
      } catch (err) {
        console.error("Error fetching bundles:", err); // Log error for debugging
        setError("Failed to fetch bundles. Please try again later.");
      }
    };

    fetchBundles();
  }, []);

  const handleViewDetails = (bundleId: string) => {
    const bundle = bundles.find((b) => b.id === bundleId);
    if (bundle) {
      setSelectedBundle(bundle);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <Hero />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Featured Bundles
        </h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bundles.map((bundle) => (
            <BundleCard
              key={bundle.id}
              bundle={bundle}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      </section>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {selectedBundle && (
        <BundleDetails
          bundle={selectedBundle}
          onClose={() => setSelectedBundle(null)}
        />
      )}

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
}

export default App;
