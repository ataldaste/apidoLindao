import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const ModalDisciplinas = ({ isOpen, onClose, disciplinaSelecionada, up, setUp }) => {
  if (!isOpen) return null;

  const [sigla, setSigla] = useState(disciplinaSelecionada?.sigla || '');
  const [disciplina, setDisciplina] = useState(disciplinaSelecionada?.disciplina || '');
  const [curso, setCurso] = useState(disciplinaSelecionada?.curso || '');
  const [semestre, setSemestre] = useState(disciplinaSelecionada?.semestre || '');
  const [cargaHoraria, setCargaHoraria] = useState(disciplinaSelecionada?.carga_horaria || '');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (disciplinaSelecionada) {
      setSigla(disciplinaSelecionada.sigla || '');
      setDisciplina(disciplinaSelecionada.disciplina || '');
      setCurso(disciplinaSelecionada.curso || '');
      setSemestre(disciplinaSelecionada.semestre || '');
      setCargaHoraria(disciplinaSelecionada.carga_horaria || '');
    } else {
      setSigla('');
      setDisciplina('');
      setCurso('');
      setSemestre('');
      setCargaHoraria('');
    }
  }, [disciplinaSelecionada]);

  const saveDisciplina = async () => {
    const url = disciplinaSelecionada
      ? `http://127.0.0.1:8000/api/disciplinas/${disciplinaSelecionada.id}`
      : 'http://127.0.0.1:8000/api/disciplinas';

    const method = disciplinaSelecionada ? 'put' : 'post';

    try {
      await axios({
        method,
        url,
        data: { sigla, disciplina, curso, semestre, carga_horaria: cargaHoraria },
        headers: { Authorization: `Bearer ${token}` },
      });
      onClose();
      setUp(!up);
    } catch (error) {
      console.error(`Erro ao ${disciplinaSelecionada ? 'atualizar' : 'salvar'} disciplina:`, error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{disciplinaSelecionada ? 'Editar Disciplina' : 'Cadastrar Disciplina'}</h2>
        <div className="body_modal">
          <div className="caixa1">
            <form onSubmit={(e) => { e.preventDefault(); saveDisciplina(); }}>
              <input
                className="sigla_modal"
                value={sigla}
                onChange={(e) => setSigla(e.target.value)}
                placeholder="Sigla"
                required
              />
              <input
                className="disciplina_modal"
                value={disciplina}
                onChange={(e) => setDisciplina(e.target.value)}
                placeholder="Disciplina"
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
              <input
                className="carga_horaria_modal"
                value={cargaHoraria}
                onChange={(e) => setCargaHoraria(e.target.value)}
                placeholder="Carga Horária"
                type="number"
                required
              />
              <button type="submit">{disciplinaSelecionada ? 'Atualizar' : 'Salvar'}</button>
            </form>
          </div>
          </div>
        </div>
      </div>
  );
};

export default ModalDisciplinas;
