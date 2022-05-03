import axiosClient from "../setup/axiosClient";
const createRoles = roles => {
    return axiosClient.post("/api/v1/role/create", [...roles]);
};
const fetchAllRoles = (page, limit) => {
    return axiosClient.get(`/api/v1/role/read?page=${page}&limit=${limit}`);
};
const deteteRole = role => {
    return axiosClient.delete("/api/v1/role/delete", { data: { id: role.id } });
};
const updateCurrentRole = roleData => {
    return axiosClient.put("/api/v1/role/update", {
        ...roleData,
    });
};
export { createRoles, fetchAllRoles, deteteRole, updateCurrentRole };
