import React from "react";
import {useAppSelector} from "../../store/hooks";
import {Person} from "../../types/main_types";


export const Details: React.FC = () => {
    const persons = useAppSelector(state => state.persons.list);


    function renderPersons(list: Person[]) {
        let maxId = 0;
        list.forEach((p) => {
            if (p.id > maxId) {
                maxId = p.id;
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
                    <td>
                        <img alt="No picture" src={`${p.picture.data}`} width="100px" height="100px" style={{"borderWidth": "3px", "borderColor": "blue", "borderStyle": "solid"}} />
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

