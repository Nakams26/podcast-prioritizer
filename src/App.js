//Importing style from SASS
import './styles/sass/style.scss';

// Importing components

import Header from './components/Header';
import Welcome from './components/Welcome';
import UserSearch from './components/UserSearch';
import Footer from './components/Footer';
import Error from './components/Error';


import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/podcast" element={<UserSearch />} />
        <Route path='*' element={<Error />}/>
      </Routes>
     <Footer/>
    </div>
  );
}

export default App;
