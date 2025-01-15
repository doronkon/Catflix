function MovieItem({name,category,published,director,actors,length,description,catflixOriginal,minimalAge}){
    console.log({ name, category, published, director, actors, length, description, catflixOriginal, minimalAge });  // Log the props
    return(
        <div>
            <h5>name - {name}</h5>
            <h5>belongs to category {category}</h5>
            <h5>published at - {published}</h5>
            <h5>the director is - {director}</h5>
            <h5>actors are - {actors}</h5>
            <h5>the length is - {length}</h5>
            <h5>movie description - {description}</h5>
            <h5>catflixOriginal - {catflixOriginal}</h5>
            <h5> 18+?{minimalAge}</h5>
        </div>
    )
}
export default MovieItem;