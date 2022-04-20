import React, { useState, useEffect } from "react";
import { fetchAllUser } from "../../services/userServices";
import "./Users.scss";
import ReactPaginate from "react-paginate";
const Users = () => {
    const [listUsers, setListUsers] = useState([]);
    //🔥 Set state for ReactPaginate
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(3);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        fetchUsers();
    }, [currentPage]);
    const fetchUsers = async () => {
        let res = await fetchAllUser(currentPage, currentLimit);
        if (res && +res.errorCode === 0) {
            setTotalPages(res.data.totalPages);
            setListUsers(res.data.users);
        }
    };
    //🔥 ReactPaginate function
    const handlePageClick = async e => {
        //🔥 This function is created by ReactPaginate and e.selected = current page
        setCurrentPage(+e.selected + 1);
    };
    return (
        <div className="container">
            <div className="manage-users-container">
                <div className="user-header">
                    <div className="mt-2">
                        <h3>Table Users</h3>
                    </div>
                    <div className="actions">
                        <button className="btn btn-outline-success mb-3">
                            Refesh
                        </button>
                        <button className="btn btn-outline-info ms-3 mb-3">
                            Add new user
                        </button>
                    </div>
                </div>
                <div className="user-body">
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">NO</th>
                                <th scope="col">Id</th>
                                <th scope="col">Email</th>
                                <th scope="col">Username</th>
                                <th scope="col">Group</th>
                                <th scope="col" className="text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {listUsers && listUsers.length > 0 ? (
                                <>
                                    {listUsers.map((item, index) => {
                                        return (
                                            <tr key={`user-${index}`}>
                                                <td>
                                                    {(currentPage - 1) *
                                                        currentLimit +
                                                        index +
                                                        1}
                                                </td>
                                                <td>{item.id}</td>
                                                <td>{item.email}</td>
                                                <td>{item.username}</td>
                                                <td>
                                                    {item.Group
                                                        ? item.Group.name
                                                        : ""}
                                                </td>
                                                <td className="text-center">
                                                    <button className="btn btn-outline-warning">
                                                        Edit
                                                    </button>
                                                    <button className="btn btn-outline-danger ms-4">
                                                        Delete
                                                    </button>
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
                <div className="user-footer">
                    {totalPages && totalPages > 0 && (
                        <ReactPaginate
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={totalPages}
                            previousLabel="< previous"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            renderOnZeroPageCount={null}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
export default Users;
