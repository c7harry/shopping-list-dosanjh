const itemForm = document.getElementById('item-form');
const itemList = document.getElementById('item-list');
const itemInput = document.getElementById('item-input');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const items = itemList.querySelectorAll('li');

// Function to add an item
function onAddItemSubmit(e){
    // Prevent the default form submission behavior
    e.preventDefault();
    const newItem = itemInput.value; 

    // Check if the input is empty
    if (newItem === '') {
        alert('Please add an item');
        return;
    }

    //Create item DOM element
    addItemToDOM(newItem);

    //Add item to local storage
    addItemToStorage(newItem);

    checkUI();

    itemInput.value = '';
}

// Function to add an item to the DOM
function addItemToDOM(item){
    // Create a new list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    const button = createButton('Remove', 'remove-item btn-link text-red');
    li.appendChild(button);

    // Add li to the DOM
    itemList.appendChild(li);
}

// Function to add an item to local storage
function addItemToStorage(item){
    let itemsFromStorage;

    if (localStorage.getItem('items') === null){
        itemsFromStorage = [];
    }else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    //Add new item to array
    itemsFromStorage.push(item);

    //Convert to JSON string and set to local storage
    localStorage.setItem('items',JSON.stringify(itemsFromStorage));
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

// Function to remove an item
function removeItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
        }
    }
    checkUI();
}

// Function to clear all items
function clearItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
    checkUI();
}

// Checks if there are items in the list and updates the UI accordingly
function checkUI(){
    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    }else{
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}

// Function to filter items
function filterItems(e) {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();

        if (itemName.indexOf(text) != -1){
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Event listeners
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);

checkUI();