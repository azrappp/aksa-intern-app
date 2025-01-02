import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditMovie = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const storedMovies = JSON.parse(localStorage.getItem("movies")) || [];
  const movie = storedMovies.find(
    (_, index) => index === parseInt(movieId, 10),
  );
  const [updatedMovie, setUpdatedMovie] = useState(movie);

  const handleSave = () => {
    const newMovies = storedMovies.map((m, index) =>
      index === parseInt(movieId, 10) ? updatedMovie : m,
    );
    localStorage.setItem("movies", JSON.stringify(newMovies));
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Film</h1>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium">Judul Film</label>
          <input
            type="text"
            value={updatedMovie.title}
            onChange={(e) =>
              setUpdatedMovie({ ...updatedMovie, title: e.target.value })
            }
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Kategori</label>
          <input
            type="text"
            value={updatedMovie.category}
            onChange={(e) =>
              setUpdatedMovie({ ...updatedMovie, category: e.target.value })
            }
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Deskripsi</label>
          <textarea
            value={updatedMovie.description}
            onChange={(e) =>
              setUpdatedMovie({ ...updatedMovie, description: e.target.value })
            }
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Tanggal Rilis</label>
          <input
            type="date"
            value={updatedMovie.releaseDate}
            onChange={(e) =>
              setUpdatedMovie({ ...updatedMovie, releaseDate: e.target.value })
            }
            className="w-full p-2 border rounded-md"
          />
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
};

export default EditMovie;
