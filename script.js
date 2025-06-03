const itemForm = document.getElementById('item-form');
const itemList = document.getElementById('item-list');
const itemInput = document.getElementById('item-input');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const items = itemList.querySelectorAll('li');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

// Function to display items from localStorage
function displayItems(){
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item));
    checkUI();
}

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

    //Add item to localStorage
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

// Function to add an item to localStorage
function addItemToStorage(item){
    let itemsFromStorage = getItemsFromStorage();

    //Add new item to array
    itemsFromStorage.push(item);

    //Convert to JSON string and set to localStorage
    localStorage.setItem('items',JSON.stringify(itemsFromStorage));
}

// Function to get items from localStorage
function getItemsFromStorage(){
    let itemsFromStorage;

    if (localStorage.getItem('items') === null){
        itemsFromStorage = [];
    }else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage
}

// Function to handle click events on the item list
function onClickItem(e){
    if (e.target.parentElement.classList.contains('remove-item')){
        removeItem(e.target.parentElement.parentElement);
    }else{
        setItemToEdit(e.target);
    }
}

function setItemToEdit(item){
    isEditMode = true;

    itemList.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'));
    item.classList.add('edit-mode');
    formBtn.innerHTML= '<i class="fa-solid fa-pen"></i> Update Item';
    formBtn.style.backgroundColor = '#228B22';
    itemInput.value = item.textContent;
}

// Function to remove an item
function removeItem(item) {
    if (confirm('Are you sure?')){
        //Remove item from DOM
        item.remove();

        //Remove item from local storage
        removeItemFromStorage(item.textContent);

        checkUI();
    }
}

// Function to remove an item from localStorage
function removeItemFromStorage(item){
    let itemsFromStorage = getItemsFromStorage();

    //Filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    //Re-set to localstorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// Function to clear all items
function clearItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

    //Clear from localStorage
    localStorage.removeItem('items');

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

// Initialize App
function init(){
    // Event listeners
    itemForm.addEventListener('submit', onAddItemSubmit);
    itemList.addEventListener('click', onClickItem);
    clearBtn.addEventListener('click', clearItems);
    itemFilter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems);

    checkUI();
}

init();