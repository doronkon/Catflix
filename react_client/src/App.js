import React , {useEffect,useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './index.css';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import UploadMovie from './pages/UploadMovie/UploadMovie';
import HomeScreen from './pages/HomeScreen/HomeScreen';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import SaveImage from './pages/components/SaveImage';
import SaveMovie from './pages/components/SaveMovie';
import Error404 from './pages/Error404/Error404';
import CategoryList from './pages/components/CategoryList';
import Search from './pages/Search/Search';




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
                    <Route path="/movie/:id" element={currentUser ?<MovieDetail /> : <Error404/>}  />
                    <Route path='/login' element={currentUser ? <Error404/> : <Login setIsAdmin = {setIsAdmin} setCurrentUser = {setCurrentUser} />} />
                    <Route path='/search' element={ currentUser ? <Search currentUser = {currentUser}/> : <SignUp />}/>
                    <Route path='/uploadMovie' element={ isAdmin ?  <UploadMovie/>:<Error404/>} />

                </Routes>
            </Router>

        </div>);
}
export default App;

