//import logo from './logo.svg';
import './App.css';
import './Components/Home.css';
import './Components/AddEdit.css';
import { ToastContainer, Toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Home from './Components/Home';
import AddEdit from './Components/AddEdit';
function App() {
  return (
    <div className="App">
      <ToastContainer position='top-center'/>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
            <Route path='/addedit' element={<AddEdit/>}/>
            <Route path='/update/:id' element={<AddEdit/>}/>
            <Route path='/view/:id' element={<View />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
