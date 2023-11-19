import { Route, Routes } from 'react-router-dom';
import './global-css/global.css';

import { PATH } from './constants/paths';
import { Header } from './components/Header/Header';
import { Explore } from './components/Explore/Explore';
import { Login } from './components/Auth/Login/Login';
import { Register } from './components/Auth/Register/Register';
import { UploadImage } from './components/UploadImage/UploadImage';
import { Profile } from './components/Profile/Profile';
import { Details } from './components/Details/Details';
import { NotFound } from './components/NotFound/NotFound';

function App() {

  return (
    <>
      <Header />
      <div className='section-container'>
        <Routes>
          <Route path='/' />
          <Route path={PATH.EXPLORE} element={<Explore />}>
            <Route path={PATH.IMAGE_DETAILS} element={<Details />}/>
          </Route>
          <Route path={PATH.REGISTER} element={<Register />} />
          <Route path={PATH.LOGIN} element={<Login />} />
          <Route path={PATH.LOGOUT} />
          <Route path={PATH.UPLOAD} element={<UploadImage />} />
          <Route path={PATH.PROFILE} element={<Profile />}>
            <Route path={PATH.IMAGE_DETAILS} element={<Details />} />
          </Route>
          <Route path={PATH.NOT_FOUND} element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
