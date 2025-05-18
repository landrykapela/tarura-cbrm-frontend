import { useState } from "react";
import { Formik } from 'formik';
import * as Yup from 'yup'
import { Link, useNavigate } from "react-router-dom";
import { ILogin } from "../../utils/types";
import { ApiClient } from "../../utils/apiclient";
import { saveSession, saveToLocalStorage } from "../../utils/utils";
import { LogoImage } from "../../components/image_assets";
import Image from "../../components/image";
import Spinner from "../../components/spinner";
import axios from "axios";

const LoginPage = (_props:any) => {
    
    const navigate = useNavigate();
        const [feedback,setFeedback] = useState<string>('')
        const [loading,setLoading] = useState<boolean>(false)
       
    const sendLogin = async (data: ILogin) => {
        setLoading(true);
        const apiClient = new ApiClient();
        try{
            const login = await apiClient.login(data);
            if(login.status !== 200){
                setFeedback(login.data.message)
                return;
            }
            saveSession({accessToken:login.data.data.accessToken, email:login.data.data.email});
            saveToLocalStorage('user', {email: login.data.data.email, id: login.data.data.id, role: login.data.data.role, name: login.data.data.name});
            navigate('/admin')
        }
        catch (error) {
            if(axios.isAxiosError(error)) setFeedback(error.response?.data.message);
            else setFeedback('An error occurred, please try again');
        }
        setLoading(false);
        
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
                                {loading ? <Spinner className="spinner-md mx-auto"/> :(feedback && feedback.length > 0 && <div className="text-red-500 bg-red-200 border border-red-500 p-2">{feedback}</div>)}
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
                                
                                <div className="flex justify-start">
                                    <button type="submit" id="btnSubmit" name="btnSubmit" className={`${loading ? "disabled" : "md:w-4/12 bg-accent p-2 text-center hover:bg-accentDark"}`}>Sign In</button>
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