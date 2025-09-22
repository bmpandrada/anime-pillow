import HomePage from "./pages/home";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router";
import About from "./pages/about";
import AnimeDetail from "./components/AnimeDetail";

const App = () => {



  return ( 
     <Layout>
        <Routes>
            <Route path="/" element={<HomePage />} />
             <Route path="/about" element={<About />} />
             <Route path="/anime/:id" element={<AnimeDetail />} />
        </Routes>
     </Layout>
   );
}
 
export default App;