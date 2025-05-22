import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './App.css';
import Navigations from './Components/Navbar/nav';
import Home from './Components/Homepage/home';
import SearchBar from './Components/Searchbar/searchbar';
import TrendingOffers from './Components/Offers/offers';
import AboutUs from './Components/AboutUs/aboutus';
import Fleet from './Components/cars/cars';

function App() {
  return (
    <Router>
      <Navigations/>
      <Routes>
        <Route path="/" element={<><Home/> <SearchBar/> <TrendingOffers/> <AboutUs/> </>}></Route>
        <Route path="/offers" element={<TrendingOffers/>}></Route>
        <Route path="/aboutus" element={<AboutUs/>}></Route>
        <Route path="/cars" element={<Fleet/>}></Route>
      </Routes>
    </Router>
  )
}
export default App;