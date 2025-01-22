import React from 'react';
import UploadCategory from "../components/UploadCategory/UploadCategory";
import NavBar from "../NavBar/NavBar";
// import './UploadCategoryPage.css'



function UploadCategoryPage({logout}) {

    return (
        <div class='upload-category-container'>
            <NavBar logout={logout}/>
            <UploadCategory logout={logout}/>
        </div>);
}
export default UploadCategoryPage;