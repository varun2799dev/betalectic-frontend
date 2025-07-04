import { useState } from "react";
import { searchNpmPackages } from "../utils/npmApi";
import type { FavoritePackage, NpmPackage } from "../types/index";
import { getFavorites, saveFavorites } from "../utils/storage";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<NpmPackage[]>([]);
  const [reason, setReason] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    const packages = await searchNpmPackages(query);
    setResults(packages);
  };

  const handleAddFavorite = () => {
    if (!selected || !reason) return;
    const favorites = getFavorites();
    if (favorites.find(f => f.name === selected)) {
      setError("Package already in favorites.");
      return;
    }
    const newFavorites = [...favorites, { name: selected, reason }];
    saveFavorites(newFavorites);
    setSelected(null);
    setReason("");
    setError("");
    alert("Added to favorites!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Search NPM Packages</h1>

      {/* Search Bar */}
      <div className="flex gap-3 mb-6">
        <input
          className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Search packages..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Results */}
      <ul className="space-y-2">
        {results.map((pkg) => (
          <li
            key={pkg.name}
            className={`p-4 border rounded shadow-sm cursor-pointer transition ${
              selected === pkg.name ? "bg-blue-100 border-blue-500" : "hover:bg-gray-50"
            }`}
            onClick={() => setSelected(pkg.name)}
          >
            <h2 className="font-bold text-lg text-gray-800">{pkg.name}</h2>
            <p className="text-sm text-gray-600">{pkg.description}</p>
          </li>
        ))}
      </ul>

      {/* Add to Favorites */}
      {selected && (
        <div className="mt-8 bg-gray-50 p-6 rounded border shadow-sm">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">Add to Favorites</h2>
          <p className="mb-2">Package: <strong>{selected}</strong></p>

          <textarea
            className="border border-gray-300 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Why is this your favorite?"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
          />

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <button
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition"
            onClick={handleAddFavorite}
          >
            Add to Favorites
          </button>
        </div>
      )}
    </div>
  );
}
