"use client";
import type { Page } from "@/types";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useContext, useState, useEffect } from "react";
import { LayoutContext } from "@/layout/context/layoutcontext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, TUserSchema } from "@/lib/UserSchema";
import { Calendar } from "primereact/calendar";
import { apiCall } from "@/lib/apiCallService";

interface MasterDataResponse {
    id: number,
    name: string
}

const Register: Page = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const dark = layoutConfig.colorScheme !== "light";
    const [genders, setGenders] = useState<MasterDataResponse[] | null>([]);
    const [castes, setCastes] = useState<MasterDataResponse[] | null>([]);
    const [maritalStatus, setMaritalStatus] = useState<MasterDataResponse[] | null>([]);
    const [qualifications, setQualifications] = useState<MasterDataResponse[] | null>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const genderResponseUsingAxios = await apiCall<MasterDataResponse[] | null>(
                    `http://localhost:8086/msme-profile-api-core/api/v1/master-data/genders/all`,
                    "GET",
                    null,
                    { "Accept-Language": "en-US" }
                );
                setGenders(genderResponseUsingAxios.data);
                // const genderResponse = await fetch(`http://localhost:8086/msme-profile-api-core/api/v1/master-data/genders/all`, {
                //     method: "GET",
                //     headers: {
                //         "Accept-Language": "te-IN",
                //         "Content-Type": "application/json"
                //     }
                // });
                // const genderData: (MasterDataResponse[] | null) = await genderResponse.json();
                // setGenders(genderData);

                const casteResponse = await fetch(`http://localhost:8086/msme-profile-api-core/api/v1/master-data/castes/all`, {
                    method: "GET",
                    headers: {
                        "Accept-Language": "en-US",
                        "Content-Type": "application/json"
                    }
                });
                const casteData: (MasterDataResponse[] | null) = await casteResponse.json();
                setCastes(casteData);

                const maritalStatusResonse = await fetch(`http://localhost:8086/msme-profile-api-core/api/v1/master-data/maritalstatus/all`, {
                    method: "GET",
                    headers: {
                        "Accept-Language": "en-US",
                        "Content-Type": "application/json"
                    }
                });
                const maritalStatusData: (MasterDataResponse[] | null) = await maritalStatusResonse.json();
                setMaritalStatus(maritalStatusData);

                const qualificationsResponse = await fetch(`http://localhost:8086/msme-profile-api-core/api/v1/master-data/qualifications/all`, {
                    method: "GET",
                    headers: {
                        "Accept-Language": "en-US",
                        "Content-Type": "application/json"
                    }
                });
                const qualificationsData: (MasterDataResponse[] | null) = await qualificationsResponse.json();
                setQualifications(qualificationsData);
            }
            catch(e) {
                console.log("Error fetching data");
            }
            finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<TUserSchema>({
        resolver: zodResolver(UserSchema)
    });
    const onSubmit = (data: TUserSchema) => {
        console.log(data);
    }

    return (
        <>
            {/* Background Image */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1600 800"
                className="fixed left-0 top-0 min-h-screen min-w-screen"
                preserveAspectRatio="none"
            >
                <rect
                    fill={dark ? "var(--primary-900)" : "var(--primary-500)"}
                    width="1600"
                    height="800"
                />
                <path
                    fill={dark ? "var(--primary-800)" : "var(--primary-400)"}
                    d="M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z"
                />
                <path
                    fill={dark ? "var(--primary-700)" : "var(--primary-300)"}
                    d="M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z"
                />
                <path
                    fill={dark ? "var(--primary-600)" : "var(--primary-200)"}
                    d="M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z"
                />
                <path
                    fill={dark ? "var(--primary-500)" : "var(--primary-100)"}
                    d="M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z"
                />
            </svg>
            {/* Form Component */}
            <div className="px-5 min-h-screen flex justify-content-center align-items-center">
                {loading? <i className="pi pi-spin pi-spinner text-2xl"></i> : 
                    <div className="border-1 surface-border surface-card border-round py-7 px-4 md:px-7 z-1">
                        {/* Form Title Component */}
                        <div className="mb-4">
                            <div className="text-900 text-xl font-bold mb-2">
                                Register
                            </div>
                            <span className="text-600 font-medium">
                                Let&lsquo;s get started
                            </span>
                        </div>
                        {/* Form Body Component */}
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column">
                            <span className="p-input-icon-left w-full mb-4">
                                <i className="pi pi-user"></i>
                                <InputText
                                    {...register("name")}
                                    id="name"
                                    type="text"
                                    className="w-full md:w-25rem"
                                    placeholder="Name"
                                />
                                {errors.name && (
                                    <div className="text-red-600">{errors.name.message}</div>
                                )}
                            </span>
                            <span className="p-input-icon-left w-full mb-4">
                                <i className="pi pi-envelope"></i>
                                <InputText
                                    {...register("email")}
                                    id="email"
                                    type="text"
                                    className="w-full md:w-25rem"
                                    placeholder="Email"
                                />
                                {errors.email && (
                                    <div className="text-red-600">{errors.email.message}</div>
                                )}
                            </span>
                            <span className="p-input-icon-left w-full mb-4">
                                <i className="pi pi-phone"></i>
                                <InputText
                                    {...register("mobile")}
                                    id="mobile"
                                    type="text"
                                    className="w-full md:w-25rem"
                                    placeholder="Mobile"
                                />
                                {errors.mobile && (
                                    <div className="text-red-600">{errors.mobile.message}</div>
                                )}
                            </span>
                            <span className="p-input-icon-left w-full mb-4">
                                <i className="pi pi-id-card"></i>
                                <InputText
                                    {...register("pan")}
                                    id="pan"
                                    type="text"
                                    className="w-full md:w-25rem"
                                    placeholder="PAN"
                                />
                                {errors.pan && (
                                    <div className="text-red-600">{errors.pan.message}</div>
                                )}
                            </span>
                            <span className="flex flex-column mb-4">
                                <span>Date of birth</span>
                                <Calendar
                                    showIcon
                                    showButtonBar
                                    {...register("dob")}
                                />
                            </span>
                            <span className="flex justify-content-between align-items-center w-full mb-4">
                                <span>Gender</span>
                                <select {...register("gender")}>
                                    <option value="">Choose</option>
                                    {genders && genders.length > 0 && genders.map(gender => (
                                        <option key={gender.id} value={gender.name}>{gender.name}</option>
                                    ))}
                                </select>
                                {errors.gender && (
                                    <div className="text-red-600">{errors.gender.message}</div>
                                )}
                            </span>
                            <span className="flex justify-content-between align-items-center w-full mb-4">
                                <span>Caste</span>
                                <select {...register("caste")}>
                                    <option value="">Choose</option>
                                    {castes && castes.length > 0 && castes.map(caste => (
                                        <option key={caste.id} value={caste.name}>{caste.name}</option>
                                    ))}
                                </select>
                                {errors.caste && (
                                    <div className="text-red-600">{errors.caste.message}</div>
                                )}
                            </span>
                            <span className="flex justify-content-between align-items-center w-full mb-4">
                                <span>Marital Status</span>
                                <select {...register("maritalStatus")}>
                                    <option value="">Choose</option>
                                    {maritalStatus && maritalStatus.length > 0 && maritalStatus.map(ms => (
                                        <option key={ms.id} value={ms.name}>{ms.name}</option>
                                    ))}
                                </select>
                                {errors.maritalStatus && (
                                    <div className="text-red-600">{errors.maritalStatus.message}</div>
                                )}
                            </span>
                            <span className="flex justify-content-between align-items-center w-full mb-4">
                                <span>Educational Qualification</span>
                                <select {...register("educationalQualification")}>
                                    <option value="">Choose</option>
                                    {qualifications && qualifications.length > 0 && qualifications.map(qualification => (
                                        <option key={qualification.id} value={qualification.name}>{qualification.name}</option>
                                    ))}
                                </select>
                                {errors.educationalQualification && (
                                    <div className="text-red-600">{errors.educationalQualification.message}</div>
                                )}
                            </span>
                            <Button
                                type="submit"
                                label="Sign Up"
                                className="w-full mb-4"
                                disabled={isSubmitting}
                            ></Button>
                            <span className="font-medium text-600">
                                Already have an account?{" "}
                                <a className="font-semibold cursor-pointer text-900 hover:text-primary transition-colors transition-duration-300">
                                    Login
                                </a>
                            </span>
                        </form>
                    </div>
                }
            </div>
        </>
    );
};

export default Register;
