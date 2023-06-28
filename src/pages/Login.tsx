import { useEffect, useState } from 'react';

import { useAuth } from '../hooks/useAuth';

import styles from './Login.module.css';
import PageNav from '../components/navs/PageNav';
import Button from '../components/ui/Button';
import { ButtonType } from '../types/types';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  // PRE-FILL FOR DEV PURPOSES
  const navigate = useNavigate();
  const [email, setEmail] = useState('jack@example.com');
  const [password, setPassword] = useState('qwerty');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/app', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email || !password) return;

    login(email, password);
  }

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type={ButtonType.Primary}>Login</Button>
        </div>
      </form>
    </main>
  );
}
