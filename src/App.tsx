import { useGlobalContext } from './context/GlobalContext';
import { Header } from './components';
import React from 'react';
//  LAzy Loading the Gallery
const Gallery = React.lazy(() => import('./components/Gallery'));

function App() {
  const { theme } = useGlobalContext();
  return (
    <>
      <div
        data-theme={theme ? 'winter' : 'dracula'}
        className="w-full min-h-screen box-border"
        dir="rtl"
      >
        <Header />
        <React.Suspense
          fallback={
            <div className="w-full flex justify-center items-center p-2">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          }
        >
          <Gallery />
        </React.Suspense>
      </div>
    </>
  );
}

export default App;
