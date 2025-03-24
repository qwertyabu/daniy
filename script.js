const userCardsContainer = document.getElementById('userCards');
const searchInput = document.getElementById('search');
const darkModeToggle = document.getElementById('btn');

let users = [];

fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(data => {
    users = data;
    displayUsers(users);
  })
  .catch(error => {
    console.error('Ошибка при загрузке данных:', error);
  });

function displayUsers(users) {
  userCardsContainer.innerHTML = ''; // Очищаем контейнер перед добавлением новых карточек
  users.forEach(user => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h2>${user.name}</h2>
      <p>Email: ${user.email}</p>
      <p>Адрес: ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
    `;
    userCardsContainer.appendChild(card);
  });
}




darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
      darkModeToggle.textContent = 'Светлый режим';
    } else {
      darkModeToggle.textContent = 'Тёмный режим';
    }
  });










  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase(); // Получаем поисковый запрос
    const filteredUsers = users.filter(user => {
      return (
        user.name.toLowerCase().includes(searchTerm) || // Ищем по имени
        user.email.toLowerCase().includes(searchTerm) // Ищем по email
      );
    });
    displayUsers(filteredUsers); // Отображаем отфильтрованных пользователей
  });