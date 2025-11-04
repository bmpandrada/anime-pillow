import HomePage from "./pages/home";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router";
import About from "./pages/about";
import AnimeDetail from "./components/AnimeDetail";
import MoviePage from "./pages/movies";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/movies' element={<MoviePage />} />
        <Route path='/about' element={<About />} />
        <Route path='/anime/:id' element={<AnimeDetail />} />
        <Route path='/movies/:id' element={<AnimeDetail />} />
      </Routes>
    </Layout>
  );
};

export default App;
