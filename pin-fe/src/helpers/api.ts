import axios from "axios";

export async function api({
  url,
  data = {},
  method = "GET",
  params = {},
  options = {},
  clientConfig = {
    baseURL: "/apiSa",
    timeout: 60000,
  },
}) {
  const client = axios.create(clientConfig);
  //   const idToken = await auth.currentUser.getIdToken(false);
  return client
    .request({
      ...options,
      headers: {
        accept: "application/json",
        ...(options.headers || {}),
        // "X-Auth-Token": idToken,
      },
      url,
      method,
      data,
      params,
    })
    .then((res) => res.data);
}

const getAuthenticatedFetchApi = () => {
  const fetchFunction = api;
  return async (uri: string, options = {}) => {
    return fetchFunction({
      url: uri,
      data: options.body,
      method: options.method,
    });
  };
};

export const fetchAuthenticatedApi = getAuthenticatedFetchApi();
