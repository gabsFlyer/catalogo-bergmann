export const RoutesConstant = {
  auth: {
    register: 'register',
    login: 'login',
    logout: 'logout',
  },
  dashboard: {
    home: 'dashboard',
    products: {
      list: 'dashboard/products',
      edit: 'dashboard/products/edit/{0}',
      new:  'dashboard/products/new'
    }
  }
}
