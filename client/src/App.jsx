import { Route, Routes } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { StateProvider } from './contexts/StateContext';
import { PATH } from './constants/paths';
import { AuthGuard } from './guards/AuthGuard';

import './global-css/global.css';
import { Header } from './components/Header/Header';
import { Explore } from './components/Explore/Explore';
import { Login } from './components/Auth/Login/Login';
import { Register } from './components/Auth/Register/Register';
import { CreatePost } from './components/CreatePost/CreatePost';
import { Profile } from './components/Profile/Profile';
import { NotFound } from './components/NotFound/NotFound';
import { Logout } from './components/Auth/Logout/Logout';
import { Post } from './components/Details/Post';
import { EditPost } from './components/Details/EditPost';
import { PostWithModal } from './components/Details/PostWithModal';

function App() {

  return (
    <AuthProvider>
      <Header />
      <div className='section-container'>
        <StateProvider>
          <Routes>

            <Route path='/' />
            <Route path={PATH.REGISTER} element={<Register />} />
            <Route path={PATH.LOGIN} element={<Login />} />
            <Route path={PATH.LOGOUT} element={<Logout />} />
            <Route path={PATH.POST} element={<Post />} />
            <Route path={PATH.NOT_FOUND} element={<NotFound />} />

            <Route element={<AuthGuard />}>
              <Route path={PATH.EXPLORE} element={<Explore />}>
                <Route path={PATH.POST_DETAILS} element={<PostWithModal />} />
              </Route>

              <Route path={PATH.PROFILE} element={<Profile />}>
                <Route path={PATH.POST_DETAILS} element={<PostWithModal />} />
              </Route>
              
              <Route path={PATH.POST_CREATE} element={<CreatePost />} />
              <Route path={PATH.POST_EDIT} element={<EditPost />} />
            </Route>

          </Routes>
        </StateProvider>
      </div>
    </AuthProvider>
  );
}

export default App;
