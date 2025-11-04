import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ScrollTop } from './components/ScrollTop';
import { SITE, SKILLS, PROJECTS, TIMELINE } from './data';
import './styles.css';

function App() {
  const profileImage = './media/profile photo.jpg';

  return (
    <>
      <Header name={SITE.name} profileImage={profileImage} />
      <Hero
        name={SITE.name}
        titleKicker={SITE.title_kicker}
        subtitle={SITE.subtitle}
        heroPhrases={SITE.hero_phrases}
      />
      <About profileImage={profileImage} name={SITE.name} />
      <Skills skills={SKILLS} />
      <Projects projects={PROJECTS} />
      <Experience timeline={TIMELINE} />
      <Contact email={SITE.email} />
      <Footer name={SITE.name} socials={SITE.socials} />
      <ScrollTop />
    </>
  );
}

export default App;
