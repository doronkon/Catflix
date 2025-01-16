import React , {useEffect,useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './index.css';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import HomeScreen from './pages/HomeScreen/HomeScreen';
import MovieDetail from './pages/MovieDetail/MovieDetail';


function App() {
    const [currentUser, setCurrentUser] = useState();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(()=>{
        localStorage.removeItem('Token')
    },[])
    const logout=()=>{
        setCurrentUser(null)
        setIsAdmin(false)
        localStorage.removeItem('Token')
    }

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={ currentUser ? <HomeScreen currentUser = {currentUser}/> : <SignUp />} />
                    <Route path="/movie/:id" element={<MovieDetail />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/login' element={<Login setIsAdmin = {setIsAdmin} setCurrentUser = {setCurrentUser} />} />
                </Routes>
            </Router>

        </div>);
}
export default App;

