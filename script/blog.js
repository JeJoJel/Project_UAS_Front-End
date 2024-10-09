const originalValues = {};
let activeButton = null;

document.addEventListener('DOMContentLoaded', () => {
    storeOriginalValues();
    activeButton = document.querySelector('.ingredients-button.active');
});

function storeOriginalValues() {
    const ingredients = document.querySelectorAll('#ingredients li');
    ingredients.forEach(ingredient => {
        const textNode = ingredient.childNodes[1].nodeValue.trim();  
        originalValues[ingredient.id] = textNode;
    });
}

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

function itemChecked(checkbox) {
    const ingredientItem = checkbox.parentElement;  // Parent <li>
    if (checkbox.checked) {
        ingredientItem.style.textDecoration = 'line-through';  // Strike-through when checked
    } else {
        ingredientItem.style.textDecoration = 'none';  // Remove strike-through when unchecked
    }
}

storeOriginalValues();
