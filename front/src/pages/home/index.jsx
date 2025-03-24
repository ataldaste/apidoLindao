import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import './styles.css';
import ModalProfessores from "../../components/modalProfessore";
import Head from '../../components/head/index.jsx';
import Footer from '../../components/footer/index';

export default function Home() {
    const [dados, setDados] = useState([]);
    const [dadosFiltrados, setDadosFiltrados] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const token = localStorage.getItem('token');
    const [professorSelecionado, setProfessorSelecionado] = useState(null);
    const [texto, setTexto] = useState('');
    const [reload, setReload] = useState(false);

    // Carrega os dados ao abrir a página
    useEffect(() => {
        if (!token) {
            alert("Token inválido ou não encontrado!");
            return;
        }

        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/professores", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDados(response.data);
                setDadosFiltrados(response.data); // Inicializa com todos os dados
            } catch (error) {
                console.error("Erro ao buscar dados:", error.response?.data || error.message);
            }
        };

        fetchData();
    }, [reload]);

    // Criar professor
    const criar = async (novoProfessor) => {
        if (!novoProfessor || !novoProfessor.nome) {
            alert("Preencha o nome do professor!");
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/professores', novoProfessor, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 201) {
                setReload(!reload); // Atualiza os dados
                setModalOpen(false); // Fecha o modal
            } else {
                console.error("Falha ao criar professor");
            }
        } catch (error) {
            console.error("Erro ao criar:", error.response?.data || error.message);
        }
    };

    // Atualizar professor
    const atualizar = async (professorSelecionado) => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/id/${professorSelecionado.id}`,
                {
                    ni: professorSelecionado.ni,
                    nome: professorSelecionado.nome,
                    email: professorSelecionado.email,
                    cel: professorSelecionado.cel,
                    ocup: professorSelecionado.ocup
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setDados(dados.map((professor) => professor.id === professorSelecionado.id ? professorSelecionado : professor));
            setModalOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    // Deletar professor
    const apagar = async (id) => {
        if (window.confirm("Tem certeza que deseja apagar este professor?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/professores/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
    
                if (response.status === 200) {
                    setDados(dados.filter(professor => professor.id !== id));
                    setDadosFiltrados(dadosFiltrados.filter(professor => professor.id !== id));
                    alert("Professor apagado com sucesso!");
                } else {
                    console.error("Falha ao deletar professor:", response.data);
                    alert("Falha ao apagar o professor!");
                }
            } catch (error) {
                console.error("Erro ao excluir disciplina:", error);
            }
        }
    };
    
    // Pesquisa no front-end
    const search = () => {
        if (!texto.trim()) {
            setDadosFiltrados(dados); // Se estiver vazio, exibe todos
            return;
        }

        const resultado = dados.filter(professor =>
            professor.nome.toLowerCase().includes(texto.toLowerCase())
        );

        setDadosFiltrados(resultado);
    };

    return (
        <main className="main">
            <Head />
            <div className="container_home">
                <section className="section_home">
                    <div className="table">
                        {dadosFiltrados.length > 0 ? (
                            dadosFiltrados.map((professor) => (
                                <div key={professor.id} className="lista">
                                    <div className="col1">
                                        <FaEdit
                                            className="edit"
                                            onClick={() => {
                                                setProfessorSelecionado(professor);
                                                setModalOpen(true);
                                            }}
                                        />
                                    </div>
                                    <div className="col2">
                                        <FaTrash className="delete" onClick={() => apagar(professor.id)} />
                                    </div>
                                    <div className="col3"><span className="id">{professor.id}</span></div>
                                    <div className="col4"><span className="ni">{professor.ni}</span></div>
                                    <div className="col5"><span className="nome">{professor.nome}</span></div>
                                    <div className="col6"><span className="email">{professor.email}</span></div>
                                    <div className="col7"><span className="cel">{professor.cel}</span></div>
                                    <div className="col8"><span className="ocup">{professor.ocup}</span></div>
                                </div>
                            ))
                        ) : (
                            <p>Nenhum professor encontrado.</p>
                        )}
                    </div>

                    <div className="footer">
                        <div className="btn1">
                            <FaPlus
                                className="adicionar"
                                onClick={() => {
                                    setProfessorSelecionado(null); // Garante que não há professor selecionado
                                    setModalOpen(true); // Abre o modal para adicionar
                                }}
                            />
                        </div>
                        <div className="pesquisar">
                            <input
                                placeholder="Nome do professor"
                                value={texto}
                                onChange={(e) => setTexto(e.target.value)}
                            />
                        </div>
                        <div className="btn2">
                            <FaSearch className="procurar" onClick={search} />
                        </div>
                    </div>

                    {modalOpen && (
                        <ModalProfessores
                            isOpen={modalOpen}
                            onClose={() => setModalOpen(false)}
                            professorSelecionado={professorSelecionado}
                            atualizar={atualizar}
                            criar={criar}
                        />
                    )}
                </section>
            </div>
            <Footer />
        </main>
    );
}
