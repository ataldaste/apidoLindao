import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from "./pages/login";
import Home from "./pages/home";
import Env from "./pages/environments";
import Ambientes from "./pages/ambientes";
import Disciplinas from "./pages/disciplinas";
import Turmas from "./pages/turmas";
import Cursos from "./pages/cursos";
import SignUp from "./pages/cadastrar";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/environments" element={<Env />}/>
        <Route path="/disciplinas" element={<Disciplinas/>} />
        <Route path= "/ambientes" element={<Ambientes/>} />
        <Route path="/turmas" element={<Turmas/>} />
        <Route path="/cursos" element={<Cursos/>} />
        <Route path="/cadastrar" element={<SignUp/>} />
      </Routes>
    </Router>
  )
}

export default App