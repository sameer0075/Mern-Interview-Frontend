import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";

class API {
	private instance: AxiosInstance;

	constructor() {
		this.instance = axios.create();

		this.instance.interceptors.request.use(
			this.requestInterceptor,
			this.requestErrorInterceptor
		);

		this.instance.interceptors.response.use(
			this.responseInterceptor,
			this.responseErrorInterceptor
		);
	}

	private requestInterceptor(config: any): any {
		const token = sessionStorage.getItem("token");
		if (token !== undefined) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	}

	private requestErrorInterceptor(error: any) {
		return Promise.reject(error);
	}

	private responseInterceptor(response: AxiosResponse): AxiosResponse {
		return response;
	}

	private responseErrorInterceptor(error: any) {
		if (error.response) {
			toast.error(error.response.data.message);
		} else if (error.request) {
			toast.error("No response received from the server");
		} else {
			toast.error("Error occurred while making the request");
		}
		return Promise.reject(error);
	}

	public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
		return this.instance.get<T>(url, config).then(this.handleApiResponse);
	}

	public post<T = any>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig
	): Promise<T> {
		return this.instance
			.post<T>(url, data, config)
			.then(this.handleApiResponse);
	}

	public put<T = any>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig
	): Promise<T> {
		return this.instance.put<T>(url, data, config).then(this.handleApiResponse);
	}

	public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
		return this.instance.delete<T>(url, config).then(this.handleApiResponse);
	}

	private handleApiResponse(response: AxiosResponse): any {
		return response.data;
	}
}

const api = new API();
export default api;
