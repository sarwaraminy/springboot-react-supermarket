import React from "react";
import { useLogout } from "./useLogout";

export const LogoutButton = () => {
    const logout = useLogout();

    return(
        <button className="btn btn-dark btn-block" onClick={logout}>Logout</button>
    );
};