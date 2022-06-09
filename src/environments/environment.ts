const apiUrl = 'http://127.0.0.1:8000';

export const environment = {
  production: false,
  sessionStorage: {
    userToken: 'catalogo-user-token',
  },
  api: {
    endpoint: `${apiUrl}/api`,
    images: `${apiUrl}/storage`
  }
};
