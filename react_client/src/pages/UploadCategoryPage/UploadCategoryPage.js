import React from 'react';
import UploadCategory from "../components/UploadCategory/UploadCategory";
import NavBar from "../NavBar/NavBar";
// import './UploadCategoryPage.css'



function UploadCategoryPage({logout,isAdmin,currentUser}) {

    return (
        <div class='upload-category-container' >
            <NavBar currentUser={currentUser} isAdmin={isAdmin} logout={logout}/>
            <UploadCategory logout={logout}/>
        </div>);
}
export default UploadCategoryPage;