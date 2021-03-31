// http://localhost:3000/api/login

import cookie from 'cookie';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export default (req, res) => {
  res.setHeader('Set-Cookie',
    cookie.serialize(
      'customCookieTokenName',
      req.body.customCookieTokenName,
      {
        httpOnly: true,
        secure: serverRuntimeConfig.SERVER_ENV !== 'development',
        maxAge: 60 * 60 * 24 * 30,
        sameSite: 'strict',
        path: '/'
      }
    )
  );
  res.statusCode = 200;
  res.json({ success: true });
}
