import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import './disciplinas.css';
import Head from '../../components/head/index.jsx';
import Footer from '../../components/footer/index';
import ModalDisciplinas from "../../components/modalDisciplinas/index.jsx";

export default function Disciplinas() {
    const [dados, setDados] = useState([]);  
    const [dadosOriginais, setDadosOriginais] = useState([]); 
    const [modalOpen, setModalOpen] = useState(false);
    const token = localStorage.getItem('token');
    const [disciplinaSelecionada, setDisciplinaSelecionada] = useState(null);
    const [texto, setTexto] = useState('');

    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/disciplinas", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDados(response.data);
                setDadosOriginais(response.data);  // Guarda todas as disciplinas
            } catch (error) {
                console.error("Erro ao buscar disciplinas:", error);
            }
        };

        fetchData();
    }, []);  

    const handleSearch = (e) => {
        const valor = e.target.value.toLowerCase();
        setTexto(valor);

        if (valor === '') {
            setDados(dadosOriginais); 
        } else {
            const filtrados = dadosOriginais.filter(disciplina => 
                disciplina.disciplina.toLowerCase().includes(valor)
            );
            setDados(filtrados);
        }
    };

    const apagar = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/disciplinas/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Recarregar as disciplinas após a exclusão
            setDados(dados.filter(disciplina => disciplina.id !== id));
        } catch (error) {
            console.error("Erro ao excluir disciplina:", error);
        }
    };

    const criarDisciplina = async (novosDados) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/disciplinas", novosDados, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Adicionar a nova disciplina à lista de dados
            setDados([...dados, response.data]);
        } catch (error) {
            console.error("Erro ao criar disciplina:", error);
        }
    };

    const editarDisciplina = async (id, novosDados) => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/disciplinas/${id}`, novosDados, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Atualizar os dados da disciplina editada
            setDados(dados.map(disciplina => disciplina.id === id ? response.data : disciplina));
        } catch (error) {
            console.error("Erro ao editar disciplina:", error);
        }
    };

    return (
        <main className="main">
            <Head />
            <div className="container_home">
                <section className="section_home">
                    <div className="table">
                        {dados.map((disciplina) => (
                            <div key={disciplina.id} className="lista">
                                <div className="col1">
                                    <FaEdit className="edit" onClick={() => { setModalOpen(true); setDisciplinaSelecionada(disciplina); }} />
                                </div>
                                <div className="col2">
                                    <FaTrash className="delete" onClick={() => apagar(disciplina.id)} />
                                </div>
                                <div className="col3">
                                    <span className="id">{disciplina.id}</span>
                                </div>
                                <div className="col4">
                                    <span className="disciplina">{disciplina.disciplina}</span>
                                </div>
                                <div className="col5">
                                    <span className="sigla">{disciplina.sigla}</span>
                                </div>
                                <div className="col6">
                                    <span className="curso">{disciplina.curso}</span>
                                </div>
                                <div className="col7">
                                    <span className="semestre">{disciplina.semestre}</span>
                                </div>
                                <div className="col8">
                                    <span className="carga_horaria">{disciplina.carga_horaria}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="footer">
                        <div className="btn1">
                            <FaPlus className="adicionar" onClick={() => { setModalOpen(true); setDisciplinaSelecionada(null); }} />
                        </div>
                        <div className="pesquisar">
                            <input
                                placeholder="Pesquisar disciplina"
                                value={texto}
                                onChange={handleSearch}  
                            />
                        </div>
                        <div className="btn2">
                            <FaSearch className="procurar" />
                        </div>
                    </div>

                    <ModalDisciplinas
                        isOpen={modalOpen}
                        onClose={() => setModalOpen(false)}
                        disciplinaSelecionada={disciplinaSelecionada}
                        onCriar={criarDisciplina}
                        onEditar={editarDisciplina}
                    />
                </section>
            </div>
            <Footer />
        </main>
    );
}
