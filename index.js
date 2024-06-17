
document.addEventListener('DOMContentLoaded', () => {
  fetchExpenses();

  const form = document.getElementById('expenseForm');
  form.addEventListener('submit', handleFormSubmit); // Connect form submission to the function
});
function fetchExpenses() {
  fetch('http://localhost:3000/api/expenses')
    .then(response => response.json())
    .then(data => {
      data.forEach(userData => {
        showUserOnScreen(userData);
      });
    })
    .catch(error => console.error('Error fetching expenses:', error));
}

function handleFormSubmit(event) {
  event.preventDefault();
  console.log("i am here 2");
  const expense = event.target.expense.value;
  const description = event.target.description.value;
  const category = event.target.category.value;

  if (expense && description && category) {
    const userData = {
      expense,
      description,
      category
    };

    fetch('http://localhost:3000/api/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(() => {
        event.target.expense.value = '';
        event.target.description.value = '';
        event.target.category.value = '';
        showUserOnScreen(userData);
      })
      .catch(error => console.error('Error adding expense:', error));
  }
}

function showUserOnScreen(userData) {
  const parentElem = document.getElementById('listofitems');
  const childElem = document.createElement('li');
  childElem.textContent = `${userData.expense} - ${userData.description} - ${userData.category}`;
  const deleteButton = document.createElement('input');
  deleteButton.type = 'button';
  deleteButton.value = 'Delete';
  deleteButton.onclick = () => {
    fetch(`http://localhost:3000/api/expenses/${userData.id}`, {
      method: 'DELETE'
    })
      .then(() => {
        parentElem.removeChild(childElem);
      })
      .catch(error => console.error('Error deleting expense:', error));
  };
  const editButton = document.createElement('input');
  editButton.type = 'button';
  editButton.value = 'Edit';
  editButton.onclick = () => {
    fetch(`http://localhost:3000/api/expenses/${userData.id}`, {
      method: 'DELETE'
    })
      .then(() => {
        parentElem.removeChild(childElem);
        document.getElementById('expenseamount').value = userData.expense;
        document.getElementById('description').value = userData.description;
        document.getElementById('category').value = userData.category;
      })
      .catch(error => console.error('Error editing expense:', error));
  };

  childElem.appendChild(deleteButton);
  childElem.appendChild(editButton);
  parentElem.appendChild(childElem);
}
