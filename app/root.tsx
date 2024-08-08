import {Meta, Links, ScrollRestoration, Scripts, useRouteError, isRouteErrorResponse} from "@remix-run/react";
import {MetaFunction} from "@remix-run/node";
import {Outlet} from "react-router-dom";
import {ThemeProvider} from "./lib/context/ThemeContext";


export const meta: MetaFunction = () => {
    return [
        {title: "Remix.js. Проба в1.0"}
    ];
}


export function ErrorBoundary() {
    const error = useRouteError();


    if (isRouteErrorResponse(error)) {
        console.error('ErrorBoundary caught an error', error);
    }


    // if (error) {
    //     console.error('ErrorBoundary caught an error', error);
    //     return <Fallback />;
    // } else {
    //     return <>{props.children}</>;
    // }

    // console.error('ErrorBoundary caught an error', error);

    // return <Fallback />;
}



export default function App() {

    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <Meta/>
            <Links/>
        </head>

        <ThemeProvider>
            <body>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
            </body>
        </ThemeProvider>
        </html>
    );
}

