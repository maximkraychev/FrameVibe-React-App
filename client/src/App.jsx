import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Explore } from './components/Explore/Explore';
import './global-css/global.css';

function App() {

  return (
    <>
      <Header />
      <div className='section-container'>
        <Routes>
          <Route path='/' />
          <Route path='/explore' element={<Explore />} />
          <Route path='/auth/register' />
          <Route path='/auth/login' />
          <Route path='/auth/logout' />
          <Route path='/upload' />
          <Route path='/profile' />
        </Routes>
      </div>
    </>
  );
}

export default App;
