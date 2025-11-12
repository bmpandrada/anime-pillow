import { Route, Routes } from "react-router";
import { Suspense, lazy } from "react";
import SpinnerLoading from "./common/components/Loaders/SpinnerLoader";
import Layout from "./common/components/layouts/Layout";
import HomePageLayout from "./common/components/layouts/HomePageLayout";
import TesterPage from "./pages/TesterPage";
import ClearCachePage from "./pages/clearCachePage";
import NotFoundPage from "./pages/NotFound";

const HomePage = lazy(() => import("./pages/home"));
const About = lazy(() => import("./pages/about"));
const AnimeDetail = lazy(() =>
  import("./common/components/AnimeDetail/AnimeDetail"),
);
const MoviePage = lazy(() => import("./pages/movies"));
const AnimePage = lazy(() => import("./pages/anime"));
const Character = lazy(() => import("./pages/character"));

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
        <Route element={<Layout />}>
          <Route path='anime' element={<AnimePage />} />
          <Route path='anime/:id' element={<AnimeDetail />} />
          <Route path='movies' element={<MoviePage />} />
          <Route path='movies/:id' element={<AnimeDetail />} />
          <Route path='characters/:id' element={<Character />} />
          <Route path='about' element={<About />} />
          <Route path='tester' element={<TesterPage />} />
          <Route path='clear' element={<ClearCachePage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;
