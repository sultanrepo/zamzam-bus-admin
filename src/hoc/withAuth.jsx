import React, { Suspense } from "react";
import { isAuthenticated } from "../utils/auth";
import { Navigate } from "react-router-dom";


const withAuth = (Component) => {
    return (props) => {
        if (!isAuthenticated()) {
            return <Navigate to='/login' replace />
        }
        return (
            <Suspense fallback={<div className="pt-3 text-center">Loading...</div>}>
                <Component {...props} />
            </Suspense>
        )
    };
};

export default withAuth;