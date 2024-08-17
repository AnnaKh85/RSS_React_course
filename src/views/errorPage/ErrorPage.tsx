import {useRouteError, isRouteErrorResponse} from "react-router";


export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    let errorMessage: string;

    if (isRouteErrorResponse(error)) {
        // error is type `ErrorResponse`
        errorMessage = error.data?.message || error.statusText;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    } else {
        console.error(error);
        errorMessage = 'Unknown error';
    }

    return (
        <div id="error-page">
            <h1>Ошибка</h1>
            <p>Произошла ошибка работы приложения</p>
            <p>
                <i>{errorMessage}</i>
            </p>
        </div>
    );
}
