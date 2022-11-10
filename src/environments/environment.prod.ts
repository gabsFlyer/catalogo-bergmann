const apiUrl = 'https://api.distribuidorabergmann.com.br';

export const environment = {
  production: true,
  application: {
    name: 'Distribuidora Bergmann',
    daysToRefreshToken: 3,
  },
  sessionStorage: {
    enterprise: 'catalogo-enterprise',
    lastTokenRefresh: 'catalogo-last-token-refresh',
    myCartProducts: 'catalogo-my-cart-products',
    userToken: 'catalogo-user-token',
  },
  api: {
    endpoint: `${apiUrl}`,
    images: `${apiUrl}/storage`,
  }
};
