import { useState } from 'react'
import { Home } from './components/Home.tsx';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';

function App() {
  return (
    <>
      <Home />
      <Services />
      <Gallery />
    </>
  );
}

export default App;
