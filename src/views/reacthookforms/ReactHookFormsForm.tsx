import React from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {PASSW_HELP} from "../../types/validation.const";
import {yupResolver} from "@hookform/resolvers/yup";
import personSchema from "../../types/validator.yap";


export const ReactHookFormsForm: React.FC = () => {
    const navigate = useNavigate();

    const {register, trigger, formState: {errors}} = useForm({resolver: yupResolver(personSchema)});

    const genders = useAppSelector(state => state.genders);
    const counties = useAppSelector(state => state.countries);
    const personSeq = useAppSelector(state => state.personSeq);

    const dispatch = useAppDispatch();



    function renderGenderSelector(): React.ReactNode {
        const opt = genders.list.map(({key, value}, index) =>
            <option key={index} value={key}>{value}</option>
        );

        return (
            <select {...register("gender")}>
                <option value={""}/>
                {opt}
            </select>
        );
    }

    function renderCountrySelector(): React.ReactNode {
        const opt = counties.list.map(({key, value}, index) =>
            <option key={index} value={key}>{value}</option>
        );

        return (
            <select {...register("country")}>
                <option value={""}/>
                {opt}
            </select>
        );
    }




    function submitHandle() {
        trigger().then(function(data) {
            console.log(data);
        }, function(err) {
            console.log(err);
        });


        // handleSubmit(function(data) {
        //     console.log(data);
        //
        // }, function(err) {
        //     console.log(err);
        //
        // });

    /*    const selectedFiles = inputPictureRef.current?.files;
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
            age: inputAgeRef.current?.value!,
            email: inputEmailRef.current?.value!,
            password: inputPassRef.current?.value!,
            passwordRepeat: inputPass2Ref.current?.value!,
            gender: inputGenderRef.current?.value!,
            acceptedTaC: inputTaCRef.current?.checked!,
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
        });*/
    }



    function cancelHandle() {
        navigate("..", {relative: "route"});
    }

    return (
        <div>
            <form className={"form-box"}>
                <label>
                    name
                </label>
                <input {...register("name")} />
                <label>
                    age
                </label>
                <input type="number" {...register("age")} />
                <label>
                    email
                </label>
                <input {...register("email")} />
                <p>{errors.email?.message}</p>
                <label>
                    password
                </label>
                <input type="password" {...register("password")} title={PASSW_HELP} placeholder={PASSW_HELP} />
                <label>
                    password repeat
                </label>
                <input type="password" {...register("passwordRepeat")} title={PASSW_HELP} placeholder={PASSW_HELP} />
                <label>
                    gender
                </label>
                {renderGenderSelector()}
                <label>
                    Accept Terms and Conditions agreement
                </label>
                <input type="checkbox" className={"checkbox-custom"} {...register("acceptedTaC")} />
                <label>
                    Upload picture
                </label>
                <input type="file" accept=".png,.jpeg,.jpg" {...register("picture.rawFile")} />
                <label>
                    country
                </label>
                {renderCountrySelector()}
            </form>
            <div>
                <button type="button" style={{width: "120px"}} onClick={submitHandle}>Submit</button>
                <button type="button" style={{width: "120px"}} onClick={cancelHandle}>Cancel</button>
            </div>
        </div>
    );
}