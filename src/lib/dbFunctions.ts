import axios, { AxiosResponse } from "axios";

// Takes in a hook function to setState for an object.
export async function fetchMovies(hook: Function): Promise<void> {
    try {
        const res: AxiosResponse<any, any> = await axios.get("http://localhost:8800/movie");
        hook(res.data);
    } catch (err) {
        console.log(err);
    }
}

export async function fetchEmployees(hook: Function): Promise<void> {
    try {
        const res: AxiosResponse<any, any> = await axios.get("http://localhost:8800/employee");
        hook(res.data);
    } catch (err) {
        console.log(err);
    }
}

export async function fetchAccountData(hook: Function, account_id: number): Promise<void> {
    try {
        const res: AxiosResponse<any, any> = await axios.get("http://localhost:8800/account?account_id=" + account_id);
        hook(res.data[0]);
    } catch (err) {
        console.log(err);
    }
}

export async function fetchPurchaseHistory(hook: Function, email: string): Promise<void> {
    try {
        const res: AxiosResponse<any, any> = await axios.get("http://localhost:8800/purchase_history?account_email=" + email);
        hook(res.data);
    } catch (err) {
        console.log(err);
    }
}