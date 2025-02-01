import React, { useState } from "react";
import { Formik } from 'formik';
import * as Yup from 'yup'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ILogin, IMenuItem } from "../../utils/types";
import { ApiClient } from "../../utils/apiclient";
import { saveSession, saveToLocalStorage } from "../../utils/utils";
import { LogoImage } from "../../components/image_assets";
import Image from "../../components/image";

const LoginPage = (_props:any) => {
    const location = useLocation();
    console.log("🚀 ~ LoginPage ~ _props:", location.state)
    const navigate = useNavigate();
        const [feedback,setFeedback] = useState<string>('')
       
    // const initializeUserData =async (user:any)=>{
    //     const apiClient = new ApiClient();
    //     const actionsRes = await apiClient.getMenuActions(user?.position as number);
    //     if (actionsRes.status == 200) {
    //         const actions = user?.position_detail.actions.split(",").map((it: string) => Number(it));
    //         const menus = actionsRes.data.result ? actionsRes.data.result.filter((ac: IMenuItem) => actions?.includes(ac.id)):[];
    //         const userData = {
    //             ...user,
    //             menuItems: [{ id: 0, text: 'Dashboard', icon: 'apps', clicked: false }].concat(menus)
    //         }
    //         saveSession({accessToken:userData.accessToken});
    //         saveToLocalStorage('user',userData)
    //         const path = location.state && location.state.targetPath ? location.state.targetPath : '/dashboard'
    //         navigate(path)
    //     }
    // }
    const sendLogin = async (data: ILogin) => {
        // const apiClient = new ApiClient();
        const login = {
            email: data.email,
            name: "Landry",
            accessToken: 'wertdyu'
        }
        saveSession(login);
        navigate('/admin')
        // const login = await apiClient.login('/signin', data);
        // console.log("🚀 ~ sendLogin ~ login:", login)
        // if (login.status == 200) {
        //     if (typeof (login.data.result) == "string") {
        //         setFeedback(login.data.result)
        //     }
        //     else {
        //         saveSession(data)
                
        //     }
        // }
        // else setFeedback(login)
    }

    const formValidationSchema = Yup.object({
        email: Yup.string().required('Please enter your email address').email('Please enter a valid email address'),
        password: Yup.string()
    })
    const formHandler = async (values: any) => {
        const loginData: ILogin = {
            email: values.email,
            password: values.password
        }
        await sendLogin(loginData);
    }
    return (
        <main className="w-full">

            
            <div className="w-full mx-auto flex flex-col items-center text-center justify-center space-y-6  h-screen">
                
                <Formik validationSchema={formValidationSchema} initialValues={{ email: "", password: "" }} onSubmit={formHandler}>
                    {({ handleSubmit, handleChange, values, errors, touched}) => (
                        <div className="w-full md:w-6/12  mx-auto mt-6 p-4 border">
                            <Image src={LogoImage} alt="TARURA logo" className="w-4/12 mx-auto" />
                            <p className="text-2xl my-6 py-4">CBRM</p>
                            <form className="w-full md:w-10/12 space-y-4 px-6 mx-auto" method="post" onSubmit={handleSubmit}>
                                {/* {feedback && feedback.length > 0 && <div className="text-red-50">{feedback}</div>} */}
                                <div className="text-start w-full">
                                    <p className="text-textDefault">E-mail</p>
                                    <input type="email" id="email" name="email" placeholder="Enter your email" className="form-control" onChange={handleChange} defaultValue={values.email} />
                                    {errors.email && touched.email && <small className="text-red-400">{errors.email}</small>}
                                </div>
                                <div className="text-start w-full">
                                    <p className="text-textDefault">Password</p>
                                    <input type="password" id="password" name="password" placeholder="Enter your password" className="form-control" onChange={handleChange} />
                                    <p></p>
                                </div>
                                <div className="text-start my-4">
                                    <Link to={"/password_reset"}>I forgot my password</Link>
                                </div>
                                <div className="flex justify-start">
                                    <button type="submit" id="btnSubmit" name="btnSubmit" className="md:w-4/12 bg-accent p-2 text-center hover:bg-accentDark">Sign In</button>
                                </div>
                               
                            </form>
                        </div>
                    )}
                </Formik>
            </div>
        </main>
    );
}
export default LoginPage;