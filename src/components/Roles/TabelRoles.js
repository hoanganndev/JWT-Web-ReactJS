import _ from "lodash";
import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import {
    deteteRole,
    fetchAllRoles,
    updateCurrentRole,
} from "../../services/roleService";

const TabelRoles = forwardRef((props, ref) => {
    const [listRoles, setListRoles] = useState([]);
    const [editRole, setEditRole] = useState({});
    //! Set state for ReactPaginate
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(3);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchRoles();
    }, [currentPage]);
    const fetchRoles = async () => {
        let res = await fetchAllRoles(currentPage, currentLimit);
        if (res && +res.errorCode === 0) {
            setTotalPages(res.data.totalPages);
            setListRoles(res.data.roles);
        }
    };
    useImperativeHandle(ref, () => ({
        reFreshListRoles() {
            fetchRoles();
        },
    }));
    const handleDeleteRole = async role => {
        let res = await deteteRole(role);
        if (res && +res.errorCode === 0) {
            toast.success(res.errorMessage);
            await fetchRoles();
        } else {
            toast.error(res.errorMessage);
        }
    };
    //!ReactPaginate function
    const handlePageClick = async e => {
        setCurrentPage(+e.selected + 1);
    };
    const isEmptyObject = Object.keys(editRole).length === 0;
    const handleOnchangeEditRole = (key, value) => {
        let _editRole = _.cloneDeep(editRole);
        _editRole[key] = value;
        setEditRole(_editRole);
    };
    const handleEditRole = async role => {
        let _editRole = _.cloneDeep(editRole);
        let _listRoles = _.cloneDeep(listRoles);
        let isEmptyObject = Object.keys(editRole).length === 0;
        //!Save
        if (isEmptyObject === false && _editRole.id === role.id) {
            let objectIndex = _listRoles.findIndex(item => item.id === role.id);
            _listRoles[objectIndex] = _editRole;
            let res = await updateCurrentRole(_editRole);
            if (res && res.errorCode === 0) {
                toast.success(res.errorMessage);
                setListRoles(_listRoles);
                setEditRole({});
            }
        } else {
            setEditRole(role);
        }
    };
    return (
        <>
            <table className="table table-hover table-bordered mt-3">
                <thead>
                    <tr>
                        <th scope="col">NO</th>
                        <th scope="col">Id</th>
                        <th scope="col">URL</th>
                        <th scope="col">Description</th>
                        <th scope="col" className="text-center">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {listRoles && listRoles.length > 0 ? (
                        <>
                            {listRoles.map((role, index) => {
                                return (
                                    <tr key={`role-${index}`}>
                                        <td>
                                            {(currentPage - 1) * currentLimit +
                                                index +
                                                1}
                                        </td>
                                        <td>{role.id}</td>
                                        {isEmptyObject === true ? (
                                            <>
                                                <td>{role.url}</td>
                                                <td>{role.description}</td>
                                            </>
                                        ) : (
                                            <>
                                                {editRole.id === role.id ? (
                                                    <>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                className="form-control col-auto"
                                                                placeholder={
                                                                    role.url
                                                                }
                                                                onChange={e =>
                                                                    handleOnchangeEditRole(
                                                                        "url",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                className="form-control col-auto "
                                                                placeholder={
                                                                    role.description
                                                                }
                                                                onChange={e =>
                                                                    handleOnchangeEditRole(
                                                                        "description",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </td>
                                                    </>
                                                ) : (
                                                    <>
                                                        {" "}
                                                        <td>{role.url}</td>
                                                        <td>
                                                            {role.description}
                                                        </td>
                                                    </>
                                                )}
                                            </>
                                        )}

                                        <td className="text-center">
                                            <span
                                                title={
                                                    isEmptyObject === false
                                                        ? "Save"
                                                        : "Edit"
                                                }
                                                className="edit"
                                                onClick={() =>
                                                    handleEditRole(role)
                                                }
                                            >
                                                {isEmptyObject === false &&
                                                editRole.id === role.id ? (
                                                    <i
                                                        className="fa fa-floppy-o save"
                                                        aria-hidden="true"
                                                    ></i>
                                                ) : (
                                                    <i
                                                        className="fa fa-pencil"
                                                        aria-hidden="true"
                                                    ></i>
                                                )}
                                            </span>
                                            <span
                                                title="Delete"
                                                className="delete ms-4"
                                                onClick={() =>
                                                    handleDeleteRole(role)
                                                }
                                            >
                                                <i className="fa fa-trash-o"></i>
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </>
                    ) : (
                        <>
                            <tr>
                                <td colSpan={5}>Not Found Roles</td>
                            </tr>
                        </>
                    )}
                </tbody>
            </table>
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
        </>
    );
});

export default TabelRoles;
