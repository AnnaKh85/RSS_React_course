import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {RouterProvider, Outlet} from "react-router";
import {createBrowserRouter} from "react-router-dom";
import ErrorPage from "./views/errorPage/ErrorPage";
import {UncontrolledForm} from "./views/uncontrolled/UncontrolledForm";
import {Provider} from "react-redux";
import {store} from "./store/store";
import {ReactHookFormsForm} from "./views/reacthookforms/ReactHookFormsForm";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Outlet />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <App />
            },
            {
                path: "/about",
                element: "React Forms v1 (August 2024)"
            },
            {
                path: "/uncontrolled.components.form",
                element: <UncontrolledForm />
            },
            {
                path: "/react.hook.forms.components.form",
                element: <ReactHookFormsForm />
            }

        ]
    }
]);


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>,
)


