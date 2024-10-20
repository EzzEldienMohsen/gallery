import { useGlobalContext } from './context/GlobalContext';
import { Header } from './components';

function App() {
  const { theme } = useGlobalContext();
  console.log(theme);
  return (
    <>
      <div data-theme={theme ? 'winter' : 'dracula'}>
        <Header />
      </div>
    </>
  );
}

export default App;
