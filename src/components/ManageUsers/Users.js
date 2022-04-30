import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { deleteUser, fetchAllUser } from "../../services/userServices";
import ModalDelete from "./ModalDelete.js";
import ModalUser from "./ModalUser";
import "./Users.scss";
const Users = () => {
    const [listUsers, setListUsers] = useState([]);
    //🔥 Set state for ReactPaginate
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(6);
    const [totalPages, setTotalPages] = useState(0);
    //🔥 Check show for model delete
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataModalDelete, setDataModalDelete] = useState({}); // User is deleted
    //🔥 Check show for model user
    const [isShowModalUser, setIsShowModalUser] = useState(false);
    const [dataModalUser, setDataModalUser] = useState({}); // User data to update
    //🔥 Action to know that when we're need update or create new user
    const [actionModalUser, setActionModalUser] = useState("CREATE");
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
    const handleDeleteUser = async user => {
        setDataModalDelete(user);
        setIsShowModalDelete(true); //🔥 Open modal delete
    };
    const handleCloseModelDelete = () => {
        setIsShowModalDelete(false); //🔥 Close modal delete
        setDataModalDelete({});
    };
    const confirmDeleteUser = async () => {
        let res = await deleteUser(dataModalDelete);
        if (res && res.errorCode === 0) {
            toast.success(res.errorMessage);
            await fetchUsers(); //🔥 After delete user , call this function to fetch new data
            setIsShowModalDelete(false);
        } else {
            toast.error(res.errorMessage);
        }
    };
    const onHideModalUser = async () => {
        setDataModalUser({});
        setIsShowModalUser(false);
        await fetchUsers(); //🔥 After create new user close model will re-fetch data
    };
    const onShowCreateUserModal = () => {
        setActionModalUser("CREATE");
        setIsShowModalUser(true);
    };
    const handleEditUser = user => {
        setActionModalUser("UPDATE");
        setDataModalUser(user);
        setIsShowModalUser(true); //🔥 Open modal user
    };
    const handleRefresh = async () => {
        setListUsers([]);
        await fetchUsers();
    };
    return (
        <>
            <div className="container">
                <div className="manage-users-container">
                    <div className="user-header">
                        <div className="mt-2 tabel-users">
                            <h3>Tabel Users</h3>
                        </div>
                        <div className="actions">
                            <button
                                className="btn btn-outline-success mb-3"
                                onClick={() => handleRefresh()}
                            >
                                <span>
                                    <i
                                        className="fa fa-refresh"
                                        aria-hidden="true"
                                    ></i>
                                </span>
                                <span className="ms-1">Refesh</span>
                            </button>
                            <button
                                className="btn btn-outline-info ms-3 mb-3"
                                onClick={() => onShowCreateUserModal()}
                            >
                                <span>
                                    <i
                                        className="fa fa-plus"
                                        aria-hidden="true"
                                    ></i>
                                </span>
                                <span className="ms-1"> Add new user</span>
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
                                                    {/* (currentPage - 1) * currentLimit + index + 1 */}
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
                                                        <button
                                                            title="Edit user"
                                                            className="btn btn-outline-warning"
                                                            onClick={() =>
                                                                handleEditUser(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            <i
                                                                className="fa fa-pencil edit-icon"
                                                                aria-hidden="true"
                                                            ></i>
                                                        </button>
                                                        <button
                                                            title="Delete user"
                                                            className="btn btn-outline-danger ms-4"
                                                            onClick={() =>
                                                                handleDeleteUser(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            <i
                                                                className="fa fa-trash-o delete-icon"
                                                                aria-hidden="true"
                                                            ></i>
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

            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleCloseModelDelete}
                confirmDeleteUser={confirmDeleteUser}
                dataModalDelete={dataModalDelete}
            />
            <ModalUser
                onHide={onHideModalUser}
                show={isShowModalUser}
                action={actionModalUser}
                dataModalUser={dataModalUser}
            />
        </>
    );
};
export default Users;
