import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import ScrollToTop from './components/ScrollToTop';
import Contact from './components/Contact';
import Menu from './components/Menu';

function App() {
  return (
<Router>
  <ScrollToTop /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </Router>
  );
}

export default App;
