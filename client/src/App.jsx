import { Route, Routes } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { PATH } from './constants/paths';
import { AuthGuard } from './guards/AuthGuard';

import './global-css/global.css';
import { Header } from './components/Header/Header';
import { Explore } from './components/Explore/Explore';
import { Login } from './components/Auth/Login/Login';
import { Register } from './components/Auth/Register/Register';
import { UploadImage } from './components/UploadImage/UploadImage';
import { Profile } from './components/Profile/Profile';
import { NotFound } from './components/NotFound/NotFound';
import { Logout } from './components/Auth/Logout/Logout';
import { Post } from './components/Details/Post';

function App() {

  return (
    <AuthProvider>
      <Header />
      <div className='section-container'>
        <Routes>

          <Route path='/' />
          <Route path={PATH.REGISTER} element={<Register />} />
          <Route path={PATH.LOGIN} element={<Login />} />
          <Route path={PATH.LOGOUT} element={<Logout />} />
          <Route path={PATH.POST} element={<Post />} />
          <Route path={PATH.NOT_FOUND} element={<NotFound />} />

          <Route element={<AuthGuard />}>
            <Route path={PATH.EXPLORE} element={<Explore />} />
            <Route path={PATH.UPLOAD} element={<UploadImage />} />
            <Route path={PATH.PROFILE} element={<Profile />} />
          </Route>

        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
