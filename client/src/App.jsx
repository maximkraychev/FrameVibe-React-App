import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';

function App() {

  return (
    <>
     <Header />
     <Routes>
        <Route path='/'/>
        <Route path='/explore'/>
        <Route path='/auth/register'/>
        <Route path='/auth/login'/>
        <Route path='/auth/logout'/>
        <Route path='/upload'/>
        <Route path='/profile'/>
     </Routes>
    </>
  );
}

export default App;
