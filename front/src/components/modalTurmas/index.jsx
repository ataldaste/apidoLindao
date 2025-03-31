import React, { useState, useEffect } from 'react';
import './ModalTurmas.css';

const ModalTurmas = ({ isOpen, onClose, turmaSelecionada, onCriar, onEditar }) => {
  if (!isOpen) return null;

  // Estados definidos após verificar isOpen
  const [codigoTurma, setCodigoTurma] = useState('');
  const [turma, setTurma] = useState('');

  useEffect(() => {
    setCodigoTurma(turmaSelecionada?.codigoTurma || '');
    setTurma(turmaSelecionada?.turma || '');
  }, [turmaSelecionada]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (turmaSelecionada) {
      onEditar({ id: turmaSelecionada.id, codigoTurma, turma });
    } else {
      onCriar({ codigoTurma, turma });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{turmaSelecionada ? 'Editar Turma' : 'Cadastrar Turma'}</h2>
        <div className="body_modal">
          <form onSubmit={handleSubmit}>
            <input
              className="codigo_modal"
              value={codigoTurma}
              onChange={(e) => setCodigoTurma(e.target.value)}
              placeholder="Código"
              required
            />
            <input
              className="nome_modal"
              value={turma}
              onChange={(e) => setTurma(e.target.value)}
              placeholder="Nome"
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
