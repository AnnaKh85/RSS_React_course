import React from "react";
import {useAppSelector} from "../../store/hooks";
import {Person, Gender} from "../../types/main_types";


export const Details: React.FC = () => {
    const persons = useAppSelector(state => state.persons.list);
    const genders = useAppSelector(state => state.genders);
    const counties = useAppSelector(state => state.countries);


    function getCountryName(code: string) {
        for (let i = 0; i < counties.list.length; i++) {
            if (counties.list[i].key === code) {
                return `${counties.list[i].value}[${code}]`;
            }
        }

        return `[${code}]`;
    }

    function getGenderName(g: Gender | undefined) {
        if (typeof g === undefined) return "";

        for (let i = 0; i < genders.list.length; i++) {
            if (genders.list[i].key == g) {
                return `${genders.list[i].value}`;
            }
        }

        return "";
    }


    function renderPersons(list: Person[]) {
        let maxId = 0;
        list.forEach((p) => {
            if (p.id ?? 0 > maxId) {
                maxId = p.id ?? 0;
            }
        });

        const sortedList = [...list];

        sortedList.sort((a, b) => {
            const t1 = a.id ?? 0;
            const t2 = b.id ?? 0;

            if (t2 > t1) return 1;
            if (t2 == t1) return 0;
            return -1;
        });

        return sortedList.map(p => {
            const style = maxId === p.id ? {"fontWeight": "bolder", "backgroundColor": "#78C8F5FF"} : {};

            return (
                <tr style={style} key={`TR-ID=${p.id}`}>
                    <td><span style={{"fontWeight": "bold"}}>
                        {p.createdType ? "C" : "U"}
                    </span></td>
                    <td>
                        {p.name}:
                        <span style={{"fontWeight": "lighter"}}>{p.email}</span>
                    </td>
                    <td>{p.age}</td>
                    <td>{getGenderName(p.gender)}</td>
                    <td>{getCountryName(p.country)}</td>
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
        <table style={{"width": "1024px", "maxWidth": "1200px", "overflow": "auto"}}>
            <thead>
            <tr>
                <th>Ctrlled</th>
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

