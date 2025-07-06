import { BrowserRouter } from 'react-router-dom';
import routes from './routes';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main>{routes}</main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;