import HomePage from "./pages/home";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router";
import About from "./pages/about";
import AnimeDetail from "./components/AnimeDetail";
import MoviePage from "./pages/movies";
import AnimePage from "./pages/anime";
import Character from "./pages/character";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/anime' element={<AnimePage />} />
        <Route path='/movies' element={<MoviePage />} />
        <Route path='/about' element={<About />} />
        <Route path='/anime/:id' element={<AnimeDetail />} />
        <Route path='/movies/:id' element={<AnimeDetail />} />
        <Route path='/characters/:id' element={<Character />} />
      </Routes>
    </Layout>
  );
};

export default App;
