import {Link, redirect} from "@remix-run/react";


export const loader = async () => {
    return redirect("/pages/1");
};


export default function Index() {
    return (
        <p id="index-page">
            <Link to={"/pages/1"} relative="route">
                К работе
            </Link>
        </p>
    );
}


