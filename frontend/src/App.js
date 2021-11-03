import './styles/App.scss';
import Navbar from './components/Navbar/Navbar';
import axios from 'axios';
import React, {useState} from 'react';

function App() {

  const [address, setAddress] = useState('')

  const handleInputChange = (e) => { 
    setAddress(e)
  }
  const handleButtonClick = async () => { 
    try {
      const response = await axios.get(`/ethereum/wallet-balance/`)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      {/* <Navbar /> */}
      <input type="text" placeholder="address" onChange={(e)=>handleInputChange(e.target.value)}/>
      <button onClick={()=> handleButtonClick()}> click </button>
    </>
  );
}

export default App;
