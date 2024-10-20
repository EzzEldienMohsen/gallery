import { useGlobalContext } from './context/GlobalContext';
import { Gallery, Header } from './components';

function App() {
  const { theme } = useGlobalContext();
  console.log(theme);
  return (
    <>
      <div
        data-theme={theme ? 'winter' : 'dracula'}
        className="w-full min-h-screen box-border"
        dir="rtl"
      >
        <Header />
        <Gallery />
      </div>
    </>
  );
}

export default App;
