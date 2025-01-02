import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

const MovieDetail = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const movies = JSON.parse(localStorage.getItem("movies")) || [];
  const movie = movies.find((movie) => movie.id === movieId);

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
        <div className="text-center text-gray-800 dark:text-gray-200">
          <h1 className="text-2xl font-bold">Film tidak ditemukan</h1>
          <Button onClick={() => navigate("/")}>Kembali ke Daftar Film</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex flex-col gap-y-2">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
          {movie.title}
        </h1>
        <Input label="Judul" value={movie.title} />
        <Input label="Kategori" value={movie.category} />
        <Input
          label="Status Ditonton"
          value={movie.watched ? "Sudah Ditonton" : "Belum Ditonton"}
        />
        <Button onClick={() => navigate("/")}>Kembali</Button>
      </div>
    </div>
  );
};

export default MovieDetail;
