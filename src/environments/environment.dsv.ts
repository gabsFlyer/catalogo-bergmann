const apiUrl = 'https://dev.distribuidorabergmann.com.br';

export const environment = {
  production: false,
  application: {
    name: 'Distribuidora Bergmann'
  },
  sessionStorage: {
    userToken: 'catalogo-user-token',
  },
  api: {
    endpoint: `${apiUrl}/api`,
    images: `${apiUrl}/storage`,
  }
};
