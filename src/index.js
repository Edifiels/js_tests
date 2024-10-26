import { fetchUsers } from './users.js';

// Пример использования
fetchUsers()
    .then(() => console.log('Данные успешно получены'))
    .catch(error => console.error('Ошибка:', error));