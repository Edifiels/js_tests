// Создаём функцию для получения данных
export async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const users = await response.json();
        
        users.forEach(user => {
            console.log(user.name);
        });
        
        return users;
    } catch (error) {
        console.error('Произошла ошибка при получении данных:', error);
        throw error;
    }
}