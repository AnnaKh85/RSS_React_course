import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {RouterProvider} from "react-router";
import {createBrowserRouter} from "react-router-dom";
import ErrorPage from "./views/errorPage/ErrorPage";
import {UncontrolledForm} from "./views/uncontrolled/UncontrolledForm";
import {Provider} from "react-redux";
import {store} from "./store/store";



const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />
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
        path: "/react.hook.form.components.form",
        element: <UncontrolledForm />
    }
]);


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>,
)


