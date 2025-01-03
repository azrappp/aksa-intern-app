import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import MovieDetail from "./pages/MovieDetail";
import EditUsername from "./pages/EditUsername";
import About from "./pages/About";
import useTheme from "./hooks/useTheme";

function App() {
  const theme = useTheme(); // Gunakan hook

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/movies/:id"
          element={
            <ProtectedRoute>
              <MovieDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-username"
          element={
            <ProtectedRoute>
              <EditUsername />
            </ProtectedRoute>
          }
        />

        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
