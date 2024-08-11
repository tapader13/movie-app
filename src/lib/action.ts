'use server';
import { options } from './constant';
const TMDB_API_BASE = 'https://api.themoviedb.org/3';

export const login = async (formData: FormData) => {
  try {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    console.log(username, password);
    const tokenRes = await fetch(
      `${TMDB_API_BASE}/authentication/token/new`,
      options
    );
    const tokenData = await tokenRes.json();

    const requestToken = tokenData.request_token;

    const validateRes = await fetch(
      `${TMDB_API_BASE}/authentication/token/validate_with_login`,
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTJhMTljYTc0Y2JkMDA5MDFmNGVlM2RkZjM0Nzc1NCIsIm5iZiI6MTcyMzIxMjI4MC42Mzg0MDYsInN1YiI6IjY2YjYyMDA2ZDM1OTNhODJkYzI3MDU2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5KvH9hQ5ma03_Uz5k8sNvmLIm-aEULp-cdbhJu_bOQY',
        },
        body: JSON.stringify({
          username,
          password,
          request_token: requestToken,
        }),
      }
    );
    const validateData = await validateRes.json();

    const validatedToken = validateData.request_token;

    if (validatedToken) {
      const sessionRes = await fetch(
        `${TMDB_API_BASE}/authentication/session/new`,
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTJhMTljYTc0Y2JkMDA5MDFmNGVlM2RkZjM0Nzc1NCIsIm5iZiI6MTcyMzIxMjI4MC42Mzg0MDYsInN1YiI6IjY2YjYyMDA2ZDM1OTNhODJkYzI3MDU2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5KvH9hQ5ma03_Uz5k8sNvmLIm-aEULp-cdbhJu_bOQY',
          },
          body: JSON.stringify({ request_token: validatedToken }),
        }
      );
      const sessionData = await sessionRes.json();
      const sessionId = sessionData.session_id;
      console.log(sessionId, 'session');
      if (sessionId) {
        const accountRes = await fetch(
          `${TMDB_API_BASE}/account?session_id=${sessionId}`,
          options
        );
        const accountData = await accountRes.json();
        const accountId = accountData.id;
        console.log(accountId, 'acd');
        if (accountId) {
          console.log(sessionId, accountId);
          return { success: true, sessionId, accountId };
        } else {
          return { error: 'Uneble to find account id' };
        }
      } else {
        return { error: 'Uneble to create session' };
      }
    } else {
      return { error: 'invalid username or password' };
    }
  } catch (error) {
    return { error: 'internal server error' };
  }
};
