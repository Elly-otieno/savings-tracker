const nameConfirmation = document.getElementById('nameConfirmation');
const userNameInput = document.getElementById('userName');
const confirmNameButton = document.getElementById('confirmName');
const savingsHeading = document.getElementById('savingsHeading');
const daysTable = document.getElementById('section');

confirmNameButton.addEventListener('click', function() {
    const userName = userNameInput.value.trim();
    if (userName !== '') {
        nameConfirmation.style.display = 'none';
        daysTable.style.display = 'block';
        savingsHeading.textContent = `${userName}'s Savings 2024`;
        alert(`Happy Savings ${userName}`)
    } else {
        alert('Please enter a valid name.');
    }
});

const daysTableBody = document.getElementById('daysTableBody');
const numberOfDays = 365; // Set the total number of days
const rowsPerColumn = 31; // Set the number of rows per column
const numberOfColumns = Math.ceil(numberOfDays / rowsPerColumn);
const markAll = document.getElementById(`markAll`);
const clearAll = document.getElementById(`clearAll`);




// Function to save checkbox state to localStorage
function saveCheckboxState(day, isChecked) {
    localStorage.setItem(`dayCheckbox${day}`, isChecked);
}

// Function to load checkbox state from localStorage
function loadCheckboxState(day) {
    return localStorage.getItem(`dayCheckbox${day}`) === 'true';
}
function updateTotal() {
    let sum = 0;
    for (let day = 1; day <= numberOfDays; day++) {
        if (loadCheckboxState(day)) {
            sum += day;
        }
    }
    totalResult.textContent = `Total: ${sum}`;
}

// Function to check all checkboxes
const checkAllCheckboxes = ()=>{
    for (let day = 1; day <= numberOfDays; day++) {
        const checkbox = document.getElementById(`dayCheckbox${day}`);
        if (checkbox) {
            checkbox.checked = true;
            saveCheckboxState(day, true);
        }
    }
    updateTotal();
}
const unCheckAllCheckboxes = ()=>{
    for (let day = 1; day <= numberOfDays; day++) {
        const checkbox = document.getElementById(`dayCheckbox${day}`);
        if (checkbox) {
            checkbox.checked = false;
            saveCheckboxState(day, false);
        }
    }
    updateTotal();
}

markAll.addEventListener('click', checkAllCheckboxes);
clearAll.addEventListener('click', unCheckAllCheckboxes);


for (let col = 0; col < numberOfColumns; col++) {
    const column = document.createElement('td');
    const columnTable = document.createElement('table');

    for (let row = 1; row <= rowsPerColumn; row++) {
        const day = col * rowsPerColumn + row;

        if (day > numberOfDays) {
            break; // Break if the total number of days is reached
        }

        const rowElement = document.createElement('tr');

        // Day column
        const dayCell = document.createElement('td');
        dayCell.textContent = `Day ${day}`;
        rowElement.appendChild(dayCell);

        // Checkbox column
        const checkboxCell = document.createElement('td');
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = `dayCheckbox${day}`;
        checkbox.id = `dayCheckbox${day}`;
        checkbox.checked = loadCheckboxState(day); // Load state from localStorage
        checkbox.addEventListener('change', function () {
            saveCheckboxState(day, this.checked); // Save state to localStorage
        });
        checkboxCell.appendChild(checkbox);
        rowElement.appendChild(checkboxCell);

        columnTable.appendChild(rowElement);
    }

    column.appendChild(columnTable);
    daysTableBody.appendChild(column);
}
// Calculate and display initial total
updateTotal();

setInterval(updateTotal, 0);