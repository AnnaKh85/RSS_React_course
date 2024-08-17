import React, {useEffect, useState} from "react";
import {useForm, Controller} from "react-hook-form";
import {useNavigate} from "react-router";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {PASSW_HELP} from "../../types/validation.const";
import {yupResolver} from "@hookform/resolvers/yup";
import personSchema from "../../types/validator.yap";
import {YesNo, parseYesNo, Picture, Person} from "../../types/main_types";
import {toBase64} from "../../utils/convert";
import {insertPerson} from "../../store/parts/personsSlice";
import {nextSeq} from "../../store/parts/personsSeqSlice";


export const ReactHookFormsForm: React.FC = () => {
    const navigate = useNavigate();

    const {register, trigger, formState: {errors, isValid}, getValues, setValue, control } = useForm({
        resolver: yupResolver(personSchema),
        defaultValues: {
            password: "1!qQ",
            passwordRepeat: "1!qQ",
            acceptedTaC: YesNo.N
        },
        mode: "onChange"
    });

    const genders = useAppSelector(state => state.genders);
    const counties = useAppSelector(state => state.countries);
    const personSeq = useAppSelector(state => state.personSeq);

    const dispatch = useAppDispatch();



    function renderGenderSelector(): React.ReactNode {
        const opt = genders.list.map(({key, value}, index) =>
            <option key={index} value={key}>{value}</option>
        );

        return (
            <select {...register("gender")} id="r.h.f.gender">
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
            <select {...register("country")}  id="r.h.f.country">
                <option value={""}/>
                {opt}
            </select>
        );
    }



    function submitHandle() {
        trigger().then(function() {

            if (isValid) {
                const values = getValues();
                addPerson(values);
                navigate("..", {relative: "route"});
            }

        }, function(err) {
            console.log(err);
        });

    }


    async function extractFileName(e: {target?: {files: File[], value?: ""}}): Promise<Picture> {
        const selectedFiles = e.target?.files;
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
            selectedPictureName = e.target?.value;
        }

        return {
            name: selectedPictureName ?? "",
            data: selectedPicture ?? "",
            size: selectedSize ?? 0,
            rawFile: undefined
        };
    }


    function addPerson(pers: Person) {
        dispatch(nextSeq());

        pers.id = personSeq.value;
        pers.createdType = true;

        dispatch(insertPerson(pers));
    }



    function cancelHandle() {
        navigate("..", {relative: "route"});
    }


    useEffect(function() {
        trigger();
    }, []);

    const[fakeChangeFileValue, setFakeChangeFileValue] = useState<boolean>(false);
    useEffect(function() {
        trigger();
    }, [fakeChangeFileValue]);




    return (
        <div>
            <form className={"form-box"}>
                <label htmlFor="r.h.f.name">
                    name
                    <p className={"validation-block"}>{errors.name?.message}</p>
                </label>
                <input {...register("name")} id="r.h.f.name" />
                <label htmlFor="r.h.f.age">
                    age
                    <p className={"validation-block"}>{errors.age?.message}</p>
                </label>
                <input type="number" {...register("age")} id="r.h.f.age" />
                <label htmlFor="r.h.f.email">
                    email
                    <p className={"validation-block"}>{errors.email?.message}</p>
                </label>
                <input {...register("email")} id="r.h.f.email" />
                <label htmlFor="r.h.f.pass1">
                    password
                    <p className={"validation-block"}>{errors.password?.message}</p>
                </label>
                <input type="password" {...register("password")} title={PASSW_HELP} placeholder={PASSW_HELP} id="r.h.f.pass1" />
                <label htmlFor="r.h.f.pass2">
                    password repeat
                    <p className={"validation-block"}>{errors.passwordRepeat?.message}</p>
                </label>
                <input type="password" {...register("passwordRepeat")} title={PASSW_HELP} placeholder={PASSW_HELP} id="r.h.f.pass2" />
                <label htmlFor="r.h.f.gender">
                    gender
                    <p className={"validation-block"}>{errors.gender?.message}</p>
                </label>
                {renderGenderSelector()}
                <label>
                    Accept Terms and Conditions agreement
                    <p className={"validation-block"}>{errors.acceptedTaC?.message}</p>
                </label>
                <Controller name="acceptedTaC"
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <input type="checkbox"
                                       className={"checkbox-custom"}
                                       value={value}
                                       onChange={e => {
                                           onChange(parseYesNo(e.target.checked));
                                       }}
                                />
                            )}
                />
                <label>
                    Upload picture
                    <p className={"validation-block"}>{errors.picture?.name?.message}</p>
                    <p className={"validation-block"}>{errors.picture?.size?.message}</p>
                    <p className={"validation-block"}>{errors.picture?.root?.message}</p>
                </label>

                <input type="hidden" {...register("picture.name")} />
                <input type="hidden" {...register("picture.data")} />
                <input type="hidden" {...register("picture.size")} />
                <input type="file" accept=".png,.jpeg,.jpg"
                    {...register("picture.rawFile", {
                        onChange: e => {
                            extractFileName(e).then(function(data: Picture) {
                                setValue("picture.name", data.name);
                                setValue("picture.data", data.data);
                                setValue("picture.size", data.size);

                                setFakeChangeFileValue((v) => !v);
                            })
                        }
                    })}
                />
                <label htmlFor="r.h.f.country">
                    country
                    <p className={"validation-block"}>{errors.country?.message}</p>
                </label>
                {renderCountrySelector()}
            </form>
            <div>
                <button type="button" style={{width: "120px"}} onClick={submitHandle}>Submit</button>
                &nbsp;
                <button type="button" style={{width: "120px"}} onClick={cancelHandle}>Cancel</button>
            </div>
        </div>
    );
}