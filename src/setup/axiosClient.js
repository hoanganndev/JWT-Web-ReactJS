import axios from "axios";
import { toast } from "react-toastify";
const axiosClient = axios.create({
    baseURL: "http://localhost:8080/",
    headers: {
        "Content-Type": "application/json",
    },
});

/**🔴🟡🟢 withCredentials
 * True : Client can get and show cookie at Application/cookies
 * False : Client don't have any cookies from server response
 * And cookies will auto send with req from client when client call api
 */
axiosClient.defaults.withCredentials = true;
// We can verify user by using bearer token
axiosClient.defaults.headers.common[
    "Authorization"
] = `Bearer ${localStorage.getItem("jwt")}`; //! get token at header
// Add a request interceptor
axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);
//! Add a response interceptor
axiosClient.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        const status = error && error.response ? error.response.status : 500;
        switch (status) {
            //! authentication (token related issues)
            case 401: {
                toast.error(error.response.data.errorMessage);
                return error.response.data;
            }
            //! forbidden (permission related issues)
            case 403: {
                toast.error(error.response.data.errorMessage);
                return error.response.data;
            }

            //! bad request
            case 400: {
                toast.error(error.response.data.errorMessage);
                return error.response.data;
            }

            //! not found
            case 404: {
                toast.error(error.response.data.errorMessage);
                return error.response.data;
            }

            //! conflict
            case 409: {
                toast.error(error.response.data.errorMessage);
                return error.response.data;
            }

            //! unprocessable
            case 422: {
                toast.error(error.response.data.errorMessage);
                return error.response.data;
            }

            //! generic api error (server related) unexpected
            default: {
                return error.response;
            }
        }
    }
);
export default axiosClient;
