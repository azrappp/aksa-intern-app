import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";
const About = () => {
  return (
    <DefaultLayout className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <div className="text-center px-4 sm:px-8 py-12">
        <h1 className="text-6xl font-semibold text-gray-900 dark:text-white mb-6">
          Selamat Datang di Website Kami
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
          Website ini dirancang untuk membantu Anda mencatat film-film yang
          sudah Anda tonton, serta menyimpan daftar film yang ingin Anda tonton
          di esok hari.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Jelajahi berbagai fitur kami untuk membuat pengalaman menonton Anda
          lebih terorganisir dan menyenangkan.
        </p>
      </div>
    </DefaultLayout>
  );
};

export default About;
