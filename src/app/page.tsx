import AiringToday from '@/components/AiringToday';
import Hero from '@/components/Hero';
import Popular from '@/components/Popular';
import TopRated from '@/components/TopRated';
import Tranding from '@/components/Tranding';
import TrandingShows from '@/components/TrandingShows';

export default function Home() {
  return (
    <main>
      <Hero />
      <div className='relative '>
        <div className='absolute -top-20 bg-black'>
          {' '}
          <Popular />
          <TopRated />
          <Tranding />
          <TrandingShows />
          <AiringToday />
        </div>
      </div>
    </main>
  );
}
