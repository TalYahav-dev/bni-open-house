import { Hero } from './components/sections/Hero';
import { HowItWorks } from './components/sections/HowItWorks';
import { OpenHousesList } from './components/sections/OpenHousesList';
import { Footer } from './components/sections/Footer';

function App() {
  return (
    <main className="min-h-screen">
      <Hero />
      <HowItWorks />
      <OpenHousesList />
      <Footer />
    </main>
  );
}

export default App;
