import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useToasts } from 'react-toast-notifications'

import api from '../../services/api';

import './styles.css';

import logo from '../../assets/logo.svg';

export default function Register() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const { addToast } = useToasts();

    const history = useHistory();

    async function handlerRegister(e) {
        e.preventDefault();
        const data = {
            nome, email, whatsapp, cidade, uf
        };

        try {
            const response = await api.post('/ongs', data);
            addToast(`ONG cadastrada com sucesso. ID de acesso: ${response.data.id}`, {
                appearance: 'success',
                autoDismiss: true,
            });
            history.push('/');
        } catch (err) {
            addToast(`Não foi possível cadastrar a ONG. Tente novamente`, {
                appearance: 'error',
                autoDismiss: true,
            });
        }
    }

    function cancel(e) {
        e.preventDefault();
        setCidade('');
        setEmail('');
        setNome('');
        setUf('');
        setWhatsapp('');
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Be The Hero" />
                    <h1 style={{ color: '#41414d' }}>Cadastro</h1>
                    <p>Faça o seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handlerRegister} onReset={cancel}>
                    <input placeholder="Nome da ONG"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                    <input type="email" placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input placeholder="Cidade"
                            value={cidade}
                            onChange={e => setCidade(e.target.value)}
                        />
                        <input placeholder="UF" style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>
                    <div className="btn-group">
                        <button className="button-cancelar" type="reset">Limpar</button>
                        <button className="button" type="submit">Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}