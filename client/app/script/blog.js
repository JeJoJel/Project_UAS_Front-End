// Deklarasi Variabel
const originalValues = {};
let activeButton = null;

// Saat load page atau reload page
document.addEventListener('DOMContentLoaded', () => {
    storeOriginalValues(); // memanggil fungsi
    activeButton = document.querySelector('.ingredients-button.active'); // menyimpan yg menjadi active button
});

// Menyimpan semua data ingredients/supplies yg X1
function storeOriginalValues() {
    const ingredients = document.querySelectorAll('#ingredients li');
    ingredients.forEach(ingredient => {
        const textNode = ingredient.childNodes[1].nodeValue.trim();  
        originalValues[ingredient.id] = textNode;
    });
}

// Fungsi untuk X2, X3, dan balik ke X1
function multiplyIngredients(multiplier, button) {
    const ingredients = document.querySelectorAll('#ingredients li');

    if (activeButton && activeButton !== button) {
        activeButton.classList.remove('active');
    }
    button.classList.add('active');
    activeButton = button;

    ingredients.forEach(ingredient => {
        const checkbox = ingredient.querySelector('input[type="checkbox"]');  
        const span = ingredient.querySelector('span');  
        const originalText = originalValues[ingredient.id];  

        const amountMatch = originalText.match(/^([\d.]+)\s*(\S.*)$/); 

        if (amountMatch) {
            const amount = parseFloat(amountMatch[1]);  
            const unitAndName = amountMatch[2].trim();  
            let newAmount = amount * multiplier;  

            if (Number.isInteger(newAmount)) {
                newAmount = newAmount.toFixed(0);  
            } else {
                newAmount = newAmount.toFixed(2).replace(/\.?0+$/, '');  
            }

            if (span) {
                ingredient.childNodes[1].nodeValue = `${newAmount} ${unitAndName} `;  
            } else {
                ingredient.childNodes[1].nodeValue = `${newAmount} ${unitAndName}`;  
            }
        }
    });
}

// Fungsi untuk memberikan garis tengah jika checkbox diklik
function itemChecked(checkbox) {
    const ingredientItem = checkbox.parentElement;  
    if (checkbox.checked) {
        ingredientItem.style.textDecoration = 'line-through';  
    } else {
        ingredientItem.style.textDecoration = 'none';  
    }
}
