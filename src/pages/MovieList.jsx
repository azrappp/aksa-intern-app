import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import Modal from "../components/Modal";
import Button from "../components/Button";
import MovieForm from "../forms/MovieForm";

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

  const deleteMovie = (movieToDelete) => {
    const updatedMovies = movies.filter((movie) => movie !== movieToDelete);
    setMovies(updatedMovies);
    localStorage.setItem("movies", JSON.stringify(updatedMovies));
  };

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
  const handleLogout = () => {
    localStorage.removeItem("auth");
    alert("Logout berhasil!");
    window.location.href = "/login";
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Daftar Filmku</h1>
      <div className="flex justify-between">
        <Button
          onClick={() => {
            setIsEditMode(false);
            setIsModalOpen(true);
          }}
        >
          Tambah Film
        </Button>

        <Button onClick={handleLogout}>Logout</Button>
      </div>

      <Table
        data={movies.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)}
        columnsDef={[
          { header: "Judul Film", accessorKey: "title" },
          {
            header: "Kategori",
            accessorKey: "category",
            className: "hidden sm:table-cell", // Kolom ini disembunyikan di layar kecil
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
