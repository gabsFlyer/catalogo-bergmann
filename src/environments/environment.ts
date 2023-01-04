const apiUrl = 'http://127.0.0.1:8000';

export const environment = {
  production: false,
  application: {
    daysToRefreshToken: 3,
    name: 'Distribuidora Bergmann',
  },
  sessionStorage: {
    enterprise: 'catalogo-enterprise',
    lastTokenRefresh: 'catalogo-last-token-refresh',
    myCartProducts: 'catalogo-my-cart-products',
    userToken: 'catalogo-user-token',
  },
  api: {
    endpoint: `${apiUrl}`,
    images: `${apiUrl}/storage`
  }
};
