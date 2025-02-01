import axios, { AxiosHeaders, AxiosRequestConfig, AxiosResponse } from "axios"
import { ILogin, IPaginationOptions, IUser } from "./types";
import { BASE_URL } from "./constants";
import path from "path";
import fs from "fs"
export class ApiClient {
   ACCESS_TOKEN : string | null = null;
    constructor(accessToken?:string){
        if(accessToken) this.ACCESS_TOKEN = accessToken
    }
    get =async (endpoint: string): Promise<AxiosResponse> =>{
        var headersConfig: AxiosRequestConfig = {
            headers:{
                ContentType:'application/json',
                Authorization: this.ACCESS_TOKEN && this.ACCESS_TOKEN != '' ? `Bearer ${this.ACCESS_TOKEN}`: ''
            }
        }
        console.log("🚀 ~ ApiClient ~ get= ~ headersConfig:", headersConfig)
       
        const response = await axios.get(`${BASE_URL}${endpoint}`,headersConfig);
        return response;
    }

    patch = async (endpoint:string,data:any, options?:any):Promise<AxiosResponse>=>{
        var config: any = {
            'Content-type':'application/json'
        }
        if(this.ACCESS_TOKEN && this.ACCESS_TOKEN != ''){
            config.authorization = `Bearer ${this.ACCESS_TOKEN}`;
        }
        const response = await axios.patch(`${BASE_URL}${endpoint}`,data,{headers:{config}});
        return response;
    }
    post =async (endpoint: string,data:any, options?:any): Promise<AxiosResponse> =>{
        var config: any = {
            'Content-type':'application/json'
        }
        if(this.ACCESS_TOKEN && this.ACCESS_TOKEN != ''){
            config.authorization = `Bearer ${this.ACCESS_TOKEN}`;
        }
        const response = await axios.post(`${BASE_URL}${endpoint}`,data,{headers:{config}});
        return response;
    }

    login = async (path:string,body:ILogin):Promise<AxiosResponse> =>{
        const login = await this.post(path,body);
        return login;
    }

    getMenuActions = async (position: number) : Promise<AxiosResponse> =>{
        const actions = await this.get(`/actions/${position}`);
        return actions;
    }

    getActiveUsers =async ()=>{
        const users = await this.get(`/active-users`);
        return users;
    }
    getUsers =async (options?: IPaginationOptions)=>{
        const page = options && options.page ? options.page : 1;
        const take = options && options.take ? options.take : 20;
        const users = await this.get(`/users?page=${page}&take=${take}`);
        return users;
    }
    getUserDetails =async (userId:number)=>{
        const user = await this.get(`/user/${userId}`);
        return user;
    }
    addUser = async (data:IUser)=>{
        const axios = await this.post('/user',data);
        return axios;
    }
    updateUser = async (data:IUser,userId:number)=>{
        const axios = await this.patch(`/user/${userId}`,data);
        return axios;
    }
    getGroups = async ()=>{
        var data = fs.readFileSync(path.join(__dirname, 'schema_sample2.csv'), { encoding : 'utf8'});
        console.log("🚀 ~ ApiClient ~ getGroups= ~ data:", data)
        
    }
}
