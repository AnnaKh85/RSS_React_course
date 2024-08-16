export type Person = {
    id?: number,
    name: string,
    age: number,
    email: string,
    password: string,
    passwordRepeat: string,
    gender?: Gender,
    acceptedTaC: YesNo,
    picture: Picture,
    country: string,
    createdType?: boolean //true = created from React Forms, false = from uncontrolled
}

export enum Gender {
    M = "M", F = "F"
}

export enum YesNo {
    Y = "Y", N = "N"
}

export type Picture = {
    name: string,
    data: string,
    size: number,
    rawFile?: File
}


export type SubmitResult = {
    ok: boolean,
    text: string
}


export function parseGender(text: string): Gender | undefined {
    if (!text) return undefined;
    if (Gender.F == text) return Gender.F;
    return Gender.M;
}

