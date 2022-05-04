import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import {
    createNewUser,
    fetchGroup,
    updateCurrentUser,
} from "../../services/userServices";
const ModalUser = props => {
    const { onHide, show, action, dataModalUser } = props;
    const [userGroups, setUserGroups] = useState([]);
    const defautlUserData = {
        email: "",
        phone: "",
        username: "",
        password: "",
        address: "",
        sex: "",
        group: "",
    };
    const defaultValidInputs = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
        sex: true,
        group: true,
    };
    const [userData, setUserData] = useState(defautlUserData);
    const [validInputs, setValidInputs] = useState(defaultValidInputs);
    useEffect(() => {
        getGroups();
    }, []);
    useEffect(() => {
        if (action === "UPDATE") {
            setUserData({
                ...dataModalUser,
                group: dataModalUser.Group ? dataModalUser.Group.id : "",
            });
        }
    }, [dataModalUser]);
    useEffect(() => {
        if (action === "CREATE") {
            if (userGroups && userGroups.length > 0) {
                setUserData({ ...userData, group: userGroups[0].id });
            }
        }
    }, [action]);
    const getGroups = async () => {
        try {
            let res = await fetchGroup();
            if (res && res.errorCode === 0) {
                setUserGroups(res.data);
                if (res.data && res.data.length > 0) {
                    let groups = res.data;
                    setUserData({ ...userData, group: groups[0].id });
                }
            } else {
                toast.error(res.errorMessage);
            }
        } catch (error) {
            toast.error("😔 Something wrong when i call api !");
        }
    };
    //🔥 Function change value of form input
    const handleOnchangeInput = (value, name) => {
        let _userData = _.cloneDeep(userData);
        _userData[name] = value;
        setUserData(_userData);
    };
    //🔥 Check validate form input
    const checkValidateInputs = () => {
        //🔥 If the user updates, I don't need to check the validate Inputs
        if (action === "UPDATE") return true;
        //🔥 Check validate for create new user
        setValidInputs(defaultValidInputs);
        let arr = ["email", "phone", "password", "group"];
        let temp = true;
        let regx = /\S+@\S+\.\S+/;
        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                let _validInputs = _.cloneDeep(validInputs);
                _validInputs[arr[i]] = false;
                setValidInputs(_validInputs);
                toast.warning(`Input ${arr[i]} is not empty !`);
                temp = false;
                break;
            }
            if (userData[arr[i]] && arr[i] === "email") {
                if (!regx.test(userData[arr[i]])) {
                    let _validInputs = _.cloneDeep(validInputs);
                    _validInputs[arr[i]] = false;
                    setValidInputs(_validInputs);
                    toast.warning("Please Enter a valid email address ! 😥");
                    temp = false;
                    break;
                }
            }
        }
        return temp;
    };
    const handleConfirmUser = async () => {
        //🔥 Create or update an user
        let isValidate = checkValidateInputs(); //🔥 IF update user => check auto return true
        if (isValidate) {
            let res =
                action === "CREATE"
                    ? await createNewUser({
                          ...userData,
                          groupId: userData["group"],
                      })
                    : await updateCurrentUser({
                          ...userData,
                          groupId: userData["group"],
                      });
            if (res && res.errorCode === 0) {
                setUserData({
                    ...defautlUserData,
                    group:
                        userGroups && userGroups.length > 0
                            ? userGroups[0].id
                            : 3, //🔥 3 is a customer
                });
                onHide(); //🔥 Close modal user
                toast.success(res.errorMessage);
            }
            if (res && res.errorCode !== 0) {
                let _validInputs = _.cloneDeep(defaultValidInputs);
                _validInputs[res.data] = false; //🔥 Set error from server
                setValidInputs(_validInputs);
                toast.error(res.errorMessage);
            }
        }
    };
    const handleCloseModalUser = () => {
        onHide();
        setUserData(defautlUserData);
        setValidInputs(defaultValidInputs);
    };
    return (
        <>
            <Modal size="lg" show={show} className="modal-user">
                <Modal.Header
                    closeButton
                    onClick={() => handleCloseModalUser()}
                >
                    <Modal.Title id="contained-modal-title-vcenter">
                        <span>
                            {action === "CREATE"
                                ? "Create New User"
                                : "Edit A User"}
                        </span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content-body row">
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="input-email">
                                Email ( <span className="red-point">*</span> ) :
                            </label>
                            <input
                                disabled={action === "CREATE" ? false : true}
                                id="input-email"
                                type="email"
                                className={
                                    validInputs.email
                                        ? "form-control"
                                        : "form-control is-invalid"
                                }
                                value={userData.email}
                                onChange={e =>
                                    handleOnchangeInput(e.target.value, "email")
                                }
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="input-phone">
                                Phone number ({" "}
                                <span className="red-point">*</span> ) :
                            </label>
                            <input
                                disabled={action === "CREATE" ? false : true}
                                id="input-phone"
                                type="text"
                                className={
                                    validInputs.phone
                                        ? "form-control"
                                        : "form-control is-invalid"
                                }
                                value={userData.phone}
                                onChange={e =>
                                    handleOnchangeInput(e.target.value, "phone")
                                }
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="input-username">User name :</label>
                            <input
                                id="input-username"
                                type="text"
                                className={
                                    validInputs.username
                                        ? "form-control"
                                        : "form-control is-invalid"
                                }
                                value={userData.username}
                                onChange={e =>
                                    handleOnchangeInput(
                                        e.target.value,
                                        "username"
                                    )
                                }
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            {action === "CREATE" && (
                                <>
                                    {" "}
                                    <label htmlFor="input-password">
                                        Password ({" "}
                                        <span className="red-point">*</span> ) :
                                    </label>
                                    <input
                                        id="input-password"
                                        type="password"
                                        className={
                                            validInputs.password
                                                ? "form-control"
                                                : "form-control is-invalid"
                                        }
                                        value={userData.password}
                                        onChange={e =>
                                            handleOnchangeInput(
                                                e.target.value,
                                                "password"
                                            )
                                        }
                                    />
                                </>
                            )}
                        </div>
                        <div className="col-12  form-group">
                            <label htmlFor="input-address">Address :</label>
                            <input
                                id="input-address"
                                type="text"
                                className={
                                    validInputs.address
                                        ? "form-control"
                                        : "form-control is-invalid"
                                }
                                value={userData.address}
                                onChange={e =>
                                    handleOnchangeInput(
                                        e.target.value,
                                        "address"
                                    )
                                }
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="input-gender">Gender :</label>
                            <select
                                className="form-select"
                                id="input-gender"
                                value={userData.sex}
                                onChange={e =>
                                    handleOnchangeInput(e.target.value, "sex")
                                }
                            >
                                <option value="Male" defaultValue>
                                    Male
                                </option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="input-group">
                                Group ( <span className="red-point">*</span> ) :
                            </label>
                            <select
                                className={
                                    validInputs.group
                                        ? "form-select"
                                        : "form-select is-invalid"
                                }
                                id="input-group"
                                onChange={e =>
                                    handleOnchangeInput(e.target.value, "group")
                                }
                                value={userData.group}
                            >
                                {userGroups &&
                                    userGroups.length > 0 &&
                                    userGroups.map((item, index) => {
                                        return (
                                            <option
                                                key={`group-${index}`}
                                                value={item.id}
                                            >
                                                {item.name}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="outline-secondary"
                        onClick={() => handleCloseModalUser()}
                    >
                        Close
                    </Button>
                    <Button
                        variant="outline-primary"
                        onClick={() => handleConfirmUser()}
                    >
                        {action === "CREATE" ? "Save Changes" : "Update User"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalUser;
