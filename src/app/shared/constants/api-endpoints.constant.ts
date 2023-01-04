import { environment } from "src/environments/environment";

const baseUrl: string = environment.api.endpoint;

export const apiEndpoints = {
  auth: {
    signIn: `${baseUrl}/auth/signIn`,
    signUp: `${baseUrl}/auth/signUp`,
    me: `${baseUrl}/auth/me`,
    refreshToken: `${baseUrl}/auth/refresh`,
    logout: `${baseUrl}/auth/logout`,
  },
  enterprise: {
    indexPaginated: `${baseUrl}/enterprise?page={0}`,
    index: `${baseUrl}/enterprise?paginate=false`,
    show: `${baseUrl}/enterprise/{0}`,
    store: `${baseUrl}/enterprise`,
    update: `${baseUrl}/enterprise/{0}`,
    destroy: `${baseUrl}/enterprise/{0}`,
  },
  file: {
    index: `${baseUrl}/file?paginate=false`,
    show: `${baseUrl}/file/{0}`,
    store: `${baseUrl}/file`,
    update: `${baseUrl}/file/{0}`,
    destroy: `${baseUrl}/file/{0}`,
  },
  flyer: {
    indexPaginated: `${baseUrl}/flyer?page={0}`,
    show: `${baseUrl}/flyer/{0}`,
    store: `${baseUrl}/flyer`,
    update: `${baseUrl}/flyer/{0}`,
    destroy: `${baseUrl}/flyer/{0}`,
  },
  measurementUnit: {
    index: `${baseUrl}/measurement-unit?paginate=false`,
    show: `${baseUrl}/measurement-unit/{0}`,
    store: `${baseUrl}/measurement-unit`,
    update: `${baseUrl}/measurement-unit/{0}`,
    destroy: `${baseUrl}/measurement-unit/{0}`,
  },
  product: {
    indexPaginated: `${baseUrl}/product?page={0}`,
    index: `${baseUrl}/product?paginate=false`,
    show: `${baseUrl}/product/{0}`,
    store: `${baseUrl}/product`,
    update: `${baseUrl}/product/{0}`,
    destroy: `${baseUrl}/product/{0}`,
  },
  currentFlyer: `${baseUrl}/current-flyer`,
}
