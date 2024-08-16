import React from "react";
import {useForm, Controller} from "react-hook-form";
import {useNavigate} from "react-router";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {PASSW_HELP} from "../../types/validation.const";
import {yupResolver} from "@hookform/resolvers/yup";
import personSchema from "../../types/validator.yap";
import {YesNo, Gender, parseYesNo, Picture, Person} from "../../types/main_types";
import {toBase64} from "../../utils/convert";
import {insertPerson} from "../../store/parts/personsSlice";
import {nextSeq} from "../../store/parts/personsSeqSlice";


export const ReactHookFormsForm: React.FC = () => {
    const navigate = useNavigate();

    const {register, trigger, formState: {errors, isValid}, getValues, setValue, control } = useForm({
        resolver: yupResolver(personSchema),
        defaultValues: {
            country: "JM",
            gender: Gender.F,
            age: 3,
            email: "1@2.ru",
            password: "1!qQ",
            passwordRepeat: "1!qQ",
            acceptedTaC: YesNo.N
        }
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
            console.log(errors);

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

    return (
        <div>
            <form className={"form-box"}>
                <label>
                    name
                    <p className={"validation-block"}>{errors.name?.message}</p>
                </label>
                <input {...register("name")} />
                <label>
                    age
                    <p className={"validation-block"}>{errors.age?.message}</p>
                </label>
                <input type="number" {...register("age")} />
                <label>
                    email
                    <p className={"validation-block"}>{errors.email?.message}</p>
                </label>
                <input {...register("email")} />
                <label>
                    password
                    <p className={"validation-block"}>{errors.password?.message}</p>
                </label>
                <input type="password" {...register("password")} title={PASSW_HELP} placeholder={PASSW_HELP} />
                <label>
                    password repeat
                    <p className={"validation-block"}>{errors.passwordRepeat?.message}</p>
                </label>
                <input type="password" {...register("passwordRepeat")} title={PASSW_HELP} placeholder={PASSW_HELP} />
                <label>
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
                            })
                        }
                    })}
                />
                <label>
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