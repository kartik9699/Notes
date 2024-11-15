
import './App.css';
import Home from './Screens/Home';
import { Route,Routes,BrowserRouter } from 'react-router-dom';
import SignUp from './Screens/SignUp';
import Login from './Screens/Login';
import { NotesProvider } from './Components/DataContext';

function App() {
  return (
    <NotesProvider>
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp/>} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </BrowserRouter>
    </div>
    </NotesProvider>
  );
}

export default App;
