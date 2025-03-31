import React, { useState, useEffect } from "react"; 
import axios from "axios";
import ModalAmbientes from "../../components/modalAmbientes/index.jsx"; // Certifique-se de que o ModalAmbientes está implementado corretamente.
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import './ambientes.css';
import Head from "../../components/head/index.jsx";
import Footer from "../../components/footer/index.jsx";

export default function Ambientes() {
    const [dados, setDados] = useState([]);
    const [dadosFiltrados, setDadosFiltrados] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [ambienteSelecionado, setAmbienteSelecionado] = useState(null);
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
                const response = await axios.get("http://127.0.0.1:8000/api/ambientes", {
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

    const criar = async (novoAmbiente) => {
        if (!novoAmbiente || !novoAmbiente.codigo) {
            alert("Preencha todos os campos!");
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/ambientes', novoAmbiente, {
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

    const editar = async (ambiente) => {
        if (!ambiente || !ambiente.codigo) {
            alert("Preencha todos os campos!");
            return;
        }

        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/ambientes/${ambiente.id}`, ambiente, {
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
        if (window.confirm("Tem certeza que deseja apagar este ambiente?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/ambientes/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setReload(!reload);
            } catch (error) {
                console.error("Erro ao excluir ambiente:", error);
            }
        }
    };

    const search = () => {
        if (!texto.trim()) {
            setDadosFiltrados(dados);
            return;
        }

        const resultado = dados.filter(ambiente =>
            ambiente.sala.toLowerCase().includes(texto.toLowerCase())
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
                            dadosFiltrados.map((ambiente) => (
                                <div key={ambiente.id} className="lista">
                                    <div className="col1">
                                        <FaEdit className="edit" onClick={() => {
                                            setAmbienteSelecionado(ambiente);
                                            setModalOpen(true);
                                        }} />
                                    </div>
                                    <div className="col2">
                                        <FaTrash className="delete" onClick={() => apagar(ambiente.id)} />
                                    </div>
                                    <div className="col3"><span className="codigo">{ambiente.codigo}</span></div>
                                    <div className="col4"><span className="sala">{ambiente.sala}</span></div>
                                    <div className="col5"><span className="capacidade">{ambiente.capacidade}</span></div>
                                    <div className="col6"><span className="responsavel">{ambiente.responsavel}</span></div>
                                    <div className="col7"><span className="periodo">{ambiente.periodo}</span></div>
                                </div>
                            ))
                        ) : (
                            <p>Nenhum ambiente encontrado.</p>
                        )}
                    </div>

                    <div className="footer">
                        <div className="btn1">
                            <FaPlus className="adicionar" onClick={() => {
                                setAmbienteSelecionado(null); // Para criar um novo ambiente
                                setModalOpen(true);
                            }} />
                        </div>
                        <div className="pesquisar">
                            <input placeholder="Nome da sala" value={texto} onChange={(e) => setTexto(e.target.value)} />
                        </div>
                        <div className="btn2">
                            <FaSearch className="procurar" onClick={search} />
                        </div>
                    </div>
                </section>
                <Footer/>
            </div>

            {/* Modal para Criar/Editar Ambiente */}
            <ModalAmbientes
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                ambienteSelecionado={ambienteSelecionado}
                onCriar={criar}
                onEditar={editar}
            />
        </main>
    );
}
