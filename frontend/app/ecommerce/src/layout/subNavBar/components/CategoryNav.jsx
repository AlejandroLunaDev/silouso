import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCategories } from '../../../../../common/services/categories'; 

export default function CategoryNav() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                const categoriesArray = data.payload || [];

                // Crear un mapa de categorías con el nombre del padre como clave
                const parentMap = new Map();
                const childCategories = [];

                // Organizar las categorías por padre
                categoriesArray.forEach(category => {
                    if (category.parentCategory) {
                        const parentCategoryName = category.parentCategory.name;
                        if (!parentMap.has(parentCategoryName)) {
                            parentMap.set(parentCategoryName, []);
                        }
                        parentMap.get(parentCategoryName).push(category);
                    } else {
                        childCategories.push(category);
                    }
                });

             
                childCategories.forEach(category => {
                    if (!parentMap.has(category.name)) {
                        parentMap.set(category.name, []);
                    }
                });

                // Ordenar para que "Informatica" esté primero
                const sortedCategories = Array.from(parentMap.entries()).sort(([a], [b]) => a === 'informatica' ? -1 : b === 'informatica' ? 1 : 0);

                setCategories(sortedCategories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryClick = (name) => {
        navigate(`/shop?category=${encodeURIComponent(name)}`);
    };

    const renderCategory = (parentName, children) => (
        <div key={parentName} className="p-4 border-b border-gray-200">
            <h2 
                className="font-bold text-md mb-2 cursor-pointer text-[#61005D]"
                onClick={() => handleCategoryClick(parentName)}
            >
                {parentName.toUpperCase()}
            </h2>
            {children.length > 0 && (
                <ul className="list-none">
                    {children.map(child => (
                        <li 
                            key={child.id} 
                            className="text-md cursor-pointer capitalize hover:font-semibold text-gray-600 hover:text-[#61005D]"
                            onClick={() => handleCategoryClick(child.name)}
                        >
                            {child.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

    return (
        <div className="rounded absolute top-full left-0 mt-2 bg-white shadow-lg z-10 p-4 grid grid-cols-2 gap-4">
            {categories.length > 0 ? (
                categories.map(([parentName, children]) => renderCategory(parentName, children))
            ) : (
                <p>No categories available</p>
            )}
        </div>
    );
}
