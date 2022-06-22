const apiUrl = 'https://distribuidorabergmann.com.br';

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
