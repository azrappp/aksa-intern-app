import { useState, useEffect } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme; // Gunakan preferensi pengguna jika ada
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"; // Gunakan preferensi OS jika tidak ada preferensi pengguna
  });

  useEffect(() => {
    const htmlElement = document.documentElement;

    // Tambahkan atau hapus kelas `dark` pada elemen HTML
    htmlElement.classList.toggle("dark", theme === "dark");

    // Simpan preferensi tema di localStorage
    localStorage.setItem("theme", theme);

    // Deteksi perubahan preferensi OS
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (!localStorage.getItem("theme")) {
        setTheme(mediaQuery.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return { theme, toggleTheme };
};

export default useTheme;
