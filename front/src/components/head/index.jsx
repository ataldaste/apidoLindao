import React from "react";
import './styles.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Head() {
    const navigate = useNavigate();

    const logout = () => {
      localStorage.removeItem("token"); // Remove o token
      navigate("/login"); // Redireciona para a tela de login
    };
    return (
        <main className="main">
            <div className="container_head">
                <div className="title">
                    <h2>API DO LINDÃO</h2>
                </div>
                <div className="nav">
                    <Link to="/disciplinas">Disciplinas</Link>
                    <Link to="/home">Professores</Link>
                    <Link to="/turmas">Turmas</Link>
                    <Link to="/ambientes">Ambientes</Link>
                    <Link to="/cursos">Cursos</Link>
                    <Link to="/login">Login/Sign Up</Link>
                    <button onClick={logout} className="logout-button">Logout</button>
                </div>
            </div>
        </main>
    );
}
