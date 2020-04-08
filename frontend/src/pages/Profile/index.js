import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2, FiEdit } from 'react-icons/fi';
import { useToasts } from 'react-toast-notifications'


import api from '../../services/api';

import logo from '../../assets/logo.svg';

import './styles.css';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    const { addToast } = useToasts();

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongname = localStorage.getItem('ongName');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });
            setIncidents(incidents.filter(incidents => incidents.id !== id));
            addToast('Caso excluido com sucesso.', {
                appearance: 'success',
                autoDismiss: true,
            });
        } catch (err) {
            addToast('Não foi possível excluir o caso. Tente novamente.', {
                appearance: 'error',
                autoDismiss: true,
            });
            
        }
    }

    async function handleEditIncident(id, title,descricao,valor){
        history.push(`/edit/${id}?title=${title}&valor=${valor}&descricao=${descricao}`);
    }

    function handleLogout() {
        localStorage.clear();
        addToast('Deslogado com sucesso.', {
            appearance: 'info',
            autoDismiss: true,
        });
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logo} alt="Be The Hero" />
                <span>Bem vinda, {ongname}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.length > 0 ? incidents.map(incidents => (
                    <li key={incidents.id}>
                        <strong>CASO:</strong>
                        <p>{incidents.title}</p>

                        <strong>DESCRIÇÂO:</strong>
                        <p>{incidents.descricao}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incidents.valor)}</p>

                        <button onClick={() => handleDeleteIncident(incidents.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                        <button className="edit" onClick={() => handleEditIncident(incidents.id,incidents.title,incidents.descricao,incidents.valor)} type="button">
                            <FiEdit size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))
                    : <h4>Nenhum incidente cadastrado!</h4>}
            </ul>
        </div>
    );
}