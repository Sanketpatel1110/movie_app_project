
const Card = (movie) => {
    return (
        <>
            <div className='movie'>
                <img src='images/black_panther.jpeg' alt="data" className='poster'></img>
                <div className='movie-details'>
                    <div className='box'>
                        <h4 className='title text-white'>{movie.Title}</h4>
                        <p className='rating text-white'>9.7</p>
                    </div>
                    <div className='overview'>
                        <h1>overview</h1>
                        overview desc...
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card