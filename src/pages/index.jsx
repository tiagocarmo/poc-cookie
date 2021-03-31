// http://localhost:3000/

import { useState } from 'react';
import cookie from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

import { verifyLogin } from '../utils/login';

const Front = ({ logged = false, consumer = '' }) => {
  const [isLogged, setLogged] = useState(logged);
  const [consumerId, setConsumerId] = useState(consumer);

  const handleLogin = (event) => {
    event.preventDefault();
    const user = event.target.pocUz.value;
    const password = event.target.pocPz.value;
    if (verifyLogin(user, password)) {
      const consumerId = uuidv4();
      cookie.set('customCookieTokenName', consumerId, { expires: 30 });
      setLogged(true);
      setConsumerId(consumerId);
      return true;
    }
    return false;
  }

  const handleLogout = () => {
    cookie.remove('customCookieTokenName');
    setLogged(false);
  }

  return (
    <div className="container-limit">
      <div className="container">
        {!isLogged
          && (
            <>
              <h1>Login</h1>

              <form onSubmit={handleLogin} autoComplete="off">
                <label htmlFor="pocUz">Usuário</label>
                <input type="text" name="pocUz" id="pocUz" autoComplete="off" />

                <label htmlFor="pocPz">Senha</label>
                <input type="password" name="pocPz" id="pocPz" autoComplete="off" />

                <button type="submit">Login</button>
              </form>

              <code>
                <pre>
                  <p>Login válido</p>
                  <p>user: 24kGoldn<br />senha: mood</p>
                </pre>
              </code>
            </>
          )}
        {isLogged
          && (
            <>
              <p>ID do consumidor: {consumerId}</p>
              <button type="button" onClick={() => handleLogout()}>Logout</button>
            </>
          )}
      </div>
    </div>
  );
};

export function getServerSideProps({ req, res }) {
  if (req.cookies.customCookieTokenName) {
    return {
      props: {
        logged: true,
        consumer: req.cookies.customCookieTokenName
      }
    }
  }
  return {
    props: {}
  };
};

export default Front;
