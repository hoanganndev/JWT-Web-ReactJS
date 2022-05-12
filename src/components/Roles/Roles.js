import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import "./Roles.scss";
import { createRoles } from "../../services/roleService";
import { toast } from "react-toastify";
import TabelRoles from "./TabelRoles";
const Roles = () => {
    const childRef = useRef();
    let dataChildDefault = { url: "", description: "", isValidUrl: true };
    let childDefault = {
        child_1: dataChildDefault,
    };
    const [listChilds, setListChilds] = useState(childDefault);
    useEffect(() => {}, []);
    const handleOnChangeInput = (name, value, key) => {
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[key][name] = value;
        if (value && name === "url") {
            _listChilds[key]["isValidUrl"] = true;
        }
        setListChilds(_listChilds);
    };
    const handleAddNewInput = () => {
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[`child_${uuidv4()}`] = dataChildDefault;
        setListChilds(_listChilds);
    };
    const handleDeleteInput = key => {
        let _listChilds = _.cloneDeep(listChilds);
        delete _listChilds[key]; //! Method delete key in js
        console.log(_listChilds);
        setListChilds(_listChilds);
    };
    const buildDataToPersist = () => {
        let _listChilds = _.cloneDeep(listChilds);
        let resultData = [];
        Object.entries(_listChilds).map(([key, child], index) => {
            resultData.push({
                url: child.url,
                description: child.description,
            });
        });
        return resultData;
    };
    const handleSave = async () => {
        let invalidObject = Object.entries(listChilds).find(
            ([key, child], index) => {
                return child && !child.url; //! return child with url = null
            }
        );
        if (!invalidObject) {
            let data = buildDataToPersist();
            let res = await createRoles(data);
            if (res && res.errorCode === 0) {
                toast.success(res.errorMessage);
                setListChilds(childDefault);
                childRef.current.reFreshListRoles();
            } else {
                toast.error(res.errorMessage);
            }
        } else {
            let _listChilds = _.cloneDeep(listChilds);
            const key = invalidObject[0];
            _listChilds[key]["isValidUrl"] = false;
            setListChilds(_listChilds);
        }
    };

    return (
        <div className="role-container">
            <div className="container">
                <div className="add-roles mt-2">
                    <div className="title-role">
                        <h3>Add new roles</h3>
                    </div>
                    <div className="role-parent">
                        {Object.entries(listChilds).map(
                            ([key, child], index) => {
                                return (
                                    <div
                                        className={`row role-child ${key}`}
                                        key={`child-${key}`}
                                    >
                                        <div className="col-5 form-group">
                                            <label
                                                className="form-label"
                                                htmlFor="url-input"
                                            >
                                                URL:
                                            </label>
                                            <input
                                                type="text"
                                                id="url-input"
                                                className={
                                                    child.isValidUrl
                                                        ? "form-control "
                                                        : "form-control is-invalid"
                                                }
                                                value={child.url}
                                                onChange={e =>
                                                    handleOnChangeInput(
                                                        "url",
                                                        e.target.value,
                                                        key
                                                    )
                                                }
                                            />
                                            {child.isValidUrl === false ? (
                                                <>
                                                    <div className="invalid-feedback">
                                                        Input URL must not be
                                                        empty.
                                                    </div>
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                        <div className="col-5  form-group">
                                            <label
                                                className="form-label"
                                                htmlFor="description-input"
                                            >
                                                Description:
                                            </label>
                                            <input
                                                type="text"
                                                id="description-input"
                                                className="form-control"
                                                value={child.description}
                                                onChange={e =>
                                                    handleOnChangeInput(
                                                        "description",
                                                        e.target.value,
                                                        key
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="col-2 mt-4 actions d-flex ">
                                            <span>
                                                <i
                                                    title="Add new input role"
                                                    className="fa fa-angle-double-down add"
                                                    aria-hidden="true"
                                                    onClick={() =>
                                                        handleAddNewInput()
                                                    }
                                                ></i>
                                            </span>
                                            {index >= 1 && (
                                                <span>
                                                    {" "}
                                                    <i
                                                        title="Remove a input role"
                                                        className="fa fa-minus-square-o delete ms-2 ms-md-3"
                                                        aria-hidden="true"
                                                        onClick={() =>
                                                            handleDeleteInput(
                                                                key
                                                            )
                                                        }
                                                    ></i>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            }
                        )}

                        <div
                            className="btn btn-outline-warning mt-3"
                            onClick={() => handleSave()}
                        >
                            Save
                        </div>
                    </div>
                </div>
                <hr />
                <div className="tabel-role mt-3">
                    <h3>List current roles:</h3>
                    <div className="table-responsive">
                        <TabelRoles ref={childRef} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Roles;
