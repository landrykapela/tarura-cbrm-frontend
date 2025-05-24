import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { ILogin, IPaginationOptions, IUserData } from "./types";
import { BASE_URL } from "./constants";

export class ApiClient {
    ACCESS_TOKEN: string | null = null;
    constructor(accessToken?: string) {
        if (accessToken) this.ACCESS_TOKEN = accessToken
    }
    get = async (endpoint: string): Promise<AxiosResponse> => {
        var headersConfig: AxiosRequestConfig = {
            headers: {
                ContentType: 'application/json',
                Authorization: this.ACCESS_TOKEN && this.ACCESS_TOKEN !== '' ? `Bearer ${this.ACCESS_TOKEN}` : ''
            }
        }
        const response = await axios.get(`${BASE_URL}${endpoint}`, headersConfig);
        return response;
    }

    patch = async (endpoint: string, data: any, options?: any): Promise<AxiosResponse> => {
        var headersConfig: AxiosRequestConfig = {
            headers: {
                ContentType: 'application/json',
                Authorization: this.ACCESS_TOKEN && this.ACCESS_TOKEN !== '' ? `Bearer ${this.ACCESS_TOKEN}` : ''
            }
        }
        const response = await axios.patch(`${BASE_URL}${endpoint}`, data, headersConfig);
        return response;
    }
    post = async (endpoint: string, data: any, options?: any): Promise<AxiosResponse> => {
        var headersConfig: AxiosRequestConfig = {
            headers: {
                ContentType: 'application/json',
                Authorization: this.ACCESS_TOKEN && this.ACCESS_TOKEN !== '' ? `Bearer ${this.ACCESS_TOKEN}` : ''
            }
        }
        console.log("config: ", headersConfig)
        const response = await axios.post(`${BASE_URL}${endpoint}`, data, headersConfig);
        return response;
    }

    login = async (body: ILogin): Promise<AxiosResponse> => {
        const login = await this.post('users/login', body);
        return login;
    }

    getActiveUsers = async () => {
        const users = await this.get(`/active-users`);
        return users;
    }
    getUsers = async (options?: IPaginationOptions) => {
        const page = options && options.page ? options.page : 1;
        const take = options && options.take ? options.take : 20;
        const users = await this.get(`users/list?page=${page}&take=${take}`);
        return users;
    }
    getUserDetails = async (userId: number) => {
        const user = await this.get(`users/${userId}`);
        return user;
    }
    addUser = async (data: IUserData) => {
        const axios = await this.post('users/create', data);
        return axios;
    }
    updateUser = async (data: any, userId: number) => {
        const axios = await this.patch(`users/${userId}`, data);
        return axios;
    }
    getGroups = async (options?:IPaginationOptions) => {
        const page = options && options.page ? options.page : 1;
        const take = options && options.take ? options.take : 20;
        var data = await this.get(`groups/list?page=${page}&take=${take}`);
        return data;
    }
    getMembers = async (options?: IPaginationOptions) => {
        const page = options && options.page ? options.page : 1;
        const take = options && options.take ? options.take : 20;
        var data = await this.get(`members/list?page=${page}&take=${take}`);
        return data;
    }

    getGroupReports = async () => {
        var report = await this.get('reports/summary');
        return report;
    }

    createGroupsBulk = async (data: any) => {
        var req = await this.post("groups/bulk", data);
        return req
    }

     createMembersBulk = async (data: any) => {
        var req = await this.post("members/bulk", data);
        return req
    }

    optionsToQueryString = (options: IPaginationOptions): string => {
        const queryString = '?' + new URLSearchParams(options as Record<string, string>).toString();
        return queryString

    }
}
