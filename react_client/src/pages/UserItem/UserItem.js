function UserItem({name,userName,dispalyName,email,image}){
    console.log({ name,userName,dispalyName,email,image });  // Log the props
    return(
        <div>
            <div>name - {name}</div>
            <div>UserName -  {userName}</div>
            <div>displayName -  {dispalyName}</div>
            <div>email - {email}</div>
            <div>image path - {image}</div>
        </div>
    )
}
export default UserItem;