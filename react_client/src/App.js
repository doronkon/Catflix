import React , {useEffect,useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './index.css';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import UploadMovie from './pages/UploadMovie/UploadMovie';
import UploadCategory from './pages/components/UploadCategory/UploadCategory';
import DeleteCategory from './pages/DeletCategory/DeleteCategory';
import HomeScreen from './pages/HomeScreen/HomeScreen';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import SaveImage from './pages/components/SaveImage';
import SaveMovie from './pages/components/SaveMovie';
import Error404 from './pages/Error404/Error404';
import CategoryList from './pages/components/CategoryList';
import Profile from './pages/Profile/Profile';
import UploadCategoryPage from './pages/UploadCategoryPage/UploadCategoryPage';
import AdminTerminal from './pages/AdminTerminal/AdminTerminal';
import NavBar from './pages/NavBar/NavBar';
import UpdateCategory from './pages/UpdateCategory/UpdateCategory';




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
                    <Route path="/" element={ currentUser ? <HomeScreen currentUser = {currentUser} isAdmin = {isAdmin}/> : <SignUp />} />
                    <Route path="/movie/:id" element={currentUser ?<MovieDetail currentUser = {currentUser} isAdmin = {isAdmin}/> : <Error404/>}  />
                    <Route path="/profile" element={currentUser ?<Profile currentUser = {currentUser}/> : <Error404/>}  />
                    <Route path='/login' element={currentUser ? <Error404/> : <Login setIsAdmin = {setIsAdmin} setCurrentUser = {setCurrentUser} />} />
                    <Route path='/uploadMovie' element={ !isAdmin ?  <UploadMovie/>:<Error404/>} />
                    <Route path='/uploadCategory' element={ !isAdmin ?  <UploadCategoryPage/>:<Error404/>} />
                    <Route path='/deleteCategory' element={ !isAdmin ?  <DeleteCategory/>:<Error404/>} />
                    <Route path='/Admin' element={!isAdmin ? <AdminTerminal logout={logout}/>:<Error404/>} />
                    <Route path='/UpdateCategory' element={!isAdmin ?<UpdateCategory logout={logout}/>:<Error404/>} />

                </Routes>
            </Router>

        </div>);
}
export default App;

