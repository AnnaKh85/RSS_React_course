import React, {useRef, RefObject} from "react";
import {useAppSelector} from "../../store/hooks";
import {Person} from "../../types/main_types";
import personSchema from "../../types/validator.yap";
import {toBase64} from "../../utils/convert";

export const UncontrolledForm: React.FC = () => {
    // const [pictSrc, setPictSrc] = useState<string | undefined>(undefined);


    const genders = useAppSelector(state => state.genders);
    const counties = useAppSelector(state => state.countries);


    const inputNameRef = useRef<HTMLInputElement>(null);
    const inputAgeRef = useRef<HTMLInputElement>(null);
    const inputEmailRef = useRef<HTMLInputElement>(null);
    const inputPassRef = useRef<HTMLInputElement>(null);
    const inputPass2Ref = useRef<HTMLInputElement>(null);
    const inputGenderRef = useRef<HTMLSelectElement>(null);
    const inputCountryRef = useRef<HTMLSelectElement>(null);
    const inputPictureRef = useRef<HTMLInputElement>(null);


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




    async function submitHandle() {
        const selectedFiles = inputPictureRef.current?.files;
        let selectedPicture;
        let selectedPictureName;
        if (selectedFiles && selectedFiles.length > 0) {
                await toBase64(selectedFiles[0])
                    .then(
                        (data) => selectedPicture = data,
                        (err) => alert("Error converting file:" + err)
                    );
            selectedPictureName = inputPictureRef.current?.value;
        }


        const res: Person = {
            name: inputNameRef.current?.value!,
            age: inputAgeRef.current?.value!,
            email: inputEmailRef.current?.value!,
            password: inputPassRef.current?.value!,
            passwordRepeat: inputPass2Ref.current?.value!,
            gender: inputGenderRef.current?.value!,
            acceptedTaC: true,
            picture: {
                name: selectedPictureName ?? "",
                data: selectedPicture ?? ""
            },
            country: inputCountryRef.current?.value!

        };

        personSchema.validate(res).then(function(data) {
            console.log(data);

        }, function(err) {
            console.log(err);
        });
    }


    return (
        <div>
            <form className={"form-box"}>
                <label>
                    name
                </label>
                <input type="text" ref={inputNameRef} />
                <label>
                    age
                </label>
                <input type="number" ref={inputAgeRef} />
                <label>
                    email
                </label>
                <input type="text" ref={inputEmailRef} />
                <label>
                    password
                </label>
                <input type="password" ref={inputPassRef} title="1 number, 1 uppercased letter, 1 lowercased letter, 1 special character)" />
                <label>
                    password repeat
                </label>
                <input type="password" ref={inputPass2Ref} title="1 number, 1 uppercased letter, 1 lowercased letter, 1 special character)" />
                <label>
                    gender
                </label>
                {renderGenderSelector(inputGenderRef)}
                <label>
                    Accept Terms and Conditions agreement
                </label>
                <input type="checkbox" />
                <label>
                    Upload picture
                </label>
                <input type="file" accept=".png,.jpeg," ref={inputPictureRef} />
                {/*<img src={pictSrc}/>*/}
                <label>
                    country
                </label>
                {renderCountrySelector(inputCountryRef)}
                <button type="button" style={{width: "120px"}} onClick={submitHandle}>Submit</button>
            </form>
        </div>
    );
}


