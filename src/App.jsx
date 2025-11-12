import { Route, Routes } from "react-router";
import { Suspense, lazy } from "react";
import SpinnerLoading from "./common/components/Loaders/SpinnerLoader";
import Layout from "./common/components/layouts/Layout";
import HomePageLayout from "./common/components/layouts/HomePageLayout";
import TesterPage from "./pages/TesterPage";
import ClearCachePage from "./pages/clearCachePage";

const HomePage = lazy(() => import("./pages/home"));
const About = lazy(() => import("./pages/about"));
const AnimeDetail = lazy(() =>
  import("./common/components/AnimeDetail/AnimeDetail"),
);
const MoviePage = lazy(() => import("./pages/movies"));
const AnimePage = lazy(() => import("./pages/anime"));
const Character = lazy(() => import("./pages/character"));
const NotFoundPage = lazy(() => import("./pages/notFound"));

const App = () => {
  return (
    <Suspense fallback={<SpinnerLoading />}>
      <Routes>
        <Route
          path='/'
          element={
            <HomePageLayout>
              <HomePage />
            </HomePageLayout>
          }
        />

        {/* All other pages wrapped in Layout */}
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
        <Route
          path='/tester'
          element={
            <Layout>
              <TesterPage />
            </Layout>
          }
        />
        <Route
          path='/clear'
          element={
            <Layout>
              <ClearCachePage />
            </Layout>
          }
        />
        <Route
          path='*'
          element={
            <Layout>
              <NotFoundPage />
            </Layout>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default App;
