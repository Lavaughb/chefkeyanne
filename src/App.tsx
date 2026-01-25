import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import ScrollToTop from './components/ScrollToTop';
import Contact from './components/Contact';

function App() {
  return (
    // 'basename' is critical for GitLab Pages deployment
    <Router basename="/chefkeyanne">
      <ScrollToTop /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

// THIS IS THE LINE YOU ARE MISSING:
export default App;