import './style/Appstyle.css';
import LoginPage from './pages/LoginPage';
import Test from './pages/Test';
import RegisterPage from './pages/RegisterPage';
import AdminPanel from './pages/AdminPanel';
import GraphicCards from './pages/GraphicCards';
import CardPage from './pages/CardPage';
import Processors from './pages/Processors';
import ProcessorPage from './pages/ProcessorPage';
import HardDrives from './pages/HardDrives';
import HardDrivePage from './pages/HardDrivePage';
import MotherBoards from './pages/MotherBoards';
import MotherBoardPage from './pages/MotherBoardPage';
import Mouses from './pages/Mouses';
import MousePage from './pages/MousePage';
import Keyboards from './pages/Keyboards';
import KeyboardPage from './pages/KeyboardPage';
import Monitors from './pages/Monitors';
import MonitorPage from './pages/MonitorPage';
import Headsets from './pages/Headsets';
import HeadsetPage from './pages/HeadsetPage';
import SearchResults from './pages/SearchResults';
import Main from './pages/Main';
import CartPage from './pages/CartPage';
import AddressPage from './pages/AddressPage';
import AfterOrderPage from './pages/AfterOrderPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Main />} />
        <Route path='test' element={<Test />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='register' element={<RegisterPage />} />
        <Route path='adminpanel' element={<AdminPanel />} />
        <Route path='graphiccards' element={<GraphicCards />} />
        <Route path='card' element={<CardPage />} />
        <Route path='processors' element={<Processors />} />
        <Route path='processor' element={<ProcessorPage />} />
        <Route path='harddrives' element={<HardDrives />} />
        <Route path='harddrive' element={<HardDrivePage />} />
        <Route path='motherboards' element={<MotherBoards />} />
        <Route path='motherboard' element={<MotherBoardPage />} />
        <Route path='mouses' element={<Mouses />} />
        <Route path='mouse' element={<MousePage />} />
        <Route path='keyboards' element={<Keyboards />} />
        <Route path='keyboard' element={<KeyboardPage />} />
        <Route path='monitors' element={<Monitors />} />
        <Route path='monitor' element={<MonitorPage />} />
        <Route path='headsets' element={<Headsets />} />
        <Route path='headset' element={<HeadsetPage />} />
        <Route path='searchresults' element={<SearchResults />} />
        <Route path='cart' element={<CartPage />} />
        <Route path='address' element={<AddressPage />} />
        <Route path='ordersuccessful' element={<AfterOrderPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
