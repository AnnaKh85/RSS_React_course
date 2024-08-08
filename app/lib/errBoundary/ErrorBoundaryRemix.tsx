import Fallback from "./Fallback";
import {useRouteError, isRouteErrorResponse} from "@remix-run/react";
import React, {PropsWithChildren} from "react";




const ErrorBoundaryRemix: React.FC<PropsWithChildren> = (props) => {
    const error = useRouteError();


    if (isRouteErrorResponse(error)) {
        console.error('ErrorBoundary caught an error 12312312', error);
    }


    if (error) {
        console.error('ErrorBoundary caught an error', error);
        return <Fallback />;
    } else {
        return <>{props.children}</>;
    }

    // console.error('ErrorBoundary caught an error', error);

    // return <Fallback />;
}

export default ErrorBoundaryRemix;

