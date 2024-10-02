export default function MovieCard({
    name,
    releaseDate,
    rating,
    price,
    genre,
    language,
    quality,
}) {
    return (
        <>
            <div className='
                w-auto h-auto px-4 py-2 rounded-md border
                bg-zinc-900 border-zinc-800
            '>
                <span className='text-2xl font-black'>
                    {name ?? "Unavailable"}
                </span>
                <div className='flex flex-row space-x-2'>
                    <div className="grid grid-cols-3">
                        {releaseDate ?
                            <div className="flex flex-col">
                                <span className='text-zinc-400'>Release Date</span>
                                <span className="pl-2">{releaseDate}</span>
                            </div>
                            : null}
                        {rating ? <div className="flex flex-col">
                            <span className='text-zinc-400'>Rating</span>
                            <span className="pl-2">{rating}</span>
                        </div>
                            : null}
                        {/* Price is required? */}
                        <div className="flex flex-col">
                            <span className='text-zinc-400'>Price</span>
                            <span className="pl-2">{price ?? "Unavailable"}</span>
                        </div>
                        {genre ?
                            <div className="flex flex-col">
                                <span className='text-zinc-400'>Genre</span>
                                <span className="pl-2">{genre}</span>
                            </div>
                            : null}
                        {language ? <div className="flex flex-col">
                            <span className='text-zinc-400'>Language</span>
                            <span className="pl-2">{language}</span>
                        </div>
                            : null}
                        {quality ? <div className="flex flex-col">
                            <span className='text-zinc-400'>Quality</span>
                            <span className="pl-2">{quality}</span>
                        </div>
                            : null}
                    </div>
                </div>
                <div className="text-xl font-bold">
                    CAD ${price}
                </div>
            </div>
        </>
    )
}