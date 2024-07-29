import { useEffect, useState } from 'react';
import { IoIosArrowForward, IoIosArrowBack, IoIosTrash } from "react-icons/io";
import { createCategory, createSubcategory, deleteCategory, getCategories, updateCategory } from '../../../common/services/categories';


export default function Categories() {
  const [category, setCategory] = useState(''); // Estado para la categoría principal
  const [subcategory, setSubcategory] = useState(''); // Estado para la subcategoría
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [selectedAvailableCategory, setSelectedAvailableCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getCategories();
        const allCategories = result.payload;
        const activeCategories = allCategories.filter(cat => !cat.isAvailable);
        const availCategories = allCategories.filter(cat => cat.isAvailable);
        setCategories(activeCategories);
        setAvailableCategories(availCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (category && !categories.some(cat => cat.name === category)) {
      try {
        const result = await createCategory(category);
        setCategories([...categories, result.payload]);
        setCategory('');
      } catch (error) {
        console.error("Error adding category:", error);
      }
    }
  };

  const handleAddSubcategory = async () => {
    if (subcategory && parentCategoryId) {
      try {
        const result = await createSubcategory(subcategory, parentCategoryId);
        setCategories([...categories, result.payload]);
        setSubcategory('');
        setParentCategoryId('');
      } catch (error) {
        console.error("Error adding subcategory:", error);
      }
    }
  };

  const handleMoveToAvailable = async () => {
    if (selectedCategory !== null) {
        const categoryToMove = categories[selectedCategory];
        const updatedCategory = { 
            ...categoryToMove, 
            isAvailable: true 
        };

        try {
            // Actualizar en el servidor
            const result = await updateCategory(
                updatedCategory.id,
                updatedCategory.name,
                updatedCategory.isAvailable,
                updatedCategory.parentCategory
            );

            const newAvailableCategories = [...availableCategories, result.payload];
            setAvailableCategories(newAvailableCategories);
            setCategories(categories.filter((_, index) => index !== selectedCategory));
            setSelectedCategory(null);
        } catch (error) {
            console.error("Error moving category to available:", error);
        }
    }
};

const handleMoveToCategories = async () => {
    if (selectedAvailableCategory !== null) {
        const categoryToMove = availableCategories[selectedAvailableCategory];
        const updatedCategory = { 
            ...categoryToMove, 
            isAvailable: false 
        };

        try {
            // Actualizar en el servidor
            const result = await updateCategory(
                updatedCategory.id,
                updatedCategory.name,
                updatedCategory.isAvailable,
                updatedCategory.parentCategory
            );

            const newCategories = [...categories, result.payload];
            setCategories(newCategories);
            setAvailableCategories(availableCategories.filter((_, index) => index !== selectedAvailableCategory));
            setSelectedAvailableCategory(null);
        } catch (error) {
            console.error("Error moving category to active:", error);
        }
    }
};

  

  const handleDeleteCategory = async (index, isAvailable) => {
    const categoryList = isAvailable ? availableCategories : categories;
    const categoryId = categoryList[index]?.id;

    if (categoryId) {
      try {
        await deleteCategory(categoryId);
        if (isAvailable) {
          const updatedAvailableCategories = availableCategories.filter((_, i) => i !== index);
          setAvailableCategories(updatedAvailableCategories);
        } else {
          const updatedCategories = categories.filter((_, i) => i !== index);
          setCategories(updatedCategories);
        }
        setSelectedCategory(null);
        setSelectedAvailableCategory(null);
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center h-dvh">
      <h1 className="text-2xl font-bold mb-4">Gestión de Categorías</h1>
      <p className="text-gray-600 mb-6 text-center">
        Aquí puedes agregar nuevas categorías, moverlas entre disponibles y activas, o eliminarlas según sea necesario.
      </p>
      <div className="flex gap-8">
        <div className="w-72">
          <h2 className="text-lg font-semibold mb-2">Categorías Activas</h2>
          <div className="border border-gray-300 rounded p-2 max-h-72 min-h-72 overflow-y-auto">
            {categories.map((cat, index) => (
              <div
                key={cat.id}
                className={`flex items-center justify-between p-2 cursor-pointer ${selectedCategory === index ? 'bg-blue-200' : ''}`}
                onClick={() => setSelectedCategory(index)}
              >
                <span>{cat.name}</span>
                <IoIosTrash size={20} className="text-red-500 cursor-pointer" onClick={() => handleDeleteCategory(index, false)} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={handleMoveToAvailable}
            disabled={selectedCategory === null}
            className="mt-4 p-2 bg-[#61005D] text-white rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-black"
          >
            <IoIosArrowForward size={24} />
          </button>
          <button
            onClick={handleMoveToCategories}
            disabled={selectedAvailableCategory === null}
            className="mt-4 p-2 bg-[#61005D] text-white rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-black"
          >
            <IoIosArrowBack size={24} />
          </button>
        </div>
        <div className="w-72">
          <h2 className="text-lg font-semibold mb-2">Categorías Disponibles</h2>
          <div className="border border-gray-300 rounded p-2 max-h-72 min-h-72 overflow-y-auto">
            {availableCategories.map((cat, index) => (
              <div
                key={cat.id}
                className={`flex items-center justify-between p-2 cursor-pointer ${selectedAvailableCategory === index ? 'bg-blue-200' : ''}`}
                onClick={() => setSelectedAvailableCategory(index)}
              >
                <span>{cat.name}</span>
                <IoIosTrash size={20} className="text-red-500 cursor-pointer" onClick={() => handleDeleteCategory(index, true)} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-center w-full">
        <input
          type="text"
          placeholder="Nueva Categoría"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded p-2 mr-2 w-96"
        />
        <button
          onClick={handleAddCategory}
          className="bg-[#61005D] text-white px-4 py-2 rounded hover:bg-[#61005ee2]"
        >
          Agregar Categoría
        </button>
      </div>
      <div className="mt-6 flex items-center justify-center w-full">
        <input
          type="text"
          placeholder="Nueva Subcategoría"
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
          className="border border-gray-300 rounded p-2 mr-2 w-96"
        />
        <select
          value={parentCategoryId}
          onChange={(e) => setParentCategoryId(e.target.value)}
          className="border border-gray-300 rounded p-2 mr-2 w-96"
        >
          <option value="">Selecciona Categoría Principal</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <button
          onClick={handleAddSubcategory}
          className="bg-[#61005D] text-white px-4 py-2 rounded hover:bg-[#61005ee2]"
        >
          Agregar Subcategoría
        </button>
      </div>
    </div>
  );
}