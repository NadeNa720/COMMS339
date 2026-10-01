import { StoreProvider } from './store/StoreContext';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import FeatureCards from './components/FeatureCards';
import UseCases from './components/UseCases';
import ProductGrid from './components/ProductGrid';
import Testimonials from './components/Testimonials';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import VideoModal from './components/VideoModal';
import QuickViewModal from './components/QuickViewModal';
import CartDrawer from './components/CartDrawer';
import Toast from './components/Toast';

/**
 * Page composition — section order follows the LPO brief:
 * Header → Hero → Trust bar → Benefits → Use cases → Products → Stories → Final CTA → Footer
 */
export default function App() {
  return (
    <StoreProvider>
      <Header />
      <main id="main">
        <Hero />
        <TrustBar />
        <FeatureCards />
        <UseCases />
        <ProductGrid />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />

      {/* Overlays */}
      <VideoModal />
      <QuickViewModal />
      <CartDrawer />
      <Toast />
    </StoreProvider>
  );
}
