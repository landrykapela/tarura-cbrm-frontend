import { useState } from 'react'
import { MdClose, MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { dateFormatWithTime, getRole, getUserSession } from '../../utils/utils';
import Image from '../../components/image';
import { Avatar } from '../../components/image_assets';
import { Formik } from 'formik';
import Spinner from '../../components/spinner';
import * as yup from 'yup'
import { ApiClient } from '../../utils/apiclient';
import axios from 'axios';

const UserView = (props: any) => {
    const user = props.data;
    const session = getUserSession()
    const apiClient = new ApiClient(session?.accessToken)
    const [passwordLoading, setPasswordLoading] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }
    const updatePassword = async (formValues: any)=>{
         setPasswordLoading(true)
        try {
            const res = await apiClient.updateUser({ password: formValues.password }, user?.id!)
            props.onFeedback(res.data.message,false)
            setPasswordLoading(false)
        }
        catch (error) {
            if (axios.isAxiosError(error)) props.onFeedback(error.response?.data.message,true);
            else props.onFeedback('An error occurred, please try again', true);
            setPasswordLoading(false)
        }
    }
    return (
        <>
        <div className='flex justify-end w-full items-center'>
        <MdClose className="text-2xl cursor-pointer hover:text-accent" onClick={()=>{props.onClose()}} />
        </div>
        <div className="md:flex w-full justify-center md:justify-start items-start md:items-center p-2 border bg-gray-100 mx-auto">
            <Image src={Avatar} alt="user avatar" className="md:w-4/12 mx-auto" />
            <div className='md:w-8/12 items-center px-4 mt-4'>
                <div className='text-start space-y-4'>
                <p>{user.name}</p><label>Name </label>
                    <p> {user.email}</p><label>E-mail</label>
                    <p>{getRole(user.role)}</p><label>Role </label>
                    <p>{dateFormatWithTime(Date.parse(user.createdAt)/1000,false)}</p><label>Date Created </label>
                </div>
            </div>
        </div>
        
                <Formik validationSchema={yup.object({ password: yup.string().required().min(8, "Password too short") })} initialValues={{ password: "" }} onSubmit={updatePassword}>
                    {({ handleSubmit, handleChange, values, errors, touched }) => (
                        passwordLoading ? <Spinner className="spinner-md" /> :
                            <form className="md:flex w-11/12 md:w-full mx-auto my-8 justify-between items-center" onSubmit={handleSubmit}>
                                <div className='w-full md:w-8/12'>
                                <label>Change User Password</label>
                                <div className="flex items-center justify-start border-2 border-gray-400 pe-2 md:w-6/12 rounded-md">
                                    <input type={showPassword ? "text" : "password"} id="password" className="form-control outline-none border-none" placeholder="Enter new password" onChange={handleChange} defaultValue={values.password} />
                                    {showPassword ? <MdVisibilityOff className="cursor-pointer" onClick={togglePasswordVisibility} /> : <MdVisibility className="cursor-pointer" onClick={togglePasswordVisibility} />}

                                </div>
                                {errors.password && touched.password && <small className="text-red-400 ms-4">{errors.password}</small>}

                                <div className="items-center justify-start md:w-6/12">
                                    <button type="submit" className={`md:w-4/12 bg-accent p-2 text-center hover:bg-accentDark`}>Save</button>

                                </div></div>
                                 <div className="md:w-4/12 mt-8 flex justify-end">
                                    <button type="button" className={`text-white bg-red-600 p-2 text-center hover:bg-red-800 md:w-6/12`}>Delete User</button>
                                </div>
                            </form>)}
                </Formik>
        </>
    )
}
export default UserView