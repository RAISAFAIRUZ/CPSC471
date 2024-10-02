import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import Layout from "../components/Layout";
import { fetchMovies } from "../lib/dbFunctions";

export default function HomePage({ }) {
    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchMovies(setMovies);
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e);
    }

    return (
        <>
            <Layout
                search={search}
                handleSearchChange={handleSearchChange}
            >
                <h1 className="font-black text-3xl uppercase mb-4">Home</h1>
                <div className='flex flex-col space-y-2'>
                    {movies.map((movie) => (
                        <>
                            <MovieCard
                                name={movie.name}
                                quality={movie.quality}
                                language={movie.language}
                                genre={movie.genre}
                                rating={movie.rating}
                                releaseDate={movie.release_date}
                                price={movie.price}
                            />
                        </>
                    ))}
                </div>
            </Layout>
        </>
    )
}