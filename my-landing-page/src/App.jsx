import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Main from './components/Main';
import Products from './components/Products';
import './App.css';
import About from './components/About';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <Main />
              <Products />
            </>
          } 
        />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </Router>
    </>
  );
}

export default App;