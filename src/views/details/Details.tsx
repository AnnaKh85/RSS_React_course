import React from "react";
import {useAppSelector} from "../../store/hooks";
import {Person} from "../../types/main_types";


export const Details: React.FC = () => {
    const persons = useAppSelector(state => state.persons.list);


    function renderPersons(list: Person[]) {
        let maxId = 0;
        list.forEach((p) => {
            if (p.id ?? 0 > maxId) {
                maxId = p.id ?? 0;
            }
        });

        return list.map(p => {
            const style = maxId === p.id ? {"fontWeight": "bolder"} : {};

            return (
                <tr style={style} key={`TR-ID=${p.id}`}>
                    <td>
                        {p.name}:
                        <span style={{"fontWeight": "lighter"}}>{p.email}</span>
                    </td>
                    <td>{p.age}</td>
                    <td>{p.gender}</td>
                    <td>{p.country}</td>
                    <td style={{"textAlign": "center", "width": "30%"}}>
                        <img alt="No picture"
                             src={`${p.picture.data}`}
                             width="auto"
                             height="auto"
                             style={{"borderWidth": "3px", "borderColor": "blue", "borderStyle": "solid", "maxHeight": "100px", "maxWidth": "100px"}}
                        />
                    </td>
                </tr>
            );
        });
    }


    return (
        <table style={{"width": "1024px", "overflow": "auto"}}>
            <thead>
            <tr>
                <th>name/email</th>
                <th>age</th>
                <th>gender</th>
                <th>country</th>
                <th>picture</th>
            </tr>
            </thead>
            <tbody>
            {renderPersons(persons)}
            </tbody>
        </table>
    );
}

