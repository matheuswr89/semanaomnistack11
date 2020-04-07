import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useToasts } from 'react-toast-notifications'

import api from '../../services/api';

import './styles.css';

import logo from '../../assets/logo.svg';

export default function Edit() {
    const ongId = localStorage.getItem('ongId');
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const history = useHistory();
    const { addToast } = useToasts();

    async function popularCampos() {
        const response = await api.get(`incidents/${id}`, {
            headers: {
                Authorization: ongId,
            }
        })
        return response.data[0];
    }
    const caso = popularCampos();
    console.log(caso);

    async function handlerEditIncident(e) {
        e.preventDefault()

        const data = {
            title,
            descricao,
            valor,
        }

        try {
            await api.put(`incidents/${id}`, data, {
                headers: {
                    Authorization: ongId,
                }
            })
            addToast(`Caso editado com sucesso.`, {
                appearance: 'success',
                autoDismiss: true,
            });
            history.push('/profile');
        } catch (err) {
            addToast(`Não foi possível editar o caso. Tente novamente.`, {
                appearance: 'error',
                autoDismiss: true,
            });
        }
    }

    function cancel(e) {
        e.preventDefault();
        setTitle('');
        setValor('');
        setDescricao('');
    }

    return (
        <div className="new-incindet-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Be The Hero" />
                    <h1 style={{ color: '#41414d' }}>Editar caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um heroi para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para Home
                    </Link>
                </section>
                <form onSubmit={handlerEditIncident} onReset={cancel} id="form">
                    <input placeholder="Titulo do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)} />
                    <textarea placeholder="Descrição"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)} />
                    <input placeholder="Valor"
                        value={valor}
                        onChange={e => setValor(e.target.value)} />
                    <div className="btn-group">
                        <button className="button-cancelar" type="reset">Cancelar</button>
                        <button className="button" type="submit">Editar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}