document.addEventListener('DOMContentLoaded', async () => {
    // Lista para llevar el seguimiento de los IDs de productos
    const productIds = new Set();

    try {
        // Carga inicial de productos al cargar la página
        const response = await fetch('/api/products');
        if (!response.ok) {
            throw new Error('Error al obtener los productos.');
        }
        const products = await response.json();
        const productTableBody = document.querySelector('#productTable tbody');

        products.forEach(product => {
         
            productIds.add(product.id);

            const newRow = document.createElement('tr');
            newRow.dataset.id = product.id;

            const cellId = document.createElement('td');
            cellId.textContent = product.id;

            const cellTitle = document.createElement('td');
            cellTitle.textContent = product.title;

            const cellPrice = document.createElement('td');
            cellPrice.textContent = product.price;

            const cellStock = document.createElement('td');
            cellStock.textContent = product.stock;

            const cellCategory = document.createElement('td');
            cellCategory.textContent = product.category;

            const cellStatus = document.createElement('td');
            cellStatus.textContent = product.status;

            const cellCode = document.createElement('td');
            cellCode.textContent = product.code;

            const cellActions = document.createElement('td');
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Eliminar';
            deleteBtn.classList.add('delete-btn');
            cellActions.appendChild(deleteBtn);

            newRow.appendChild(cellId);
            newRow.appendChild(cellTitle);
            newRow.appendChild(cellPrice);
            newRow.appendChild(cellStock);
            newRow.appendChild(cellCategory);
            newRow.appendChild(cellStatus);
            newRow.appendChild(cellCode);
            newRow.appendChild(cellActions);

            productTableBody.appendChild(newRow);
        });
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
});


socket.on('newProduct', (product) => {


    if (product.id !== undefined) {

        const productTableBody = document.querySelector('#productTable tbody');
        const newRow = document.createElement('tr');
        newRow.dataset.id = product.id;

        const cellId = document.createElement('td');
        cellId.textContent = product.id;

        const cellTitle = document.createElement('td');
        cellTitle.textContent = product.title;

        const cellPrice = document.createElement('td');
        cellPrice.textContent = product.price;

        const cellStock = document.createElement('td');
        cellStock.textContent = product.stock;

        const cellCategory = document.createElement('td');
        cellCategory.textContent = product.category;

        const cellStatus = document.createElement('td');
        cellStatus.textContent = product.status;

        const cellCode = document.createElement('td');
        cellCode.textContent = product.code;

        const cellActions = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.classList.add('delete-btn');
        cellActions.appendChild(deleteBtn);

        newRow.appendChild(cellId);
        newRow.appendChild(cellTitle);
        newRow.appendChild(cellPrice);
        newRow.appendChild(cellStock);
        newRow.appendChild(cellCategory);
        newRow.appendChild(cellStatus);
        newRow.appendChild(cellCode);
        newRow.appendChild(cellActions);

        productTableBody.appendChild(newRow);
    }
});

// Evento de clic en el botón de eliminación
document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const productId = event.target.closest('tr').dataset.id;
        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error al eliminar el producto.');
            }

            event.target.closest('tr').remove();
            console.log('Producto eliminado correctamente.');
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    }
});
