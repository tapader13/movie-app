import { movieTrailer, nowplaying, options } from '@/lib/constant';

const getNowPlaying = async () => {
  const randomIndex = Math.floor(Math.random() * 10) + 1;
  const data = await fetch(`${nowplaying}`, options);
  const jsonData = await data.json();
  const movie = jsonData.results[randomIndex];
  const id = movie.id;
  const trailer = await fetch(`${movieTrailer}/${id}/videos`, {
    ...options,
    cache: 'no-store',
  });
  const trailerData = await trailer.json();
  const trailers = trailerData.results.filter(
    (item: any) => item.type === 'Trailer'
  );
  return {
    data: movie,
    trailer: trailers[0],
  };
};
const Hero = async () => {
  const { data, trailer } = await getNowPlaying();
  // console.log(data);
  return (
    <div>
      <div className='   '>
        <div className='w-screen'>
          {trailer && (
            <iframe
              className=' aspect-video w-screen '
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`}
              frameBorder={'0'}
              title='YouTube video player'
              allowFullScreen
            ></iframe>
          )}
          {!trailer && (
            <iframe
              className=' aspect-video w-screen '
              src='https://www.youtube.com/embed/hrCqPP1TKms?si=CguBpV8bxNFfbn1N&autoplay=1&mute=1'
              title='YouTube video player'
              frameBorder='0'
              referrerPolicy='strict-origin-when-cross-origin'
              allowFullScreen
            ></iframe>
          )}
          <div className=' text-white absolute left-24 bottom-40 '>
            <h1 className='text-2xl font-bold'>{data.original_title}</h1>
            <p className='w-2/5'>{data.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
