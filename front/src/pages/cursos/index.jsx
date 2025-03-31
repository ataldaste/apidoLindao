import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalCurso from "../../components/modalCurso/index.jsx";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import "./cursos.css";
import Head from "../../components/head/index.jsx";
import Footer from "../../components/footer/index.jsx";

export default function Cursos() {
    const [dados, setDados] = useState([]);
    const [dadosFiltrados, setDadosFiltrados] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [cursoSelecionado, setCursoSelecionado] = useState(null);
    const [texto, setTexto] = useState("");
    const [reload, setReload] = useState(false);

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            console.error("Token não encontrado ou inválido!");
            return;
        }

        const fetchData = async () => {
            try {
                console.log("Buscando cursos...");
                const response = await axios.get("http://127.0.0.1:8000/api/cursos", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log("Dados recebidos:", response.data);
                setDados(response.data);
                setDadosFiltrados(response.data);
            } catch (error) {
                console.error("Erro ao buscar dados:", error.response?.data || error.message);
            }
        };

        fetchData();
    }, [reload, token]);

    const criar = async (novoCurso) => {
        if (!novoCurso || !novoCurso.codigoCurso) {
            alert("Preencha todos os campos!");
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/cursos", novoCurso, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 201) {
                setReload(!reload);
                setModalOpen(false);
            }
        } catch (error) {
            console.error("Erro ao criar:", error.response?.data || error.message);
        }
    };

    const editar = async (curso) => {
        if (!curso || !curso.codigoCurso) {
            alert("Preencha todos os campos!");
            return;
        }

        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/cursos/${curso.id}`, curso, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200) {
                setReload(!reload);
                setModalOpen(false);
            }
        } catch (error) {
            console.error("Erro ao editar:", error.response?.data || error.message);
        }
    };

    const apagar = async (id) => {
        if (window.confirm("Tem certeza que deseja apagar este curso?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/cursos/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setReload(!reload);
            } catch (error) {
                console.error("Erro ao excluir curso:", error.response?.data || error.message);
            }
        }
    };

    const search = () => {
        if (!texto.trim()) {
            setDadosFiltrados(dados);
            return;
        }

        const resultado = dados.filter((curso) => {
            const codigo = curso.codigoCurso ? String(curso.codigoCurso).toLowerCase() : "";
            const nomeCurso = curso.curso !== null ? curso.curso.toLowerCase() : "";

            return codigo.includes(texto.toLowerCase()) || nomeCurso.includes(texto.toLowerCase());
        });

        setDadosFiltrados(resultado);
    };

    return (
        <main className="main">
            <Head />
            <div className="container">
                <section className="section">
                    <div className="table">
                        {dadosFiltrados.length > 0 ? (
                            dadosFiltrados.map((curso) => (
                                <div key={curso.id} className="lista">
                                    <div className="col1">
                                        <FaEdit
                                            className="edit"
                                            onClick={() => {
                                                setCursoSelecionado(curso);
                                                setModalOpen(true);
                                            }}
                                        />
                                    </div>
                                    <div className="col2">
                                        <FaTrash className="delete" onClick={() => apagar(curso.id)} />
                                    </div>
                                    <div className="col3">
                                        <span className="codigo">{curso.codigoCurso}</span>
                                    </div>
                                    <div className="col4">
                                        <span className="nome">{curso.curso}</span>
                                    </div>
                                    <div className="col5">
                                        <span className="tipo">{curso.tipo}</span>
                                    </div>
                                    <div className="col6">
                                        <span className="ha">{curso.ha}</span>
                                    </div>
                                    <div className="col7">
                                        <span className="sigla">{curso.sigla}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Nenhum curso encontrado.</p>
                        )}
                    </div>

                    <div className="footer">
                        <div className="btn1">
                            <FaPlus
                                className="adicionar"
                                onClick={() => {
                                    setCursoSelecionado(null);
                                    setModalOpen(true);
                                }}
                            />
                        </div>
                        <div className="pesquisar">
                            <input
                                placeholder="Pesquisar curso"
                                value={texto}
                                onChange={(e) => setTexto(e.target.value)}
                            />
                        </div>
                        <div className="btn2">
                            <FaSearch className="procurar" onClick={search} />
                        </div>
                    </div>
                </section>
                <Footer />
            </div>

            {/* Modal para Criar/Editar Curso */}
            <ModalCurso
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                cursoSelecionado={cursoSelecionado}
                onCriar={criar}
                onEditar={editar}
            />
        </main>
    );
}
