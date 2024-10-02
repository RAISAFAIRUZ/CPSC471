import Layout from "../../components/Layout";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { useState, useEffect } from "react";
import getKeys from "../../lib/getKeys";
import axios from "axios";
import { fetchMovies } from "../../lib/dbFunctions";
import AdminMovieCard from "../../components/Admin/AdminMovieCard";
import { Plus } from "phosphor-react";

export default function AdminManageMoviePage() {
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const defaultMovie = {
        name: "",
        quality: "",
        language: "",
        genre: "",
        rating: "",
        release_date: "",
        price: 0,
        quantity: 0
    };
    const [movieData, setMovieData] = useState(defaultMovie);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchMovies(setMovies);
    }, []);

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
            <div className="py-4">
                <div className='flex flex-col space-y-2'>
                    <h1 className="uppercase font-black text-xl">
                        Add Movie
                    </h1>
                    <div className="flex flex-row w-full space-x-4 bg-zinc-900 border-zinc-800 border-2 py-2 px-4 rounded-md items-center">
                        <div className={`flex flex-col w-[10%]`}>
                            <span className="border-b-2 h-fit">Name</span>
                            <input
                                className={`${movieData.name == "" ? "border-2 border-red-500" : ""}`}
                                type={"text"}
                                name={"name"}
                                value={movieData.name}
                                onChange={handleMovieChange}
                                disabled={false}
                            />
                        </div>
                        <div className="flex flex-col w-[10%]">
                            <span className="border-b-2 h-fit">Release Date</span>
                            <input
                                type={"date"}
                                name={"release_date"}
                                value={movieData.release_date}
                                onChange={handleMovieChange}
                                disabled={false}
                            />
                        </div>
                        <div className="flex flex-col w-[10%]">
                            <span className="border-b-2 h-fit">Rating</span>
                            <input
                                type={"number"}
                                step={"0.5"}
                                name={"rating"}
                                value={movieData.rating}
                                onChange={handleMovieChange}
                                disabled={false}
                            />
                        </div>
                        <div className="flex flex-col w-[10%]">
                            <span className="border-b-2 h-fit">Price</span>
                            <input
                                className={`${isNaN(movieData.price == "" ? "s" : movieData.price) ? "border-2 border-red-500" : ""}`}
                                type={"number"}
                                step={"0.01"}
                                name={"price"}
                                value={movieData.price}
                                onChange={(e) => {
                                    if (!isNaN(e.target.value)) 
                                        handleMovieChange(e);
                                    else return;
                                }}
                                disabled={false}
                            />
                        </div>
                        <div className="flex flex-col w-[10%]">
                            <span className="border-b-2 h-fit">Genre</span>
                            <input
                                type={"text"}
                                name={"genre"}
                                value={movieData.genre}
                                onChange={handleMovieChange}
                                disabled={false}
                            />
                        </div>
                        <div className="flex flex-col w-[10%]">
                            <span className="border-b-2 h-fit">Language</span>
                            <input
                                type={"text"}
                                name={"language"}
                                value={movieData.language}
                                onChange={handleMovieChange}
                                disabled={false}
                            />
                        </div>
                        <div className="flex flex-col w-[10%]">
                            <span className="border-b-2 h-fit">Quality</span>
                            <input
                                type={"text"}
                                name={"quality"}
                                value={movieData.quality}
                                onChange={handleMovieChange}
                                disabled={false}
                            />
                        </div>
                        <div className="flex flex-col w-[10%]">
                            <span className="border-b-2 h-fit">Quantity</span>
                            <input
                                className={`${isNaN(movieData.quantity == "" ? "s" : movieData.quantity) ? "border-2 border-red-500" : ""}`}
                                type={"number"}
                                step={"1"}
                                name={"quantity"}
                                value={movieData.quantity}
                                onChange={(e) => {
                                    if (!isNaN(e.target.value)) 
                                        handleMovieChange(e);
                                    else return;
                                }}
                                disabled={false}
                            />
                        </div>

                        <div className="flex flex-row">
                            <button
                                onClick={async () => {
                                    setSuccess(false);
                                    setErrorMessage("");
                                    
                                    if (isNaN(movieData.price == "" ? "s" : movieData.price)) {
                                        setErrorMessage("Price cannot be undefined.");
                                        return;
                                    } else if (isNaN(movieData.price)) {
                                        setErrorMessage("Price cannot be a string.");
                                        return;
                                    } else if (movieData.name == "") {
                                        setErrorMessage("Movie name cannot be empty");
                                        return;
                                    } else if (isNaN(movieData.quantity == "" ? "s" : movieData.quantity)) {
                                        setErrorMessage("Quantity cannot be undefined.");
                                        return;
                                    }

                                    setErrorMessage("");

                                    try {
                                        await axios.post("http://localhost:8800/movie", movieData);
                                    } catch (err) {
                                        console.log(err);
                                    }

                                    setMovieData(defaultMovie);

                                    fetchMovies(setMovies);

                                    setSuccess(true);
                                }}
                            >
                                <Plus className="w-8 h-8" />
                            </button>
                        </div>
                    </div>
                    {success ?
                        <>
                            <span>Added movie successfully!</span>
                        </>
                        :
                        null}
                    {errorMessage ?
                        <>
                            <span className="text-red-500">{errorMessage}</span>
                        </>
                        :
                        null}
                    <h1 className="uppercase font-black text-xl">
                        Edit Movies
                    </h1>
                    {movies.map((movie) => (
                        <>
                            <AdminMovieCard
                                id={movie.id}
                                name={movie.name}
                                quality={movie.quality}
                                language={movie.language}
                                genre={movie.genre}
                                rating={movie.rating}
                                releaseDate={movie.release_date}
                                price={movie.price}
                                quantity={movie.quantity}
                            />
                        </>
                    ))}
                </div>
            </div>

        </>
    );
}