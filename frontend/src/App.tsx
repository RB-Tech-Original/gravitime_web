import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import OdooIntegration from './components/OdooIntegration';
import Footer from './components/Footer';
import MVPBanner from './components/MVPBanner';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-white">
        <Navbar />
				<MVPBanner />
        <Hero />
        <Features />
        <HowItWorks />
        <OdooIntegration />
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
