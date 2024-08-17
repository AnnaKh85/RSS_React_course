import React from "react";

export type ErrorOutput = {
    fieldName: string,
    text: string
}

type Props = {
    errors: ErrorOutput[]
}

export const ListErrorsForUncontrolled: React.FC<Props> = ({errors}) => {

    function getList(err: ErrorOutput[]) {
        return err.map(e => <li key={e.fieldName + "-" + e.text}>{e.text}</li>);
    }

    return (
        <div>
            <ul className={"validation-block"}>
                {getList(errors)}
            </ul>
        </div>
    );
}