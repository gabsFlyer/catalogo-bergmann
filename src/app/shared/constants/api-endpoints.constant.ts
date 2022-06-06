import { environment } from "src/environments/environment";

const baseUrl: string = environment.api.endpoint;

export const apiEndpoints = {
  auth: {
    signIn: `${baseUrl}/auth/signIn`,
    signUp: `${baseUrl}/auth/signUp`,
    me: `${baseUrl}/auth/me`,
  },
  product: {
    index: `${baseUrl}/product?page={0}`,
    show: `${baseUrl}/product/{0}`,
    store: `${baseUrl}/product`,
    update: `${baseUrl}/product/{0}`,
    destroy: `${baseUrl}/product/{0}`,
  },
  measurementUnit: {
    index: `${baseUrl}/measurement-unit`,
    show: `${baseUrl}/measurement-unit/{0}`,
    store: `${baseUrl}/measurement-unit`,
    update: `${baseUrl}/measurement-unit/{0}`,
    destroy: `${baseUrl}/measurement-unit/{0}`,
  },
}
