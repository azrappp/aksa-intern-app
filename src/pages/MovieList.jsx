import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import Modal from "../components/Modal";
import Button from "../components/Button";
import Input from "../components/Input";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // Menambah state untuk mode edit
  const [currentMovie, setCurrentMovie] = useState(null); // State untuk data yang sedang diedit
  const [newMovie, setNewMovie] = useState({
    title: "",
    category: "film",
    watched: false,
  });
  const deleteMovie = (movieToDelete) => {
    const updatedMovies = movies.filter((movie) => movie !== movieToDelete);
    setMovies(updatedMovies);
    localStorage.setItem("movies", JSON.stringify(updatedMovies));
  };
  const columnsDef = [
    {
      header: "Judul Film",
      accessorKey: "title",
    },
    {
      header: "Kategori",
      accessorKey: "category",
    },
    {
      header: "Status Ditonton",
      accessorKey: "watched",
      cell: (info) => (info.getValue() ? "Sudah Ditonton" : "Belum Ditonton"),
    },
    {
      header: "Aksi",
      cell: ({ row }) => (
        <div>
          <Button onClick={() => handleEdit(row.original)}>Edit</Button>
          <Button onClick={() => deleteMovie(row.original)}>Hapus</Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem("movies")) || [];
    setMovies(storedMovies);
  }, []);

  const addMovie = () => {
    const updatedMovies = [...movies, newMovie];
    setMovies(updatedMovies);
    localStorage.setItem("movies", JSON.stringify(updatedMovies));
    setIsModalOpen(false);
    setNewMovie({ title: "", category: "film", watched: false });
  };

  const updateMovie = () => {
    const updatedMovies = movies.map((movie) =>
      movie === currentMovie ? { ...newMovie } : movie,
    );
    setMovies(updatedMovies);
    localStorage.setItem("movies", JSON.stringify(updatedMovies));
    setIsModalOpen(false);
    setCurrentMovie(null);
    setNewMovie({ title: "", category: "film", watched: false });
  };

  const handleEdit = (movie) => {
    setCurrentMovie(movie);
    setNewMovie(movie);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  useEffect(() => {
    setHasMoreData(movies.length > (pageIndex + 1) * pageSize);
  }, [movies, pageIndex, pageSize]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Daftar Filmku</h1>

      <Button
        onClick={() => {
          setIsEditMode(false);
          setIsModalOpen(true);
        }}
      >
        Tambah Film
      </Button>

      <Table
        data={movies.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)}
        columnsDef={columnsDef}
        pageIndex={pageIndex}
        pageSize={pageSize}
        hasMoreData={hasMoreData}
        setPageIndex={setPageIndex}
        setPageSize={setPageSize}
      />

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditMode ? "Edit Film" : "Tambah Film"}
        description={
          isEditMode
            ? "Edit detail film yang dipilih."
            : "Isi detail film baru."
        }
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            isEditMode ? updateMovie() : addMovie();
          }}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Judul Film
            </label>

            <Input
              type="text"
              value={newMovie.title}
              onChange={(e) =>
                setNewMovie({ ...newMovie, title: e.target.value })
              }
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
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Status Ditonton
            </label>
            <label className="inline-flex items-center mt-2">
              <Input
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
      </Modal>
    </div>
  );
};

export default MovieList;
