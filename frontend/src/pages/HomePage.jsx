import HeroCarousel from '../components/sections/HeroCarousel';
import Features from '../components/sections/Features';
import Services from '../components/sections/Services';
import Testimonials from '../components/sections/Testimonials';
import NewsSection from '../components/sections/NewsSection';
import CtaSection from '../components/sections/CtaSection';
import Projects from '../components/sections/Projects';
import Courses from '../components/sections/Courses';
import Partners from '../components/sections/Partners';

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <HeroCarousel />
      <Features />
      <Services />
      <Testimonials />
      <Projects />
      <Courses />
      <NewsSection />
      <Partners />
      <CtaSection />
    </div>
  );
};

export default HomePage;