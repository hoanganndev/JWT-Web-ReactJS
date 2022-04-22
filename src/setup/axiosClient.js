import axios from "axios";
import { toast } from "react-toastify";
const axiosClient = axios.create({
    baseURL: "http://localhost:8080/",
    headers: {
        "Content-Type": "application/json",
    },
});

// axiosClient.defaults.withCredentials = true;
// axiosClient.defaults.headers.common[
//     "Authorization"
// ] = `Bearer ${localStorage.getItem("jwt")}`;
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
//🔥 Add a response interceptor
axiosClient.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        //🔥 const status = error.response?.status || 500;
        const status =
            (error && error.response && error.response.status) || 500;
        switch (status) {
            //🔥 authentication (token related issues)
            case 401: {
                toast.error("Unauthorized the user. Plese login");
                //🔥 window.location.href = "/login";
                return error.response.data;
            }
            //🔥 forbidden (permission related issues)
            case 403: {
                toast.error(
                    "You don't have the permisstion to access this resource..."
                );
                return error.response.data;
            }

            //🔥 bad request
            case 400: {
                return error.response.data;
            }

            //🔥 not found
            case 404: {
                return error.response.data;
            }

            //🔥 conflict
            case 409: {
                return error.response.data;
            }

            //🔥 unprocessable
            case 422: {
                return error.response.data;
            }

            //🔥 generic api error (server related) unexpected
            default: {
                return error.response;
            }
        }
    }
);
export default axiosClient;
