// Функции для работы с кабинетом классного руководителя

// Массив для хранения домашних заданий (в реальном приложении это будет на сервере)
let homeworkList = [];

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

// Загрузка формы для добавления домашних заданий
function loadHomeworkForm() {
    const homeworkFormContainer = document.getElementById('homework-form');
    homeworkFormContainer.innerHTML = `
        <div class="homework-form-container">
            <div class="form-row">
                <input type="text" class="form-control" id="homework-subject" placeholder="Предмет">
            </div>
            <div class="form-row">
                <textarea class="form-control" id="homework-description" placeholder="Описание задания" rows="3"></textarea>
            </div>
            <div class="form-row">
                <input type="date" class="form-control" id="homework-due-date">
            </div>
            <div class="form-row">
                <div style="flex: 1;">
                    <input type="file" id="homework-file" class="form-control" style="display: none;">
                    <button type="button" class="MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary" onclick="document.getElementById('homework-file').click()" style="width: 100%; margin-bottom: 10px;">
                        <span class="MuiButton-label">Прикрепить файл</span>
                    </button>
                    <div id="file-name" style="font-size: 0.875rem; color: #666; margin-bottom: 10px;">Файл не выбран</div>
                </div>
            </div>
            <div class="form-row">
                <button class="MuiButton-root MuiButton-contained MuiButton-containedPrimary" onclick="addHomework()" style="width: 100%;">
                    <span class="MuiButton-label">Добавить задание</span>
                </button>
            </div>
        </div>
    `;

    // Обработчик выбора файла
    document.getElementById('homework-file').addEventListener('change', function(e) {
        const fileName = e.target.files.length > 0 ? e.target.files[0].name : 'Файл не выбран';
        document.getElementById('file-name').textContent = fileName;
    });

    // Установка даты сдачи по умолчанию (завтрашний день)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('homework-due-date').valueAsDate = tomorrow;

    // Загрузка списка домашних заданий
    loadHomeworkList();
}

// Добавление домашнего задания
function addHomework() {
    const subject = document.getElementById('homework-subject').value;
    const description = document.getElementById('homework-description').value;
    const dueDate = document.getElementById('homework-due-date').value;
    const fileInput = document.getElementById('homework-file');
    
    if (!subject || !description || !dueDate) {
        alert('Пожалуйста, заполните все обязательные поля');
        return;
    }

    const newHomework = {
        id: Date.now().toString(),
        subject,
        description,
        dueDate,
        createdAt: new Date().toISOString(),
        fileName: fileInput.files.length > 0 ? fileInput.files[0].name : null,
        fileData: null
    };

    // Если выбран файл, считываем его содержимое
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            newHomework.fileData = e.target.result.split(',')[1]; // Сохраняем только содержимое файла в base64
            saveHomework(newHomework);
        };
        
        reader.readAsDataURL(file);
    } else {
        saveHomework(newHomework);
    }
}

// Сохранение домашнего задания в localStorage
function saveHomework(homework) {
    // Получаем текущий список заданий
    let homeworkList = JSON.parse(localStorage.getItem('homeworkList') || '[]');
    
    // Добавляем новое задание
    homeworkList.push(homework);
    
    // Сохраняем обновленный список
    localStorage.setItem('homeworkList', JSON.stringify(homeworkList));
    
    // Обновляем отображение
    loadHomeworkList();
    
    // Очищаем форму
    document.getElementById('homework-subject').value = '';
    document.getElementById('homework-description').value = '';
    document.getElementById('file-name').textContent = 'Файл не выбран';
    document.getElementById('homework-file').value = '';
    
    // Устанавливаем дату сдачи на завтра
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('homework-due-date').valueAsDate = tomorrow;
    
    alert('Домашнее задание успешно добавлено!');
}

// Загрузка списка домашних заданий
function loadHomeworkList() {
    const homeworkListContainer = document.getElementById('homework-list');
    const homeworkList = JSON.parse(localStorage.getItem('homeworkList') || '[]');
    
    if (homeworkList.length === 0) {
        homeworkListContainer.innerHTML = '<p>Нет добавленных заданий</p>';
        return;
    }
    
    let html = `
        <div class="MuiTableContainer-root">
            <table class="MuiTable-root" style="width: 100%;">
                <thead>
                    <tr>
                        <th>Предмет</th>
                        <th>Задание</th>
                        <th>Срок сдачи</th>
                        <th>Файл</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    homeworkList.forEach(homework => {
        const dueDate = new Date(homework.dueDate).toLocaleDateString('ru-RU');
        const fileLink = homework.fileName ? 
            `<a href="#" onclick="downloadFile('${homework.id}'); return false;">${homework.fileName}</a>` : 
            'Нет файла';
            
        html += `
            <tr>
                <td>${homework.subject}</td>
                <td>${homework.description}</td>
                <td>${dueDate}</td>
                <td>${fileLink}</td>
                <td>
                    <button class="MuiButton-root MuiButton-text MuiButton-textPrimary" onclick="deleteHomework('${homework.id}')">
                        <span class="MuiButton-label">Удалить</span>
                    </button>
                </td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
        </div>
    `;
    
    homeworkListContainer.innerHTML = html;
}

// Удаление домашнего задания
function deleteHomework(homeworkId) {
    if (!confirm('Вы уверены, что хотите удалить это задание?')) {
        return;
    }
    
    let homeworkList = JSON.parse(localStorage.getItem('homeworkList') || '[]');
    homeworkList = homeworkList.filter(hw => hw.id !== homeworkId);
    localStorage.setItem('homeworkList', JSON.stringify(homeworkList));
    
    loadHomeworkList();
}

// Скачивание прикрепленного файла
function downloadFile(homeworkId) {
    const homeworkList = JSON.parse(localStorage.getItem('homeworkList') || '[]');
    const homework = homeworkList.find(hw => hw.id === homeworkId);
    
    if (!homework || !homework.fileData) {
        alert('Файл не найден');
        return;
    }
    
    // Создаем временную ссылку для скачивания
    const link = document.createElement('a');
    link.href = `data:application/octet-stream;base64,${homework.fileData}`;
    link.download = homework.fileName || 'homework_file';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Инициализация дашборда
document.addEventListener('DOMContentLoaded', function() {
    loadClassTeacherInfo();
    loadClassPerformance();
    loadAnnouncementsForm();
    loadCommunicationForm();
    loadHomeworkForm();
});
