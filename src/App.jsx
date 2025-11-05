import HomePage from "./pages/home";
import Layout from "./components/Layout";
import HomePageLayout from "./components/HomePageLayout";
import { Route, Routes } from "react-router";
import About from "./pages/about";
import AnimeDetail from "./components/AnimeDetail";
import MoviePage from "./pages/movies";
import AnimePage from "./pages/anime";
import Character from "./pages/character";

const App = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <HomePageLayout>
            <HomePage />
          </HomePageLayout>
        }
      />
      <Route
        path='/anime'
        element={
          <Layout>
            <AnimePage />
          </Layout>
        }
      />
      <Route
        path='/movies'
        element={
          <Layout>
            <MoviePage />
          </Layout>
        }
      />
      <Route
        path='/about'
        element={
          <Layout>
            <About />
          </Layout>
        }
      />
      <Route
        path='/anime/:id'
        element={
          <Layout>
            <AnimeDetail />
          </Layout>
        }
      />
      <Route
        path='/movies/:id'
        element={
          <Layout>
            <AnimeDetail />
          </Layout>
        }
      />
      <Route
        path='/characters/:id'
        element={
          <Layout>
            <Character />
          </Layout>
        }
      />
    </Routes>
  );
};

export default App;
