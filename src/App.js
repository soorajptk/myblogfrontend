import {
  BrowserRouter,
  Routes,
  Route,
  } from "react-router-dom";

import Home from './pages/home/Home';
import Write from './pages/Write';
import Login from './pages/login/Login';
import Navbar from './components/navbar/Navbar';
import Register from './pages/register/Register'
import About from "./pages/about/About";
import ViewBlog from './components/viewSingleBlog/ViewBlog'
import { useGlobalContext } from "./context/context";
function App() {
  const {state}=useGlobalContext()
  return (
    <>
  <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path={'/'} element={state.user !=='null' ? <Home/> : <Login/>} />
      <Route path={'/write'} element={state.user !=='null' ? <Write/> : <Login/> } />
      <Route path={'/login'} element={state.user !=='null' ? <Home/> : <Login/>} />
      <Route path={'/Register'} element={state.user !=='null' ? <Home/> :<Register/>} />
      <Route path={'/about'} element={<About/>} />
      <Route path={'/post/:postId'} element={<ViewBlog/>} />
    </Routes>
  </BrowserRouter>

    </>
  );
}

export default App;
