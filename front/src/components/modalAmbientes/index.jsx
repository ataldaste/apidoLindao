import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ModalAmbientes.css';

const ModalAmbientes = ({ isOpen, onClose, ambienteSelecionado, up, setUp }) => {
  if (!isOpen) return null; // Se o modal não estiver aberto, retorna null e não renderiza nada

  // Inicializa os estados com base no ambienteSelecionado ou valores padrão
  const [codigo, setCodigo] = useState(ambienteSelecionado?.codigo || '');
  const [sala, setSala] = useState(ambienteSelecionado?.sala || '');
  const [capacidade, setCapacidade] = useState(ambienteSelecionado?.capacidade || '');
  const [responsavel, setResponsavel] = useState(ambienteSelecionado?.responsavel || '');
  const [periodo, setPeriodo] = useState(ambienteSelecionado?.periodo || 'M'); // 'M' como valor padrão (MANHÃ)
  const token = localStorage.getItem('token');

  // Atualiza os estados quando o ambienteSelecionado mudar (para edição)
  useEffect(() => {
    if (ambienteSelecionado) {
      setCodigo(ambienteSelecionado.codigo || '');
      setSala(ambienteSelecionado.sala || '');
      setCapacidade(ambienteSelecionado.capacidade || '');
      setResponsavel(ambienteSelecionado.responsavel || '');
      setPeriodo(ambienteSelecionado.periodo || 'M');
    } else {
      setCodigo('');
      setSala('');
      setCapacidade('');
      setResponsavel('');
      setPeriodo('M');
    }
  }, [ambienteSelecionado]);

  // Função para salvar ou atualizar o ambiente
  const saveAmbiente = async () => {
    const url = ambienteSelecionado
      ? `http://127.0.0.1:8000/api/ambientes/${ambienteSelecionado.id}` // Se for edição, usa a URL com o ID
      : 'http://127.0.0.1:8000/api/ambientes'; // Se for criação, usa a URL de criação

    const method = ambienteSelecionado ? 'put' : 'post'; // Define o método (PUT para editar, POST para criar)

    try {
      // Faz a requisição para criar ou editar o ambiente
      await axios({
        method,
        url,
        data: { codigo, sala, capacidade, responsavel, periodo },
        headers: { Authorization: `Bearer ${token}` },
      });
      onClose(); // Fecha o modal após salvar
      setUp(!up); // Atualiza o estado de "reload" do componente pai para refletir as mudanças
    } catch (error) {
      console.error(`Erro ao ${ambienteSelecionado ? 'atualizar' : 'salvar'} ambiente:`, error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{ambienteSelecionado ? 'Editar Ambiente' : 'Cadastrar Ambiente'}</h2>
        <div className="body_modal">
          <form onSubmit={(e) => { e.preventDefault(); saveAmbiente(); }}>
            <input
              className="codigo_modal"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              placeholder="Código"
              required
            />
            <input
              className="sala_modal"
              value={sala}
              onChange={(e) => setSala(e.target.value)}
              placeholder="Nome da Sala"
              required
            />
            <input
              className="capacidade_modal"
              value={capacidade}
              onChange={(e) => setCapacidade(e.target.value)}
              placeholder="Capacidade"
              type="number"
              required
            />
            <input
              className="responsavel_modal"
              value={responsavel}
              onChange={(e) => setResponsavel(e.target.value)}
              placeholder="Responsável"
              required
            />
            <select
              className="periodo_modal"
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              required
            >
              <option value="M">MANHÃ</option>
              <option value="T">TARDE</option>
              <option value="N">NOITE</option>
              <option value="S">SÁBADO</option>
            </select>
            <button type="submit">{ambienteSelecionado ? 'Atualizar' : 'Salvar'}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalAmbientes;
