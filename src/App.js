import './styles/sass/style.scss';
import Footer from './components/Footer';
import Header from './components/Header';
import Error from './components/Error';
import Welcome from './components/Welcome';
import UserForm from './components/UserForm';

import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/podcast" element={<UserForm />} />
        <Route path='*' element={<Error />}/>
      </Routes>
     <Footer/>
    </div>
  );
}

export default App;
