import * as yup from 'yup';
import {AnyObject} from 'yup';
import {Person, YesNo, Gender} from "./main_types";


const PASSWORD_SPECIAL_CHARACTERS = /!@#$%^&*;,./;
const FILE_SIZE = 10 * 1024 * 1024; //Megabytes


function isFirstLetterBig(test: string): boolean {
    if (test && test.length > 0) {
        const c = test.substring(0,1);

        return c === c.toUpperCase();
    }

    return true;
}

function isPasswordStrength(test: string): boolean {
    if (test && test.length > 0) {
        const p1 = /[a-zA-Z0-9]/;
        const r1 = test.match(p1);

        if (r1 && r1.length > 0) {

            const p2 = `[${PASSWORD_SPECIAL_CHARACTERS}]`;
            const r2 = test.match(p2);

            if (r2 && r2.length > 0) {
                return true;
            }
        }
    }

    return false;
}

function isFileCorrectExtension(test: AnyObject): boolean {
    if (!test || !test.name) return true;

    const extensions = ['jpg', 'png', 'jpeg'];

    const parts = test.name.split(".");
    const currentExt = (parts && parts.length) ? parts.pop()?.toLowerCase() : undefined;

    if (! currentExt) {
        return true;
    }

    return extensions.indexOf(currentExt) > -1;
}

export function isFileTooBig(test: AnyObject): boolean {
    const size = test.size;
    return FILE_SIZE >= size;
}


const personSchema = yup.object<Person>().shape({
    id: yup.number(),
    name: yup.string()
        // .min(1)
        .max(100)
        // .nonNullable("name is empty")
        .required("name is empty")
        .test("isCheckFirstBigLetter", "First letter is not capital", isFirstLetterBig),
    age: yup.number()
        .typeError("You must set age")
        .required("age is empty")
        .positive()
        .integer(),
    email: yup.string()
        .required()
        .email(),
    password: yup.string()
        .required("password is empty")
        .min(4)
        .max(100)
        .matches(/[a-zA-Z0-9]/, 'Password can only contain Latin letters.')
        .test("isPasswordStrength", "1 number, 1 uppercased letter, 1 lowercased letter, 1 special character)", isPasswordStrength),
    passwordRepeat: yup.string()
        .required()
        .oneOf([yup.ref("password"), ""], "Passwords are not identical"),
    gender: yup.mixed<Gender>()
        .required()
        .oneOf([Gender.M, Gender.F])
    ,
    acceptedTaC: yup.mixed<YesNo>()
        .required()
        .oneOf([YesNo.Y]),
    country: yup.string()
        .required(),
    picture: yup.object({
        name: yup.string().required("File not selected"),
        data: yup.string(),
        size: yup.number(),
        rawFile: yup.object()
    })
        .required()
        .test("isFileCorrectExt", "Wrong file type", isFileCorrectExtension)
        .test("isFileSizeTooBig", "Wrong file size (> 10 Mb)", isFileTooBig),
    createdType: yup.boolean()

});


export default personSchema;

