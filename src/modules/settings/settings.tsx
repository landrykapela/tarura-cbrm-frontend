'use client';
import { useState, useEffect } from "react";
import { getStoredUserData, getUserSession, validateEmail } from "../../utils/utils";
import { IUserData, RoleEnum } from "../../utils/types";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import UsersTable from "./users_table";
import { MdEmail, MdPerson, MdPerson2, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { ApiClient } from "../../utils/apiclient";
import axios from "axios";
import { Formik } from "formik";
import * as yup from 'yup'
import Spinner from "../../components/spinner";

const Settings = (_props: any) => {
    const session = getUserSession()
    const userData = getStoredUserData()
    const apiClient = new ApiClient(session?.accessToken)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [listLoading, setListLoading] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [passwordLoading, setPasswordLoading] = useState<boolean>(false)
    const [feedback, setFeedback] = useState<string>("")
    const [isError, setIsError] = useState<boolean>(false)
    const [usersData, setUsersData] = useState<any>()
    const [isList, setIsList] = useState<boolean>(true)

    const getUsers = async () => {
        setListLoading(true)
        try {
            const res = await apiClient.getUsers();
            setUsersData(res.data.data);
            setListLoading(false)
        }
        catch (error) {
            if (axios.isAxiosError(error)) setFeedback(error.response?.data.message);
            else setFeedback('An error occurred, please try again');
            setListLoading(false)
            setIsError(true)
        }

    }
    const updatePassword = async (formValues: any) => {
        setPasswordLoading(true)
        try {
            const res = await apiClient.updateUser({ password: formValues.password }, userData?.id!)
            setFeedback(res.data.message)
            setIsError(false)
            setPasswordLoading(false)
        }
        catch (error) {
            if (axios.isAxiosError(error)) setFeedback(error.response?.data.message);
            else setFeedback('An error occurred, please try again');
            setPasswordLoading(false)
            setIsError(true)
        }
    }
    const addUser = async (data: IUserData) => {
        setLoading(true)
        try {
            const res = await apiClient.addUser(data);
            setFeedback(res.data.message)
            setIsError(false)
            await getUsers()
            setLoading(false)
        }
        catch (error) {
            if (axios.isAxiosError(error)) setFeedback(error.response?.data.message);
            else setFeedback('An error occurred, please try again');
            setLoading(false)
            setIsError(true)
        }

    }
    const formHandler = async (formValues: any) => {
        let user_data: IUserData = {
            name: formValues.name.trim(),
            email: formValues.email,
            password: formValues.password,
            role: formValues.role
        }
        await addUser(user_data)
    }
    useEffect(() => {
        if (userData?.role === RoleEnum.ADMIN) getUsers()
    }, [])
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }
    const validationSchema = yup.object({
        name: yup.string().required().max(255, "Name too long").min(3, "Name too short"),
        email: yup.string().email("Invalid email address"),
        password: yup.string().min(8, "Password too short")
    })
    const handleListView = (isList: boolean)=>{
        setIsList(isList)
    }
    const handleFeedback = (msg:string,isError:boolean)=>{
        setFeedback(msg);
        setIsError(isError)
    }
    return (<>
        <Header user={userData} active={3} />
        <main className="w-full flex bg-white min-h-screen">
            <div className="md:w-2/12 flex flex-col items-start text-center justify-center">
                <Sidebar active={3} user={session} />
            </div>

            <div className="w-full md:w-9/12 mx-auto mt-2">
                {feedback && feedback.length > 0 && <div className={`p-2 text-center my-4 ${isError ? "text-red-500 bg-red-200 border border-red-500" : "text-green-500 bg-green-200 border border-green-500"}`}>{feedback}</div>}
                <p className="text-2xl mx-2">Change Password</p>
                <Formik validationSchema={yup.object({ password: yup.string().required().min(8, "Password too short") })} initialValues={{ password: "" }} onSubmit={updatePassword}>
                    {({ handleSubmit, handleChange, values, errors, touched }) => (
                        passwordLoading ? <Spinner className="spinner-md" /> :
                            <form className="w-full md:w-9/12 mb-8" onSubmit={handleSubmit}>
                                <div className="flex items-center justify-start border-2 border-gray-400 pe-2 md:w-6/12 rounded-md m-4">
                                    <input type={showPassword ? "text" : "password"} id="password" className="form-control outline-none border-none" placeholder="Enter new password" onChange={handleChange} defaultValue={values.password} />
                                    {showPassword ? <MdVisibilityOff className="cursor-pointer" onClick={togglePasswordVisibility} /> : <MdVisibility className="cursor-pointer" onClick={togglePasswordVisibility} />}

                                </div>
                                {errors.password && touched.password && <small className="text-red-400 ms-4">{errors.password}</small>}

                                <div className="flex items-center justify-start md:w-6/12 m-4">
                                    <button type="submit" className={`md:w-4/12 bg-accent p-2 text-center hover:bg-accentDark`}>Save</button>

                                </div>
                            </form>)}
                </Formik>
                <hr className="mt-8" />
                {userData?.role === RoleEnum.ADMIN ?
                    <div className="flex-column md:flex justify-start items-start w-full pt-8">
                        {loading ? <Spinner className="spinner-md mx-auto" /> :
                            <Formik validationSchema={validationSchema} initialValues={{ name: "", email: "", password: "", role: 0 }} onSubmit={formHandler} >
                                {({ handleSubmit, handleChange, errors, values, touched }) => (<form className="w-full md:w-6/12 mt-8" onSubmit={handleSubmit}>
                                    <p className="text-2xl m-2">Add User</p>
                                    <div className="flex items-center justify-start border-2 border-gray-400 pe-2 md:w-8/12 rounded-md m-4">
                                        <input type="text" id="name" className="form-control outline-none border-none" placeholder="Enter name" onChange={handleChange} defaultValue={values.name} />
                                        <MdPerson />
                                    </div> {errors.name && touched.name && <small className="text-red-400 ms-2">{errors.name}</small>}
                                    <div className="flex items-center justify-start border-2 border-gray-400 pe-2 md:w-8/12 rounded-md m-4">
                                        <input type="email" id="email" className="form-control outline-none border-none" placeholder="Enter email" onChange={handleChange} defaultValue={values.email} />
                                        <MdEmail />
                                    </div> {errors.email && touched.email && <small className="text-red-400 ms-2">{errors.email}</small>}
                                    <div className="flex items-center justify-start border-2 border-gray-400 pe-2 md:w-8/12 rounded-md m-4">
                                        <select id="role" className="form-control outline-none border-none" onChange={handleChange} defaultValue={values.role}>
                                            <option value={0}>User</option>
                                            <option value={1}>Admin</option>
                                        </select>
                                        <MdPerson2 />
                                    </div>
                                    <div className="flex items-center justify-start border-2 border-gray-400 pe-2 md:w-8/12 rounded-md m-4">
                                        <input type={showPassword ? "text" : "password"} id="password" className="form-control outline-none border-none" placeholder="Enter new password" onChange={handleChange} defaultValue={values.password} />
                                        {showPassword ? <MdVisibilityOff className="cursor-pointer" onClick={togglePasswordVisibility} /> : <MdVisibility className="cursor-pointer" onClick={togglePasswordVisibility} />}
                                    </div> {errors.password && touched.password && <small className="text-red-400 ms-2">{errors.password}</small>}
                                    <div className="flex items-center justify-start md:w-8/12 m-4">
                                        <button type="submit" className={`${loading ? "disabled" : "md:w-4/12 bg-accent p-2 text-center hover:bg-accentDark"}`}>Submit</button>

                                    </div>
                                </form>)}
                            </Formik>}
                        {listLoading ? <Spinner className="spinner-md mx-auto" /> :

                            <div className="w-full mt-8 md:w-6/12">
                                <p className="text-2xl m-2">User {isList ? "List": "Detail"}</p>
                                {usersData ? <UsersTable data={usersData} isList={(isList:boolean)=>handleListView(isList)} onFeedback={(msg:string,isError:boolean)=>{handleFeedback(msg,isError)}}></UsersTable> : <p>No data</p>}
                            </div>}
                    </div> : null}

            </div>


        </main>
    </>);

}
export default Settings;