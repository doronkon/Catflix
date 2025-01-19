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

    
    const handleToken = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/tokens', {
                method: 'GET',
                headers: {
                    token: localStorage.getItem('Token'),
                    'Content-Type': 'application/json', // Set the correct content type header
                },                    
            });
            if (!response.ok) {
                return null; // Return null on failure
            }
            const data = await response.json();
            setIsAdmin(data.admin)
            setCurrentUser(data.id)
            console.log(data)
            return data;
        } catch (error) {
            return null;
        }
    };

    useEffect(()=>{
        const checkToken = async () => {
            if (localStorage.getItem('Token')!=null) {
                const success =await handleToken();
                if(!success)
                {
                    logout();
                }
            }
            else
            {
                logout()
            }
        };
        checkToken();
        },[])
    const logout=()=>{
        setCurrentUser(null)
        setIsAdmin(false)
        localStorage.removeItem('Token')
        console.log('Logged out');
    }

    return (
        <div className="App">
            <button onClick={logout}>logout</button>

            <Router>
                <Routes>
                    <Route path="/" element={ currentUser ? <HomeScreen logout = {logout} currentUser = {currentUser} isAdmin = {isAdmin}/> : <SignUp />} />
                    <Route path="/movie/:id" element={currentUser ?<MovieDetail logout = {logout} currentUser = {currentUser} isAdmin = {isAdmin} /> : <Error404/>}  />
                    <Route path="/profile" element={currentUser ?<Profile logout = {logout} currentUser = {currentUser}/> : <Error404/>}  />
                    <Route path='/login' element={currentUser ? <Error404/> : <Login setIsAdmin = {setIsAdmin} setCurrentUser = {setCurrentUser} />} />
                    <Route path='/uploadMovie' element={ !isAdmin ?  <UploadMovie logout = {logout}/>:<Error404/>} />
                    <Route path='/uploadCategory' element={ !isAdmin ?  <UploadCategoryPage logout = {logout}/>:<Error404/>} />
                    <Route path='/deleteCategory' element={ !isAdmin ?  <DeleteCategory logout = {logout}/>:<Error404/>} />
                    <Route path='/Admin' element={!isAdmin ? <AdminTerminal logout={logout}/>:<Error404/>} />
                    <Route path='/UpdateCategory' element={!isAdmin ?<UpdateCategory logout={logout}/>:<Error404/>} />

                </Routes>
            </Router>

        </div>);
}
export default App;

