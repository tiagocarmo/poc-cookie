// http://localhost:3000/api/logout

import cookie from 'cookie';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export default (req, res) => {
  res.setHeader('Set-Cookie',
    cookie.serialize(
      'customCookieTokenName',
      '',
      {
        httpOnly: true,
        secure: serverRuntimeConfig.SERVER_ENV !== 'development',
        expires: new Date(0),
        sameSite: 'strict',
        path: '/'
      }
    )
  );
  res.statusCode = 200;
  res.json({ success: true });
}
