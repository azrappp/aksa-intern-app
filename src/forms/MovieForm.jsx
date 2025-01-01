import React from "react";
import Input from "../components/Input";
import Button from "../components/Button";

const MovieForm = ({ newMovie, setNewMovie, onSubmit, isEditMode }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="mb-4">
        <Input
          label="Judul Film"
          type="text"
          value={newMovie.title}
          onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
          required
          className="mt-2 p-2 w-full border rounded-lg bg-gray-100 text-gray-900 placeholder-gray-400 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Masukkan judul film"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Kategori
        </label>
        <select
          value={newMovie.category}
          onChange={(e) =>
            setNewMovie({ ...newMovie, category: e.target.value })
          }
          className="mt-2 p-2 w-full border rounded-lg bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="film">Film</option>
          <option value="serial tv">Serial TV</option>
          <option value="anime">Anime</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="inline-flex items-center mt-2">
          <Input
            label="Status Ditonton"
            type="checkbox"
            checked={newMovie.watched}
            onChange={() =>
              setNewMovie({ ...newMovie, watched: !newMovie.watched })
            }
          />
          <span className="text-slate-700">Sudah Ditonton</span>
        </label>
      </div>

      <Button type="submit">
        {isEditMode ? "Simpan Perubahan" : "Tambah Film"}
      </Button>
    </form>
  );
};

export default MovieForm;
