import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './components/Home/Home';
import Navbar from './';
import { Signin } from './components/SIgnIn/SignIn';
import { Signup } from './components/Signup/SignUp';


function App() {
  return (
    <div className="App">
      {/* <Provider store={store}> */}
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
        </BrowserRouter>
        {/* </Provider> */}
      
    </div>
  );
}

export default App;
