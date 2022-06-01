import { environment } from "src/environments/environment";

const baseUrl: string = environment.api.endpoint;

export const apiEndpoints = {
  auth: {
    signIn: `${baseUrl}/auth/signIn`,
    signUp: `${baseUrl}/auth/signUp`,
  },
}
