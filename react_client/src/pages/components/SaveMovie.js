const SaveMovie = ({setMovie}) => {

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setMovie(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <input type="file" accept="video/*" onChange={handleFileSelect} />
        </div>
    );
};

export default SaveMovie;
