import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ModalTurmas.css';

const ModalTurmas = ({ isOpen, onClose, turmaSelecionada, onCriar, onEditar }) => {
  if (!isOpen) return null;

  const [codigo, setCodigo] = useState(turmaSelecionada?.codigo || '');
  const [nome, setNome] = useState(turmaSelecionada?.nome || '');
  const [curso, setCurso] = useState(turmaSelecionada?.curso || '');
  const [semestre, setSemestre] = useState(turmaSelecionada?.semestre || '');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (turmaSelecionada) {
      setCodigo(turmaSelecionada.codigo || '');
      setNome(turmaSelecionada.nome || '');
      setCurso(turmaSelecionada.curso || '');
      setSemestre(turmaSelecionada.semestre || '');
    } else {
      setCodigo('');
      setNome('');
      setCurso('');
      setSemestre('');
    }
  }, [turmaSelecionada]);

  const saveTurma = async () => {
    if (turmaSelecionada) {
      onEditar({ id: turmaSelecionada.id, codigo, nome, curso, semestre });
    } else {
      onCriar({ codigo, nome, curso, semestre });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{turmaSelecionada ? 'Editar Turma' : 'Cadastrar Turma'}</h2>
        <div className="body_modal">
          <form onSubmit={(e) => { e.preventDefault(); saveTurma(); }}>
            <input
              className="codigo_modal"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              placeholder="Código"
              required
            />
            <input
              className="nome_modal"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome"
              required
            />
            <input
              className="curso_modal"
              value={curso}
              onChange={(e) => setCurso(e.target.value)}
              placeholder="Curso"
              required
            />
            <input
              className="semestre_modal"
              value={semestre}
              onChange={(e) => setSemestre(e.target.value)}
              placeholder="Semestre"
              type="number"
              required
            />
            <button type="submit">{turmaSelecionada ? 'Atualizar' : 'Salvar'}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalTurmas;
