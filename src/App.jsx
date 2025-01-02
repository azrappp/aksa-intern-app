import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import MovieDetail from "./pages/MovieDetail";
import EditUsername from "./pages/EditUsername";

function App() {
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
      </Routes>
    </Router>
  );
}

export default App;
