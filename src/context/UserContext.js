import React, { useEffect, useState } from "react";
import { getUserAccount } from "../services/userServices";
const UserContext = React.createContext(null);
function UserProvider({ children }) {
    //! account: {groupWithRoles, email, username}
    const dataUserDefault = {
        isLoading: true,
        isAuthenticated: false,
        token: "",
        account: {},
    };
    const [user, setUser] = useState(dataUserDefault);
    const loginContext = userData => {
        //! this function is called in file Login.js
        setUser({ ...userData, isLoading: false });
    };
    const logoutContext = () => {
        setUser({ ...dataUserDefault, isLoading: false });
    };
    const fetchUser = async () => {
        //! when the error, will be automatically run to a interceptor axios
        let res = await getUserAccount();
        if (res && res.errorCode === 0) {
            let { groupWithRoles, email, username } = res.data;
            let token = res.data.access_token;
            let data = {
                isLoading: false,
                isAuthenticated: true,
                token,
                account: { groupWithRoles, email, username },
            };
            setUser(data);
        } else {
            setUser({ ...dataUserDefault, isLoading: false });
        }
    };
    useEffect(() => {
        //! check when path === home or login => never get account
        if (
            window.location.pathname !== "/" &&
            window.location.pathname !== "/login"
        ) {
            fetchUser();
        } else {
            //! when path=/login => fetchUser don't run =>  isLoading: true
            setUser({ ...user, isLoading: false });
        }
    }, []);
    return (
        <UserContext.Provider value={{ user, loginContext, logoutContext }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserProvider, UserContext };
/**
 *TODO: UserProvider is wrapped outside component app
 *TODO: UserContext is used to get value global in context
 *? EX: const { user } = React.useContext(UserContext);
 */
