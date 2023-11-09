import { Route, Routes } from 'react-router-dom';
import './global-css/global.css';

import { Header } from './components/Header/Header';
import { Explore } from './components/Explore/Explore';
import { Login } from './components/Auth/Login/Login';
import { Register } from './components/Auth/Register/Register';

function App() {

  return (
    <>
      <Header />
      <div className='section-container'>
        <Routes>
          <Route path='/' />
          <Route path='/explore' element={<Explore />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='logout' />
          <Route path='/upload' />
          <Route path='/profile' />
        </Routes>
      </div>
    </>
  );
}

export default App;
