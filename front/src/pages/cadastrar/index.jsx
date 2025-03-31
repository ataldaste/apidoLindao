import React, { useState } from "react";
import "./styles.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";

export default function SignUp() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const registrar = async () => {
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        username: user,
        password: password,
      });

      if (response.status === 201) {
        alert("Cadastro realizado com sucesso!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert("Erro ao cadastrar usuário. Verifique os dados e tente novamente.");
    }
  };

  return (
    <div className="container_login">
      <FaUserPlus className="icon" />

      <input
        className="caixa"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="User"
      />

      <input
        className="caixa"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />

      <input
        className="caixa"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        type="password" 
      />

      <button className="btn" onClick={registrar}>
        Sign Up
      </button>
      <p className="link-text"> Ja possuo conta <Link to="/login">Entrar</Link></p>

    </div>
  );
}
