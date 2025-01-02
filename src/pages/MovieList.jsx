import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import Modal from "../components/Modal";
import Button from "../components/Button";
import MovieForm from "../forms/MovieForm";

import { useNavigate } from "react-router-dom";
const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [newMovie, setNewMovie] = useState({
    title: "",
    category: "film",
    watched: false,
  });
  const [filter, setFilter] = useState("all"); // State untuk filter
  const deleteMovie = (movieToDelete) => {
    const updatedMovies = movies.filter((movie) => movie !== movieToDelete);
    setMovies(updatedMovies);
    localStorage.setItem("movies", JSON.stringify(updatedMovies));
  };

  const navigate = useNavigate();
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
    const storedMovies = JSON.parse(localStorage.getItem("movies")) || [];
    setMovies(storedMovies);
  }, []);

  useEffect(() => {
    setHasMoreData(movies.length > (pageIndex + 1) * pageSize);
  }, [movies, pageIndex, pageSize]);

  // Filter movies based on the selected filter
  const filteredMovies = movies.filter((movie) => {
    if (filter === "watched") return movie.watched;
    if (filter === "notWatched") return !movie.watched;
    return true; // For 'all'
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Daftar Filmku</h1>

      <div className="flex justify-between mb-4">
        <div className="flex gap-4">
          <Button
            onClick={() => {
              setIsEditMode(false);
              setIsModalOpen(true);
            }}
          >
            Tambah Film
          </Button>
        </div>

        {/* Filter Dropdown */}
        <div className="relative inline-block text-left">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          >
            <option value="all">Semua</option>
            <option value="watched">Sudah Ditonton</option>
            <option value="notWatched">Belum Ditonton</option>
          </select>
        </div>
      </div>

      <Table
        data={filteredMovies.slice(
          pageIndex * pageSize,
          (pageIndex + 1) * pageSize,
        )}
        columnsDef={[
          { header: "Judul Film", accessorKey: "title" },
          {
            header: "Kategori",
            accessorKey: "category",
            className: "hidden sm:table-cell",
          },
          {
            header: "Status Ditonton",
            accessorKey: "watched",
            cell: (info) =>
              info.getValue() ? "Sudah Ditonton" : "Belum Ditonton",
          },
          {
            header: "Aksi",
            cell: ({ row }) => (
              <div>
                <Button onClick={() => navigate(`/movies/${row.index}`)}>
                  Detail
                </Button>
                <Button onClick={() => handleEdit(row.original)}>Edit</Button>
                <Button onClick={() => deleteMovie(row.original)}>Hapus</Button>
              </div>
            ),
          },
        ]}
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
        <MovieForm
          newMovie={newMovie}
          setNewMovie={setNewMovie}
          onSubmit={isEditMode ? updateMovie : addMovie}
          isEditMode={isEditMode}
        />
      </Modal>
    </div>
  );
};

export default MovieList;
