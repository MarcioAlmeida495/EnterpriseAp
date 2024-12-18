import './App.css';
import { Home } from './Components/MyHome/Home';
import { HomeProvider } from './Contexts/HomeContext';

function App() {
  return <>
    <HomeProvider value={'teste'}>
      <Home/>
    </HomeProvider>
      
  </>
}

export default App;
