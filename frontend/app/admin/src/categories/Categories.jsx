import { useEffect, useState } from 'react';
import { IoIosArrowForward, IoIosArrowBack, IoIosTrash } from "react-icons/io";
import { createCategory } from '../../../services/categories/createCategory';
import { getCategories } from '../../../services/categories/getCategories';
import { deleteCategory } from '../../../services/categories/deleteCategory'; 

export default function Categories() {
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [selectedAvailableCategory, setSelectedAvailableCategory] = useState(null);

  useEffect(() => {
    // Fetch categories from the server when the component mounts
    const fetchCategories = async () => {
      try {
        const result = await getCategories();
        // Assuming result.payload is an array of category objects
        setCategories(result.payload);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Load available categories from local storage when the component mounts
    const storedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    setAvailableCategories(storedCategories);
  }, []);

  const handleAddCategory = async () => {
    if (category && !categories.some(cat => cat.name === category)) {
      try {
        // Call the service to create the category
        const result = await createCategory(category);
        // Assuming the result contains the created category object
        setCategories([...categories, result.payload]);
        setCategory('');
      } catch (error) {
        console.error("Error adding category:", error);
      }
    }
  };

  const handleMoveToAvailable = () => {
    if (selectedCategory !== null) {
      const newAvailableCategories = [...availableCategories, categories[selectedCategory]];
      setAvailableCategories(newAvailableCategories);
      localStorage.setItem('categories', JSON.stringify(newAvailableCategories)); // Save to local storage
      setCategories(categories.filter((_, index) => index !== selectedCategory));
      setSelectedCategory(null);
    }
  };

  const handleMoveToCategories = () => {
    if (selectedAvailableCategory !== null) {
      const newCategories = [...categories, availableCategories[selectedAvailableCategory]];
      setCategories(newCategories);
      // Remove from local storage
      const updatedAvailableCategories = availableCategories.filter((_, index) => index !== selectedAvailableCategory);
      localStorage.setItem('categories', JSON.stringify(updatedAvailableCategories));
      setAvailableCategories(updatedAvailableCategories);
      setSelectedAvailableCategory(null);
    }
  };

  const handleDeleteCategory = async () => {
    if (selectedCategory !== null) {
      try {
        const categoryId = categories[selectedCategory].id; // Get the ID of the selected category
        if (!categoryId) {
          console.error("No category ID found");
          return;
        }
        
        await deleteCategory(categoryId);

        // Update state after deletion
        const updatedCategories = categories.filter((_, index) => index !== selectedCategory);
        setCategories(updatedCategories);

        // Update localStorage
        const newAvailableCategories = [...availableCategories];
        localStorage.setItem('categories', JSON.stringify(newAvailableCategories));

        setSelectedCategory(null);
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  return (
    <div className="h-dvh flex flex-col items-center gap-4 p-4">
      <header>
        <h1 className="text-2xl font-bold">Categories</h1>
      </header>
      <input
        type="text"
        placeholder="New Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border border-gray-300 rounded px-2 py-1"
      />
      <button
        onClick={handleAddCategory}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Category
      </button>
      <div className="flex flex-row gap-4 mt-4">
        <div className="w-48">
          <h3 className="text-center font-bold mb-2">Categories</h3>
          <ul className="border border-gray-300 rounded p-2">
            {categories.map((cat, index) => (
              <li
                key={cat.id}
                className={`p-2 cursor-pointer ${selectedCategory === index ? 'bg-blue-200' : ''}`}
                onClick={() => setSelectedCategory(index)}
              >
                {cat.name}
              </li>
            ))}
          </ul>
          <button
            onClick={handleDeleteCategory}
            disabled={selectedCategory === null}
            className={`mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ${selectedCategory === null ? 'text-gray-300' : ''}`}
          >
            <IoIosTrash size={24} />
          </button>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <button
            onClick={handleMoveToAvailable}
            disabled={selectedCategory === null}
            className={`p-2 ${selectedCategory === null ? 'text-gray-300' : 'text-black'}`}
          >
            <IoIosArrowForward size={24} />
          </button>
          <button
            onClick={handleMoveToCategories}
            disabled={selectedAvailableCategory === null}
            className={`p-2 ${selectedAvailableCategory === null ? 'text-gray-300' : 'text-black'}`}
          >
            <IoIosArrowBack size={24} />
          </button>
        </div>
        <div className="w-48">
          <h3 className="text-center font-bold mb-2">Available Categories</h3>
          <ul className="border border-gray-300 rounded p-2">
            {availableCategories.map((cat, index) => (
              <li
                key={cat.id}
                className={`p-2 cursor-pointer ${selectedAvailableCategory === index ? 'bg-blue-200' : ''}`}
                onClick={() => setSelectedAvailableCategory(index)}
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
