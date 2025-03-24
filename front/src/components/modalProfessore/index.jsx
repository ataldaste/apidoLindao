import React, { useState, useEffect } from 'react';

export default function ModalProfessores({ isOpen, onClose, professorSelecionado, atualizar, criar }) {
    const [formData, setFormData] = useState({
        nome: '',
        ni: '',
        email: '',
        cel: '',
        ocup: ''
    });

    useEffect(() => {
        if (professorSelecionado) {
            setFormData(professorSelecionado);
        } else {
            setFormData({ nome: '', ni: '', email: '', cel: '', ocup: '' });
        }
    }, [professorSelecionado]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (professorSelecionado) {
            atualizar(formData); // Atualiza o professor
        } else {
            criar(formData); // Cria um novo professor
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{professorSelecionado ? "Atualizar Professor" : "Adicionar Novo Professor"}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Número de Identificação"
                        value={formData.ni}
                        onChange={(e) => setFormData({ ...formData, ni: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Celular"
                        value={formData.cel}
                        onChange={(e) => setFormData({ ...formData, cel: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Ocupação"
                        value={formData.ocup}
                        onChange={(e) => setFormData({ ...formData, ocup: e.target.value })}
                    />
                    <button type="submit">Salvar</button>
                    <button type="button" onClick={onClose}>Fechar</button>
                </form>
            </div>
        </div>
    );
}
