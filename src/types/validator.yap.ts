import * as yup from 'yup';



const PASSWORD_SPECIAL_CHARACTERS = /!@#$%^&*;,./;


function isFirstLetterBig(test: string): boolean {
    if (test && test.length > 0) {
        const c = test.substring(0,1);

        return c === c.toUpperCase();
    }

    return false;
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


const personSchema = yup.object().shape({
    name: yup.string()
        .min(1)
        .max(100)
        .nonNullable("name is empty")
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
        .oneOf([yup.ref("password"), ""], "Passwords are not identical"),
    gender: yup.string()
        .required(),
    acceptedTaC: yup.boolean()
        .required()
        .isTrue(),
    country: yup.string()
        .required(),
    picture: yup.object()
        .required()

});


export default personSchema;

