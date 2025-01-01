import DefaultLayout from "./layouts/DefaultLayout";
import MovieList from "./pages/MovieList";
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
