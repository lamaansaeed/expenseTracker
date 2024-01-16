document.addEventListener('DOMContentLoaded', () => {
    // Retrieve data from localStorage
    const keys = Object.keys(localStorage);
  
    // Display each stored item
    keys.forEach((key) => {
      const userDataJSON = localStorage.getItem(key);
      const userData = JSON.parse(userDataJSON);
      showUserOnScreen(userData);
    });
  });

function handleFormSubmit(event){
    event.preventDefault();
    const expense= event.target.expense.value;
    const discription = event.target.discription.value;
    const category = event.target.category.value;
    if(expense&&discription&&category){
      var userData={
        expense,
        discription,
        category,
      };
       var userDataJSON = JSON.stringify(userData);
     localStorage.setItem(userData.discription, userDataJSON);
     
    //setting input fields to default 
    event.target.expense.value = '';
    event.target.discription.value = '';
    event.target.category.value = '';
  
    }
    showUserOnScreen(userData);
  }
  function showUserOnScreen(userData){
    const parentElem = document.getElementById('listofitems')
    const childElem= document.createElement('li');
    childElem.textContent = userData.expense +" - "+userData.discription+" - "+userData.category;
    const deleteButton= document.createElement('input');
    deleteButton.type="button"
    deleteButton.value="Delete";
    deleteButton.onclick=()=>{
      localStorage.removeItem(userData.discription);
      parentElem.removeChild(childElem)
    }
    const editButton = document.createElement('input');
  editButton.type = 'button';
  editButton.value = 'Edit';
  editButton.onclick = () => {
    // Remove user details from the screen and local storage
    localStorage.removeItem(userData.discription);
    parentElem.removeChild(childElem);

    // Populate form fields with existing values
    document.getElementById('expenseamount').value = userData.expense;
    document.getElementById('discription').value = userData.discription;
    document.getElementById('category').value = userData.category;
  };

    childElem.appendChild(deleteButton);
    childElem.appendChild(editButton);
    parentElem.appendChild(childElem);
    }