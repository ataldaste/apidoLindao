import React, { useState, useEffect } from "react"; 
import axios from "axios";
import ModalTurmas from "../../components/modalTurmas/index.jsx"; 
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import './turmas.css';
import Head from "../../components/head/index.jsx";
import Footer from "../../components/footer/index.jsx";

export default function Turmas() {
    const [dados, setDados] = useState([]);
    const [dadosFiltrados, setDadosFiltrados] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [turmaSelecionada, setTurmaSelecionada] = useState(null);
    const [texto, setTexto] = useState('');
    const [reload, setReload] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            alert("Token inválido ou não encontrado!");
            return;
        }

        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/turmas", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDados(response.data);
                setDadosFiltrados(response.data);
            } catch (error) {
                console.error("Erro ao buscar dados:", error.response?.data || error.message);
            }
        };

        fetchData();
    }, [reload]);

    const criar = async (novaTurma) => {
        if (!novaTurma || !novaTurma.codigo) {
            alert("Preencha todos os campos!");
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/turmas', novaTurma, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 201) {
                setReload(!reload);
                setModalOpen(false);
            }
        } catch (error) {
            console.error("Erro ao criar:", error.response?.data || error.message);
        }
    };

    const editar = async (turma) => {
        if (!turma || !turma.codigo) {
            alert("Preencha todos os campos!");
            return;
        }

        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/turmas/${turma.id}`, turma, {
                headers: { Authorization: `Bearer ${token}` }
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
        if (window.confirm("Tem certeza que deseja apagar esta turma?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/turmas/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setReload(!reload);
            } catch (error) {
                console.error("Erro ao excluir turma:", error);
            }
        }
    };

    const search = () => {
        if (!texto.trim()) {
            setDadosFiltrados(dados);
            return;
        }

        const resultado = dados.filter(turma =>
            turma.nome.toLowerCase().includes(texto.toLowerCase())
        );

        setDadosFiltrados(resultado);
    };

    return (
        <main className="main">
            <Head/>
            <div className="container">
                <section className="section">
                    <div className="table">
                        {dadosFiltrados.length > 0 ? (
                            dadosFiltrados.map((turma) => (
                                <div key={turma.id} className="lista">
                                    <div className="col1">
                                        <FaEdit className="edit" onClick={() => {
                                            setTurmaSelecionada(turma);
                                            setModalOpen(true);
                                        }} />
                                    </div>
                                    <div className="col2">
                                        <FaTrash className="delete" onClick={() => apagar(turma.id)} />
                                    </div>
                                    <div className="col3"><span className="codigo">{turma.codigo}</span></div>
                                    <div className="col4"><span className="nome">{turma.nome}</span></div>
                                    <div className="col5"><span className="curso">{turma.curso}</span></div>
                                    <div className="col6"><span className="semestre">{turma.semestre}</span></div>
                                </div>
                            ))
                        ) : (
                            <p>Nenhuma turma encontrada.</p>
                        )}
                    </div>

                    <div className="footer">
                        <div className="btn1">
                            <FaPlus className="adicionar" onClick={() => {
                                setTurmaSelecionada(null); // Para criar uma nova turma
                                setModalOpen(true);
                            }} />
                        </div>
                        <div className="pesquisar">
                            <input placeholder="Nome da turma" value={texto} onChange={(e) => setTexto(e.target.value)} />
                        </div>
                        <div className="btn2">
                            <FaSearch className="procurar" onClick={search} />
                        </div>
                    </div>
                </section>
                <Footer/>
            </div>

            {/* Modal para Criar/Editar Turma */}
            <ModalTurmas
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                turmaSelecionada={turmaSelecionada}
                onCriar={criar}
                onEditar={editar}
            />
        </main>
    );
}
