import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const service: AxiosInstance  = axios.create({
	baseURL: 'http://47.115.51.237:3000',
	timeout: 5000
})

service.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		return config
	},
	(error: any) => {
		return Promise.reject(error)
	}
)

service.interceptors.response.use(
	(res: AxiosResponse) => {
		const { data } = res
		return data
	},
	(error: any) => {
		return Promise.reject(error)
	}
)

export default service