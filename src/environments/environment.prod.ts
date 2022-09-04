const apiUrl = 'https://api.distribuidorabergmann.com.br';

export const environment = {
  production: true,
  application: {
    name: 'Distribuidora Bergmann',
    daysToRefreshToken: 3,
  },
  sessionStorage: {
    userToken: 'catalogo-user-token',
    lastTokenRefresh: 'catalogo-last-token-refresh',
  },
  api: {
    endpoint: `${apiUrl}`,
    images: `${apiUrl}/storage`,
  }
};
