// http://localhost:3000/api/login

import cookie from 'cookie';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

const maxAge = () => {
  const sec = 60;
  const min = 60;
  const hours = 24;
  const days = 30;
  return sec * min * hours * days;
}

export default (req, res) => {
  res.setHeader('Set-Cookie',
    cookie.serialize(
      'customCookieTokenName',
      req.body.customCookieTokenName,
      {
        httpOnly: true,
        secure: serverRuntimeConfig.SERVER_ENV !== 'development',
        maxAge: maxAge(),
        sameSite: 'strict',
        path: '/'
      }
    )
  );
  res.statusCode = 200;
  res.json({ success: true });
}
