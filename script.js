// Function to add a new library record
function addRecord() {
    // Retrieve input values
    const bookName = document.getElementById('bookName').value;
    const studentName = document.getElementById('studentName').value;
    const classValue = document.getElementById('class').value;
    const rollNumber = document.getElementById('rollNumber').value;
    const issueDate = document.getElementById('issueDate').value;

    // Calculate due date as 1 week (7 days) from the issue date
    const issueDateTime = new Date(issueDate).getTime(); // Get issue date timestamp
    const dueDate = new Date(issueDateTime + (7 * 24 * 60 * 60 * 1000)); // Add 7 days in milliseconds

    // Format due date as YYYY-MM-DD (to match input type 'date' format)
    const formattedDueDate = dueDate.toISOString().split('T')[0];

    // Create a new record object with book details and due date
    const newRecord = {
        bookName: bookName,
        studentName: studentName,
        class: classValue,
        rollNumber: rollNumber,
        issueDate: issueDate,
        dueDate: formattedDueDate
    };

    // Determine the storage key based on the page
    const storageKey = getPageStorageKey();

    // Retrieve existing records from localStorage or initialize empty array
    const existingRecords = JSON.parse(localStorage.getItem(storageKey)) || [];

    // Add the new record to the existing records array
    existingRecords.push(newRecord);

    // Save the updated records array back to localStorage
    localStorage.setItem(storageKey, JSON.stringify(existingRecords));

    // Clear input fields after adding record
    clearInputFields();

    // Refresh records display
    displayRecords();
}

// Function to display library records from localStorage
function displayRecords() {
    const recordsBody = document.getElementById('recordsBody');
    recordsBody.innerHTML = '';

    // Determine the storage key based on the page
    const storageKey = getPageStorageKey();

    // Retrieve records from localStorage
    const records = JSON.parse(localStorage.getItem(storageKey)) || [];

    // Populate the table with records
    records.forEach((record, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.bookName}</td>
            <td>${record.studentName}</td>
            <td>${record.class}</td>
            <td>${record.rollNumber}</td>
            <td>${record.issueDate}</td>
            <td>${record.dueDate}</td>
            <td><button class="delete-btn" onclick="deleteRecord(${index})">Delete</button></td>
        `;
        recordsBody.appendChild(row);
    });
}

// Function to delete a library record by index
function deleteRecord(index) {
    // Determine the storage key based on the page
    const storageKey = getPageStorageKey();

    // Retrieve existing records from localStorage
    const existingRecords = JSON.parse(localStorage.getItem(storageKey)) || [];

    // Remove the record at the specified index
    existingRecords.splice(index, 1);

    // Save the updated records array back to localStorage
    localStorage.setItem(storageKey, JSON.stringify(existingRecords));

    // Refresh records display
    displayRecords();
}

// Function to clear input fields after adding record
function clearInputFields() {
    document.getElementById('bookName').value = '';
    document.getElementById('studentName').value = '';
    document.getElementById('class').value = '';
    document.getElementById('rollNumber').value = '';
    document.getElementById('issueDate').value = '';
}

// Function to get the storage key based on the current page
function getPageStorageKey() {
    const currentPage = window.location.pathname;
    if (currentPage.includes('pu_college.html')) {
        return 'puCollegeRecords';
    } else if (currentPage.includes('degree_college.html')) {
        return 'degreeCollegeRecords';
    } else {
        return 'schoolRecords';
    }
}

// Initial display of records when the page loads
displayRecords();
