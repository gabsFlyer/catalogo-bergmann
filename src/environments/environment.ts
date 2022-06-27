const apiUrl = 'http://127.0.0.1:8000';

export const environment = {
  production: false,
  application: {
    name: 'Distribuidora Bergmann',
    daysToRefreshToken: 3,
  },
  sessionStorage: {
    userToken: 'catalogo-user-token',
    lastTokenRefresh: 'catalogo-last-token-refresh',
  },
  api: {
    endpoint: `${apiUrl}/api`,
    images: `${apiUrl}/storage`
  }
};
