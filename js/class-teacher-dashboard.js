// Функции для работы с кабинетом классного руководителя

// Загрузка информации о классном руководителе
function loadClassTeacherInfo() {
    // В реальном приложении данные будут загружаться с сервера
    // Например: fetch('/api/class-teacher/info')

    // Для разработки используем заглушки
    document.getElementById('class-teacher-name-value').textContent = 'Иванов Иван Иванович';
    document.getElementById('class-teacher-class-value').textContent = '10А';
}

// Загрузка данных об успеваемости класса
function loadClassPerformance() {
    // В реальном приложении данные будут загружаться с сервера
    // Например: fetch('/api/class-performance')

    // Для разработки используем заглушки
    const classPerformanceContainer = document.getElementById('class-performance');
    classPerformanceContainer.innerHTML = `
        <table class="MuiTable-root">
            <thead>
                <tr>
                    <th>Ученик</th>
                    <th>Средний балл</th>
                    <th>Пропуски</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Петров Пётр</td>
                    <td>4.5</td>
                    <td>2</td>
                </tr>
                <tr>
                    <td>Сидоров Сидор</td>
                    <td>3.8</td>
                    <td>5</td>
                </tr>
            </tbody>
        </table>
    `;
}

// Загрузка формы для создания объявлений
function loadAnnouncementsForm() {
    const announcementsFormContainer = document.getElementById('announcements-form');
    announcementsFormContainer.innerHTML = `
        <div class="announcements-form-container">
            <div class="form-row">
                <input type="text" class="form-control" id="announcement-title" placeholder="Заголовок объявления">
            </div>
            <div class="form-row">
                <textarea class="form-control" id="announcement-content" placeholder="Текст объявления" rows="4"></textarea>
            </div>
            <div class="form-row">
                <button class="MuiButton-root MuiButton-contained MuiButton-containedPrimary" onclick="createAnnouncement()">
                    <span class="MuiButton-label">Создать объявление</span>
                </button>
            </div>
        </div>
    `;
}

// Создание объявления
function createAnnouncement() {
    const title = document.getElementById('announcement-title').value;
    const content = document.getElementById('announcement-content').value;

    // В реальном приложении данные будут отправляться на сервер
    // Например: fetch('/api/announcements', { method: 'POST', body: JSON.stringify({ title, content }) })

    alert(`Объявление "${title}" создано!`);
    document.getElementById('announcement-title').value = '';
    document.getElementById('announcement-content').value = '';
}

// Загрузка формы для общения с родителями
function loadCommunicationForm() {
    const communicationFormContainer = document.getElementById('communication-form');
    communicationFormContainer.innerHTML = `
        <div class="communication-form-container">
            <div class="form-row">
                <select class="form-control" id="parent-select">
                    <option value="">Выберите родителя</option>
                    <option value="parent1">Петров Пётр Иванович</option>
                    <option value="parent2">Сидоров Сидор Сидорович</option>
                </select>
            </div>
            <div class="form-row">
                <textarea class="form-control" id="message-content" placeholder="Текст сообщения" rows="4"></textarea>
            </div>
            <div class="form-row">
                <button class="MuiButton-root MuiButton-contained MuiButton-containedPrimary" onclick="sendMessageToParent()">
                    <span class="MuiButton-label">Отправить сообщение</span>
                </button>
            </div>
        </div>
    `;
}

// Отправка сообщения родителю
function sendMessageToParent() {
    const parent = document.getElementById('parent-select').value;
    const message = document.getElementById('message-content').value;

    // В реальном приложении данные будут отправляться на сервер
    // Например: fetch('/api/messages', { method: 'POST', body: JSON.stringify({ parent, message }) })

    alert(`Сообщение отправлено родителю!`);
    document.getElementById('message-content').value = '';
}

// Инициализация дашборда
document.addEventListener('DOMContentLoaded', function() {
    loadClassTeacherInfo();
    loadClassPerformance();
    loadAnnouncementsForm();
    loadCommunicationForm();
});
