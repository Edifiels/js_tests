import { expect } from 'chai';
import sinon from 'sinon';
import { fetchUsers } from '../src/users.js';


// Создаём группу тестов для функции fetchUsers
describe('fetchUsers', () => {
    // Объявляем переменную для песочницы sinon
    let sandbox;

    // Этот хук выполняется перед каждым тестом
    beforeEach(() => {
        // Создаём новую песочницу для изоляции тестов
        sandbox = sinon.createSandbox();
    });

    // Этот хук выполняется после каждого теста
    afterEach(() => {
        // Восстанавливаем все заглушки и шпионов
        sandbox.restore();
    });


    // Тест проверяет успешное получение и вывод данных пользователей
    it('должна получать и выводить имена пользователей', async () => {
        // Создаём тестовые данные - массив с двумя пользователями
        const testUsers = [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Smith' }
        ];

        // Создаём заглушку для глобальной функции fetch
        global.fetch = sandbox.stub().resolves({
            // Указываем, что запрос успешен
            ok: true,
            // Метод json вернёт наши тестовые данные
            json: async () => testUsers
        });

        // Создаём шпиона для console.log
        const consoleLogSpy = sandbox.spy(console, 'log');

        // Вызываем тестируемую функцию
        await fetchUsers();

        // Проверяем, что fetch был вызван ровно один раз
        expect(global.fetch.calledOnce).to.be.true;

        // Проверяем, что fetch был вызван с правильным URL
        expect(global.fetch.calledWith('https://jsonplaceholder.typicode.com/users')).to.be.true;

        // Проверяем, что console.log был вызван с именем первого пользователя
        expect(consoleLogSpy.calledWith('John Doe')).to.be.true;

        // Проверяем, что console.log был вызван с именем второго пользователя
        expect(consoleLogSpy.calledWith('Jane Smith')).to.be.true;
    });



    // Тест проверяет обработку ошибок при неудачном запросе
    it('должна обрабатывать ошибки при неудачном запросе', async () => {
        // Создаём заглушку для неудачного запроса
        global.fetch = sandbox.stub().resolves({
            // Указываем, что запрос неуспешен
            ok: false,
            // Указываем код ошибки
            status: 404
        });

        // Оборачиваем вызов в try-catch для проверки выброса ошибки
        try {
            // Вызываем тестируемую функцию
            await fetchUsers();
            // Если ошибка не была выброшена, проваливаем тест
            expect.fail('Функция должна была выбросить ошибку');
        } catch (error) {
            // Проверяем, что сообщение об ошибке содержит правильный статус
            expect(error.message).to.include('HTTP error! status: 404');
        }
    });

    
});