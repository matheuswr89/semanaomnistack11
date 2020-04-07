import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { useToasts } from 'react-toast-notifications'

import './styles.css';

import api from '../../services/api';

import heroesimg from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();
    const { addToast } = useToasts();

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const response = await api.post('sessions', { id });
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.nome);
            history.push('/profile');
        } catch (err) {
            addToast('Não foi possível logar. Tente novamente', {
                appearance: 'error',
                autoDismiss: true,
            });
        }
    }

    return (
            <div className="logon-container">
                <section className="form">
                    <img src={logo} alt="Be The Hero" />
                    <form onSubmit={handleLogin}>
                        <input placeholder="Sua ID"
                            value={id}
                            onChange={e => setId(e.target.value)}
                        />
                        <button className="button" type="submit">Entrar</button>

                        <Link className="back-link" to="/register">
                            <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                    </form>
                </section>
                <img src={heroesimg} alt="Heroes" />
            </div>
    );
}