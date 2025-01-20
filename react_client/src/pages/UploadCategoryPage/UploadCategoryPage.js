import React from 'react';
import UploadCategory from "../components/UploadCategory/UploadCategory";
import NavBar from "../NavBar/NavBar";



function UploadCategoryPage({logout,isAdmin}) {

    return (
        <div >
            <NavBar isAdmin={isAdmin} logout={logout}/>
            <UploadCategory logout={logout}/>
        </div>);
}
export default UploadCategoryPage;