
import { APIProvider } from '@vis.gl/react-google-maps';
import './App.css';
import MainRoutes from './routes';
import { GOOGLE_API_KEY } from './utils/constants';

function App() {
  return (
    <div className="App">
      <APIProvider apiKey={GOOGLE_API_KEY}>
     <MainRoutes />
     </APIProvider>
    </div>
  );
}

export default App;
