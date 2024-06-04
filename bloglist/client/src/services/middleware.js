export const redirectOnInvalidSession = (axios) => {
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        window.localStorage.clear();
        window.location = `${window.location.origin}/login`;
      }
      return Promise.reject(error);
    }
  );
};
