import React, { useState, useEffect } from "react";
import "./modalCurso.css"; // Arquivo de estilo para o modal

export default function ModalCurso({ isOpen, onClose, cursoSelecionado, onCriar, onEditar }) {
    const [codigoCurso, setCodigoCurso] = useState("");
    const [curso, setCurso] = useState("");
    const [tipo, setTipo] = useState("");
    const [ha, setHa] = useState("");
    const [sigla, setSigla] = useState("");

    useEffect(() => {
        if (cursoSelecionado) {
            setCodigoCurso(cursoSelecionado.codigoCurso);
            setCurso(cursoSelecionado.curso);
            setTipo(cursoSelecionado.tipo);
            setHa(cursoSelecionado.ha);
            setSigla(cursoSelecionado.sigla);
        }
    }, [cursoSelecionado]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const novoCurso = {
            codigoCurso,
            curso,
            tipo,
            ha,
            sigla,
        };

        if (cursoSelecionado) {
            // Editando um curso existente
            onEditar({ ...novoCurso, id: cursoSelecionado.id });
        } else {
            // Criando um novo curso
            onCriar(novoCurso);
        }

        // Fechar o modal após a ação
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>{cursoSelecionado ? "Editar Curso" : "Adicionar Curso"}</h2>
                    <button className="close-btn" onClick={onClose}>
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="codigoCurso">Código do Curso</label>
                        <input
                            type="number"
                            id="codigoCurso"
                            value={codigoCurso}
                            onChange={(e) => setCodigoCurso(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="curso">Nome do Curso</label>
                        <input
                            type="text"
                            id="curso"
                            value={curso}
                            onChange={(e) => setCurso(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="tipo">Tipo</label>
                        <input
                            type="text"
                            id="tipo"
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="ha">Carga Horária</label>
                        <input
                            type="number"
                            id="ha"
                            value={ha}
                            onChange={(e) => setHa(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="sigla">Sigla</label>
                        <input
                            type="text"
                            id="sigla"
                            value={sigla}
                            onChange={(e) => setSigla(e.target.value)}
                            required
                        />
                    </div>

                    <div className="modal-footer">
                        <button type="submit" className="btn-submit">
                            {cursoSelecionado ? "Salvar Alterações" : "Adicionar Curso"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
