import React, { useState, useEffect } from "react";
import { fetchAllUser } from "../../services/userServices";
import "./Users.scss";
const Users = () => {
    const [listUsers, setListUsers] = useState([]);
    useEffect(() => {
        fetchUsers();
    }, []);
    const fetchUsers = async () => {
        let res = await fetchAllUser();
        if (res && +res.errorCode === 0) {
            setListUsers(res.data);
        }
    };
    return (
        <div className="container">
            <div className="manage-users-container">
                <div className="user-header">
                    <div className="mt-3">
                        <h3>Table Users</h3>
                    </div>
                    <div className="actions">
                        <button className="btn btn-outline-success">
                            Refesh
                        </button>
                        <button className="btn btn-outline-info">Refesh</button>
                    </div>
                </div>
                <div className="user-body">
                    <table class="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">NO</th>
                                <th scope="col">Id</th>
                                <th scope="col">Email</th>
                                <th scope="col">Username</th>
                                <th scope="col">Group</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listUsers && listUsers.length > 0 ? (
                                <>
                                    {listUsers.map((item, index) => {
                                        return (
                                            <tr key={`user-${index}`}>
                                                <td>{index + 1}</td>
                                                <td>{item.id}</td>
                                                <td>{item.email}</td>
                                                <td>{item.username}</td>
                                                <td>
                                                    {item.Group
                                                        ? item.Group.name
                                                        : ""}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </>
                            ) : (
                                <>
                                    <tr>
                                        <td>Not Found Users</td>
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="user-footer">footer</div>
            </div>
        </div>
    );
};
export default Users;
