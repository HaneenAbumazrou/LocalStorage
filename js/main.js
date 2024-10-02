 // Display data from local storage
 function displayData() {
    const data = JSON.parse(localStorage.getItem('crudData')) || [];
    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = ''; // Clear existing data

    data.forEach((item, index) => {
        const row = tableBody.insertRow();

        row.insertCell(0).textContent = item.name;
        row.insertCell(1).textContent = item.age;
        row.insertCell(2).textContent = item.address;
        row.insertCell(3).textContent = item.email;

        const actionsCell = row.insertCell(4);
        
        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = () => deleteData(index);
        actionsCell.appendChild(deleteButton);
        
        // Edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-btn';
        editButton.onclick = () => editData(index);
        actionsCell.appendChild(editButton);
    });
}

// Add data to local storage
document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;

    const data = JSON.parse(localStorage.getItem('crudData')) || [];
    data.push({ name, age, address, email });
    localStorage.setItem('crudData', JSON.stringify(data));

    displayData(); // Refresh the table
    this.reset(); // Clear form inputs
});

// Delete data from local storage
function deleteData(index) {
    const data = JSON.parse(localStorage.getItem('crudData'));
    data.splice(index, 1); // Remove selected entry
    localStorage.setItem('crudData', JSON.stringify(data));
    displayData(); // Refresh the table
}

// Edit existing data
function editData(index) {
    const data = JSON.parse(localStorage.getItem('crudData'));
    const item = data[index];
    
    document.getElementById('name').value = item.name;
    document.getElementById('age').value = item.age;
    document.getElementById('address').value = item.address;
    document.getElementById('email').value = item.email;

    // Remove item from data array temporarily
    data.splice(index, 1);
    localStorage.setItem('crudData', JSON.stringify(data));
    displayData();
}

// Load data when the page loads
window.onload = displayData;