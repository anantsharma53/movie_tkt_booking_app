import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Navbar from './';


function App() {
  return (
    <div className="App">
      {/* <Provider store={store}> */}
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navbar/>}/>
        </Routes>
        </BrowserRouter>
        {/* </Provider> */}
      
    </div>
  );
}

export default App;
