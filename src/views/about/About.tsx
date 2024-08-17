import React from "react";
import {useNavigate} from "react-router";


export const About:React.FC = () => {
    const navigate = useNavigate();

    function cancelHandle() {
        navigate("..", {relative: "route"});
    }

    return (
        <div>
            <span style={{"display": "block"}}>React Forms v1 (August 2024)</span>
            <button type="button" style={{width: "220px"}} onClick={cancelHandle}>Назад в будущее</button>
        </div>
    );
}

