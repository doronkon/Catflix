import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const CategoryList = ({setCategory}) => {
        const [categories, setCategories] = useState([]);

        const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category
        const [mapCategory, setMapCategory] = useState({}); // State for selected category

      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await fetch('http://localhost:8080/api/categories', {
              method: 'GET',
              headers: {
                'user': localStorage.getItem('Token'), 
                'Content-Type': 'application/json',
              },
            });
            if (!response.ok) {
              console.log(response)
              throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            console.log(data)
            const categoryNames = data.map((category) => category.name);
            const categoryMapping = data.reduce((acc, category) => {
              acc[category.name] = category._id;
              return acc;
            }, {});
    
            setCategories(categoryNames);
            setMapCategory(categoryMapping);

          } catch (error) {
            setError(error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchCategories();
      }, []);
      if (loading) {
        return <div>Loading categories...</div>;
      }
      if (error) {
        return <div>Error: {error}</div>;
      }


      const handleCategoryChange = (e) => {
        const selectedName = e.target.value;
        setSelectedCategory(selectedName);
        setCategory(mapCategory[selectedName]); // Use the map to get the corresponding ID
      };

  return (
    <div>
      <label htmlFor="category-select">Select a category:</label>
      <select
        id="category-select"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="" disabled>
          -- Select a Category --
        </option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      {selectedCategory && <p>You selected: {selectedCategory}</p>}
    </div>
  );
};

export default CategoryList;