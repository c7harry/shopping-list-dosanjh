const itemForm = document.getElementById('item-form');
const itemList = document.getElementById('item-list');
const itemInput = document.getElementById('item-input');

function addItem(e){
    // Prevent the default form submission behavior
    e.preventDefault();
    const newItem = itemInput.value; 

    // Check if the input is empty
    if (newItem === '') {
        alert('Please add an item');
        return;
    }

    //Create a new list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));

    const button = createButton('Remove', 'remove-item btn-link text-red');
    li.appendChild(button);

    itemList.appendChild(li);
    itemInput.value = '';
}

// Function to create a button with an icon
function createButton(text, classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

// Function to create an icon element
function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

itemForm.addEventListener('submit', addItem);