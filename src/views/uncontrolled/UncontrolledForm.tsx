import React, {useRef, RefObject, useState} from "react";
import {useAppSelector, useAppDispatch} from "../../store/hooks";
import {Person, YesNo, parseGender} from "../../types/main_types";
import personSchema from "../../types/validator.yap";
import {toBase64} from "../../utils/convert";
import {insertPerson} from "../../store/parts/personsSlice";
import {useNavigate} from "react-router";
import {nextSeq} from "../../store/parts/personsSeqSlice";
import {ListErrorsForUncontrolled, ErrorOutput} from "./ListErrorsForUncontrolled";
import {ValidationError} from "yup";
import {PASSW_HELP} from "../../types/validation.const";

export const UncontrolledForm: React.FC = () => {
    const navigate = useNavigate();


    const genders = useAppSelector(state => state.genders);
    const counties = useAppSelector(state => state.countries);
    const personSeq = useAppSelector(state => state.personSeq);

    const dispatch = useAppDispatch();


    const inputNameRef = useRef<HTMLInputElement>(null);
    const inputAgeRef = useRef<HTMLInputElement>(null);
    const inputEmailRef = useRef<HTMLInputElement>(null);
    const inputPassRef = useRef<HTMLInputElement>(null);
    const inputPass2Ref = useRef<HTMLInputElement>(null);
    const inputGenderRef = useRef<HTMLSelectElement>(null);
    const inputCountryRef = useRef<HTMLSelectElement>(null);
    const inputPictureRef = useRef<HTMLInputElement>(null);
    const inputTaCRef = useRef<HTMLInputElement>(null);


    const [checkErrors, setCheckErrors] = useState<ErrorOutput[]>([]);



    function renderGenderSelector(inputGenderRef: RefObject<HTMLSelectElement>): React.ReactNode {
        const opt = genders.list.map(({key, value}, index) =>
            <option key={index} value={key}>{value}</option>
        );

        return (
            <select ref={inputGenderRef}>
                <option value={""}/>
                {opt}
            </select>
        );
    }

    function renderCountrySelector(inputCountryRef: RefObject<HTMLSelectElement>): React.ReactNode {
        const opt = counties.list.map(({key, value}, index) =>
            <option key={index} value={key}>{value}</option>
        );

        return (
            <select ref={inputCountryRef}>
                <option value={""}/>
                {opt}
            </select>
        );
    }


    function renderErrors(err?: ValidationError) {
        if (err && err.inner && err.inner.length) {
            const res: ErrorOutput[] = [];

            err.inner.forEach(i => {
                let allErrorsInString = "";

                if (i.errors && i.errors.length) {
                    i.errors.forEach(e => allErrorsInString += e + ";");
                }

                if (allErrorsInString.length > 0) {
                    res.push({
                        fieldName: i.path ?? "",
                        text: allErrorsInString
                    })
                }
            })

            setCheckErrors(res);
        } else {
            setCheckErrors([]);
        }
    }


    async function submitHandle() {
        const selectedFiles = inputPictureRef.current?.files;
        let selectedPicture;
        let selectedPictureName;
        let selectedSize;


        if (selectedFiles && selectedFiles.length > 0) {
            const file: File = selectedFiles[0];
            selectedSize = file.size;

            await toBase64(file)
                .then(
                    (data) => selectedPicture = data,
                    (err) => alert("Error converting file:" + err)
                );
            selectedPictureName = inputPictureRef.current?.value;
        }


        dispatch(nextSeq());

        const pers: Person = {
            id: personSeq.value,
            name: inputNameRef.current?.value!,
            age: inputAgeRef.current?.valueAsNumber!,
            email: inputEmailRef.current?.value!,
            password: inputPassRef.current?.value!,
            passwordRepeat: inputPass2Ref.current?.value!,
            gender: parseGender(inputGenderRef.current?.value!),
            acceptedTaC: inputTaCRef.current?.checked! ? YesNo.Y : YesNo.N,
            picture: {
                name: selectedPictureName ?? "",
                data: selectedPicture ?? "",
                size: selectedSize ?? 0
            },
            country: inputCountryRef.current?.value!,
            createdType: false
        };

        personSchema.validate(pers, {abortEarly: false, stripUnknown: true}).then(function(data) {
            console.log(data);
            renderErrors(undefined);

            dispatch(insertPerson(data));

            navigate("..", {relative: "route"});
        }, function(err: ValidationError) {
            console.log(err);
            renderErrors(err);
        });
    }


    function cancelHandle() {
        navigate("..", {relative: "route"});
    }


    return (
        <div>
            {checkErrors.length > 0 && <ListErrorsForUncontrolled errors={checkErrors} />}
            <form className={"form-box"}>
                <label>
                    name
                </label>
                <input type="text" ref={inputNameRef} />
                <label>
                    age
                </label>
                <input type="number" ref={inputAgeRef} value="2" />
                <label>
                    email
                </label>
                <input type="text" ref={inputEmailRef} value="1@2.ru" />
                <label>
                    password
                </label>
                <input type="password" value="1!qQ" ref={inputPassRef} title={PASSW_HELP} placeholder={PASSW_HELP} />
                <label>
                    password repeat
                </label>
                <input type="password" value="1!qQ" ref={inputPass2Ref} title={PASSW_HELP} placeholder={PASSW_HELP} />
                <label>
                    gender
                </label>
                {renderGenderSelector(inputGenderRef)}
                <label>
                    Accept Terms and Conditions agreement
                </label>
                <input type="checkbox" className={"checkbox-custom"} ref={inputTaCRef} />
                <label>
                    Upload picture
                </label>
                <input type="file" accept=".png,.jpeg,.jpg" ref={inputPictureRef} />
                <label>
                    country
                </label>
                {renderCountrySelector(inputCountryRef)}
            </form>
            <div>
                <button type="button" style={{width: "120px"}} onClick={submitHandle}>Submit</button>
                <button type="button" style={{width: "120px"}} onClick={cancelHandle}>Cancel</button>
            </div>
        </div>
    );
}


