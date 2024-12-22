import React, { useState } from "react";
import axios from "axios";

export const AddItemPage: React.FC = () => {
  const [item, setItem] = useState({
    name: "",
    description: "",
    category: "",
    price: 0,
    image: "",
  });
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:7237/api/bundles/add-item",
        item
      );
      setMessage("Item added successfully!");
      setItem({ name: "", description: "", category: "", price: 0, image: "" }); // Reset form
    } catch (error) {
      console.error("Failed to add item:", error);
      setMessage("Failed to add item. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Add New Item</h1>
      {message && (
        <p
          className={`mb-4 text-sm font-medium ${
            message.includes("successfully") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            value={item.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            value={item.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <input
            type="text"
            name="category"
            value={item.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            name="price"
            value={item.price}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={item.image}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItemPage;
