export type Person = {
    name: string,
    age: number | string,
    email: string,
    password: string,
    passwordRepeat: string,
    gender: Gender | string,
    acceptedTaC: boolean,
    picture: Picture,
    country: string,
    createdType?: boolean //true = created from React Forms, false = from uncontrolled
}

export enum Gender {
    M = "M", F = "F"
}

export type Picture = {
    name: string,
    data: string
}


export type SubmitResult = {
    ok: boolean,
    text: string
}


export function parseGender(text: string): Gender {
    if (Gender.F == text) return Gender.F;
    return Gender.M;
}

