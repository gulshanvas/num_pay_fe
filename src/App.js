import logo from './logo.svg';
import './App.css';
import MobileNumberInput from './MobileNumberInput.jsx';
import PrivateKeyInput from './PrivateKeyInput.jsx';
import RegisterUser from './RegisterUser.jsx';
import TransferPage from './TransferPage.jsx';
import LoginScreen from './LoginScreen.jsx';
import { BrowserRouter, Route,Routes } from 'react-router-dom';

function App() {
  return (<>
    <BrowserRouter>

    <h2 style={{color:"blueviolet",  position: "relative",
 
  display: "flex",
  justifyContent: "center",
  alignItems:"flex-start"}}>ETHIndia2024</h2>
<Routes>
  
<Route path="/" element={< LoginScreen/>} />

<Route path="/register-page" element={<RegisterUser/>} />
<Route path="/transfer-page" element={<TransferPage />} /></Routes>

    </BrowserRouter>
    </>
  );
}

export default App;
