import React, { Suspense, lazy } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const MovieDetails = lazy(() => import('./pages/MovieDetails'));

function App() {
  return (
    <div className="page-wrapper min-h-screen bg-netflix-black text-white selection:bg-netflix-red/30">
      <Header />

      <main>
        <Suspense fallback={
          <div className="fixed inset-0 bg-[#141414] flex items-center justify-center z-50">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-netflix-red/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-t-netflix-red rounded-full animate-spin"></div>
            </div>
          </div>
        }>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails type="movie" />} />
            <Route path="/tv/:id" element={<MovieDetails type="tv" />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default App;
