import { Pencil, Trash } from "phosphor-react";
import Layout from "../components/Layout";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { useState } from "react";
import getKeys from "../lib/getKeys";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export default function AdminPage() {
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState(false);
    const [movieData, setMovieData] = useState({
        name: "",
        quality: "",
        language: "",
        genre: "",
        rating: "",
        release_date: "",
        price: undefined
    });

    const handleMovieChange = (e) => {
        const { name, value } = e.target;
        setMovieData({ ...movieData, [name]: value });
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (movieData.name == "" || movieData.price == undefined) return;

        try {
            await axios.post("http://localhost:8800/movie", movieData);
        } catch (err) {
            console.log(err);
        }

        setSuccess(true);
    }

    return (
        <>
            <Layout>
                <h1 className="font-black text-3xl uppercase mb-4">Admin</h1>
                <div className="p-4">
                    <span className="text-2xl font-black uppercase py-4 mb-2">
                        Admin Actions
                    </span>
                    <div className="flex flex-row space-x-4">
                        <Link to="/admin/employee">
                            <Button className={"flex flex-row items-center font-semibold"}>
                                Manage Employees
                            </Button>
                        </Link>
                        <Link to="/admin/movie">
                            <Button className={"flex flex-row items-center font-semibold"}>
                                Manage Movies
                            </Button>
                        </Link>
                    </div>
                    <br />
                    <Outlet />
                </div>
            </Layout>
        </>
    );
}