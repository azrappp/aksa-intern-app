import DefaultLayout from "./layouts/DefaultLayout";
import MovieList from "./pages/MovieList";
import About from "./pages/About";
const HomePage = () => {
  return (
    <>
      <DefaultLayout>
        <MovieList></MovieList>
      </DefaultLayout>
    </>
  );
};

export default HomePage;
