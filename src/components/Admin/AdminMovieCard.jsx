import { Check, Pencil, Trash } from "phosphor-react";
import { useState } from "react";
import axios from "axios";
import dateToString from "../../lib/dateToString";

export default function AdminMovieCard({
    id,
    name,
    releaseDate,
    rating,
    price,
    genre,
    language,
    quality,
    quantity
}) {
    const [editable, setEditable] = useState(false);
    const [movieData, setMovieData] = useState({
        id: id,
        name: name,
        quality: quality,
        language: language,
        genre: genre,
        rating: rating,
        release_date: releaseDate !== null ? dateToString(new Date(releaseDate)) : "",
        price: price,
        quantity: quantity
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setMovieData({ ...movieData, [name]: value });
    }

    return (
        <>
            <div className="flex flex-row flex-wrap w-full space-x-4 bg-zinc-900 border-zinc-800 border-2 py-2 px-4 rounded-md items-center my-2">
                <span className="w-[4%]">{movieData.id}</span>
                <div className={`flex flex-col w-[10%]`}>
                    <span className="border-b-2 h-fit">Name</span>
                    <input
                        type={"text"}
                        name={"name"}
                        value={movieData.name}
                        onChange={handleChange}
                        disabled={!editable}
                    />
                </div>
                <div className="flex flex-col w-[10%]">
                    <span className="border-b-2 h-fit">Release Date</span>
                    <input
                        type={"date"}
                        name={"release_date"}
                        value={movieData.release_date}
                        onChange={handleChange}
                        disabled={!editable}
                    />
                </div>
                <div className="flex flex-col w-[10%]">
                    <span className="border-b-2 h-fit">Rating</span>
                    <input
                        type={"text"}
                        name={"rating"}
                        value={movieData.rating}
                        onChange={handleChange}
                        disabled={!editable}
                    />
                </div>
                <div className="flex flex-col w-[10%]">
                    <span className="border-b-2 h-fit">Genre</span>
                    <input
                        type={"text"}
                        name={"genre"}
                        value={movieData.genre}
                        onChange={handleChange}
                        disabled={!editable}
                    />
                </div>
                <div className="flex flex-col w-[10%]">
                    <span className="border-b-2 h-fit">Language</span>
                    <input
                        type={"text"}
                        name={"language"}
                        value={movieData.language}
                        onChange={handleChange}
                        disabled={!editable}
                    />
                </div>
                <div className="flex flex-col w-[10%]">
                    <span className="border-b-2 h-fit">Quality</span>
                    <input
                        type={"text"}
                        name={"quality"}
                        value={movieData.quality}
                        onChange={handleChange}
                        disabled={!editable}
                    />
                </div>
                <div className="flex flex-col w-[10%]">
                    <span className="border-b-2 h-fit">Price</span>
                    <input
                        type={"text"}
                        name={"price"}
                        value={movieData.price}
                        onChange={handleChange}
                        disabled={!editable}
                    />
                </div>
                <div className="flex flex-col w-[10%]">
                    <span className="border-b-2 h-fit">Quantity</span>
                    <input
                        type={"text"}
                        name={"quantity"}
                        value={movieData.quantity}
                        onChange={handleChange}
                        disabled={!editable}
                    />
                </div>
                <div className="flex flex-row">
                    <button
                        onClick={async () => {
                            setEditable(!editable);
                            if (editable) {
                                const confirmed = confirm("Are you sure you want to update this movie?");
                                if (!confirmed) return;
                                // Send data to DB
                                console.log("Sending data to DB...");
                                if (movieData.name == "" || movieData.price == undefined) return;
                                try {
                                    await axios.put("http://localhost:8800/movie/" + name, movieData);
                                } catch (err) {
                                    console.log(err);
                                }
                                console.log("Sent data to DB");
                            }
                        }}
                    >
                        {!editable ?
                            <Pencil className="w-8 h-8" />
                            :
                            <Check className="w-8 h-8" />
                        }
                    </button>
                    <button>
                        <Trash className="w-8 h-8" />
                    </button>
                </div>
            </div>
        </>
    )
}