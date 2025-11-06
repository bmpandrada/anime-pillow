import HomePage from "./pages/home";
import Layout from "./common/components/layouts/Layout";
import HomePageLayout from "./common/components/layouts/HomePageLayout";
import { Route, Routes } from "react-router";
import About from "./pages/about";
import AnimeDetail from "./common/components/AnimeDetail/AnimeDetail";
import MoviePage from "./pages/movies";
import AnimePage from "./pages/anime";
import Character from "./pages/character";
import NotFoundPage from "./pages/notFound";

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
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
