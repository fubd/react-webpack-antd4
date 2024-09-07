import {createRoot} from 'react-dom/client';
import Home from './Home';
const App = () => {
  return (
    <div>
      <Home />
    </div>
  );
};

createRoot(document.getElementById('app') as HTMLElement).render(<App />);
