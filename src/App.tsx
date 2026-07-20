/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Hero from './components/Hero';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import AIAssistantSection from './components/AIAssistantSection';
import FinalCTASection from './components/FinalCTASection';
import Footer from './components/Footer';

export default function App() {
  return (
    <main>
      <Hero />
      <FeaturesSection />
      <HowItWorksSection />
      <AIAssistantSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
