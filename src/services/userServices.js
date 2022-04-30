import axiosClient from "../setup/axiosClient";
const registerNewUser = (email, phone, username, password) => {
    return axiosClient.post("/api/v1/register", {
        email,
        phone,
        username,
        password,
    });
};
const loginUser = (valueLogin, password) => {
    return axiosClient.post("/api/v1/login", {
        valueLogin,
        password,
    });
};
const fetchAllUser = (page, limit) => {
    return axiosClient.get(`/api/v1/user/read?page=${page}&limit=${limit}`);
};
const deleteUser = user => {
    return axiosClient.delete("/api/v1/user/delete", {
        data: { id: user.id },
    });
};
const fetchGroup = () => {
    return axiosClient.get("/api/v1/group/read");
};
const createNewUser = userData => {
    return axiosClient.post("/api/v1/user/create", {
        ...userData,
    });
};
const updateCurrentUser = userData => {
    return axiosClient.put("/api/v1/user/update", {
        ...userData,
    });
};
const getUserAccount = () => {
    return axiosClient.get("/api/v1/account");
};
const logoutUser = () => {
    return axiosClient.get("/api/v1/logout");
};

export {
    registerNewUser,
    loginUser,
    fetchAllUser,
    deleteUser,
    fetchGroup,
    createNewUser,
    updateCurrentUser,
    getUserAccount,
    logoutUser,
};
