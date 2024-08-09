import { movieTrailer, nowplaying, options } from '@/lib/constant';

const getNowPlaying = async () => {
  const randomIndex = Math.floor(Math.random() * 10) + 1;
  const data = await fetch(`${nowplaying}`, options);
  const jsonData = await data.json();
  const id = jsonData.results[randomIndex].id;
  const trailer = await fetch(`${movieTrailer}/${id}/videos`, {
    ...options,
    cache: 'no-store',
  });
  const trailerData = await trailer.json();
  const trailers = trailerData.results.filter(
    (item: any) => item.type === 'Trailer'
  );
  //   console.log(trailers[0], 'tr');
  return trailers[0];
};
const Hero = async () => {
  const data = await getNowPlaying();

  return (
    <div>
      <div className=' -z-10 bg-orange-300 absolute top-0'>
        <div className='w-screen'>
          {data && (
            <iframe
              className=' aspect-video w-screen '
              src={`https://www.youtube.com/embed/${data.key}?autoplay=1&mute=1`}
              frameBorder={'0'}
              title='YouTube video player'
              allowFullScreen
            ></iframe>
          )}
          {!data && (
            <iframe
              className=' aspect-video w-screen '
              src='https://www.youtube.com/embed/hrCqPP1TKms?si=CguBpV8bxNFfbn1N&autoplay=1&mute=1'
              title='YouTube video player'
              frameBorder='0'
              referrerPolicy='strict-origin-when-cross-origin'
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
