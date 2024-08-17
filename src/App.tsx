import './App.css'
import {Details} from "./views/details/Details";
import {NavLink} from "react-router-dom";

function App() {

  return (
    <>
        <div id="sidebar">
            <h2>Ссылки
                <NavLink to={"/about"} style={{fontWeight: "lighter"}}>&nbsp;?&nbsp;</NavLink>
            </h2>
            <nav>
                <ol>
                    <li>
                        <NavLink to={"/uncontrolled.components.form"}>Uncontrolled components</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/react.hook.forms.components.form"}>React Hook Forms</NavLink>
                    </li>
                </ol>
            </nav>
        </div>
        <div id="detail">
            <Details />
        </div>
    </>
  )
}

export default App
