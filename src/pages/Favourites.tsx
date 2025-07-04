import { useEffect, useState } from "react";
import type { FavoritePackage } from "../types/index";
import { getFavorites, saveFavorites } from "../utils/storage";

export default function Favorites() {
  const [favorites, setFavorites] = useState<FavoritePackage[]>([]);
  const [modal, setModal] = useState<string | null>(null);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleRemove = (name: string) => {
    const newFavorites = favorites.filter(fav => fav.name !== name);
    saveFavorites(newFavorites);
    setFavorites(newFavorites);
    setModal(null);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">My Favorite Packages</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-600 text-center">No favorites yet.</p>
      ) : (
        <ul className="space-y-4">
          {favorites.map((fav) => (
            <li key={fav.name} className="border rounded p-4 shadow-sm bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{fav.name}</h2>
                  <p className="text-gray-700 text-sm mt-1">{fav.reason}</p>
                </div>
                <button
                  className="text-red-600 font-medium hover:underline"
                  onClick={() => setModal(fav.name)}
                >
                  Remove
                </button>
              </div>

              {modal === fav.name && (
                <div className="mt-4 bg-white border rounded p-4 shadow-sm">
                  <p className="text-gray-800 mb-3">
                    Are you sure you want to remove <strong>{fav.name}</strong> from your favorites?
                  </p>
                  <div className="flex gap-3">
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                      onClick={() => handleRemove(fav.name)}
                    >
                      Yes, remove
                    </button>
                    <button
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                      onClick={() => setModal(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
