import React from 'react';
import UploadCategory from "../components/UploadCategory/UploadCategory";
import NavBar from "../NavBar/NavBar";



function UploadCategoryPage({logout}) {

    return (
        <div >
            <NavBar logout={logout}/>
            <UploadCategory logout={logout}/>
        </div>);
}
export default UploadCategoryPage;