// Родительский дашборд с локальным хранилищем
let currentParentData = null;
let currentChildData = null;

// Инициализация данных в локальном хранилище
function initializeParentData() {
    if (!localStorage.getItem('parentData')) {
        const parentData = {
            id: 'parent1',
            name: 'Алексей Иванович Иванов',
            email: 'ivan.alexey@parent.ru',
            phone: '+7 (999) 123-45-67',
            children: [
                {
                    id: 'student1',
                    name: 'Иван Иванов',
                    class: '10А',
                    relationship: 'Сын'
                }
            ]
        };
        localStorage.setItem('parentData', JSON.stringify(parentData));
    }

    if (!localStorage.getItem('studentsData')) {
        const studentsData = {
            'student1': {
                id: 'student1',
                name: 'Иван Иванов',
                class: '3 ПО-21',
                adress: 'Площадь Свободы д. 21 кв. 17',
                email: 'ivan.ivanov@school.ru',
                phone: '+7 (999) 123-45-67',
                grades: [
                    { subject: 'Математика', grade: 5, date: '2026-01-15', topic: 'Контрольная работа по алгебре' },
                    { subject: 'Математика', grade: 4, date: '2026-01-10', topic: 'Домашняя работа' },
                    { subject: 'Русский язык', grade: 5, date: '2026-01-12', topic: 'Сочинение' },
                    { subject: 'Физика', grade: 4, date: '2026-01-14', topic: 'Лабораторная работа' },
                    { subject: 'История', grade: 5, date: '2026-01-13', topic: 'Тест по истории' },
                    { subject: 'Английский язык', grade: 4, date: '2026-01-16', topic: 'Устный ответ' },
                    { subject: 'Литература', grade: 5, date: '2026-01-17', topic: 'Анализ стихотворения' }
                ],
                attendance: [
                    { date: '2026-01-17', status: 'присутствовал', lessons: 6 },
                    { date: '2026-01-16', status: 'присутствовал', lessons: 6 },
                    { date: '2026-01-15', status: 'присутствовал', lessons: 6 },
                    { date: '2026-01-14', status: 'присутствовал', lessons: 6 },
                    { date: '2026-01-13', status: 'отсутствовал', lessons: 6, reason: 'Болезнь' },
                    { date: '2026-01-12', status: 'присутствовал', lessons: 5 },
                    { date: '2026-01-11', status: 'присутствовал', lessons: 6 }
                ],
                homework: [
                    { subject: 'Математика', task: 'Решить задачи 1-10 на стр. 45', dueDate: '2026-01-30', priority: 'high' },
                    { subject: 'Русский язык', task: 'Написать сочинение на тему "Зима"', dueDate: '2026-01-31', priority: 'medium' },
                    { subject: 'Физика', task: 'Подготовить презентацию о законах Ньютона', dueDate: '2026-02-01', priority: 'medium' },
                    { subject: 'История', task: 'Прочитать главу 5, ответить на вопросы', dueDate: '2026-01-29', priority: 'low' },
                    { subject: 'Английский язык', task: 'Выучить 20 новых слов', dueDate: '2026-01-28', priority: 'low' },
                    { subject: 'Литература', task: 'Анализ стихотворения Пушкина', dueDate: '2026-02-02', priority: 'medium' }
                ]
            }
        };
        localStorage.setItem('studentsData', JSON.stringify(studentsData));
    }

    if (!localStorage.getItem('notificationsData')) {
        const notificationsData = [
            { id: 1, type: 'оценка', message: 'Ваш ребенок получил оценку 5 по математике', date: '2026-01-15', read: false },
            { id: 2, type: 'пропуск', message: 'Ваш ребенок отсутствовал на уроках 13 января по причине болезни', date: '2026-01-13', read: false },
            { id: 3, type: 'домашнее задание', message: 'Новое домашнее задание по физике. Срок выполнения: 1 февраля', date: '2026-01-14', read: true },
            { id: 4, type: 'объявление', message: 'Родительское собрание состоится 25 января в 18:00', date: '2026-01-10', read: true }
        ];
        localStorage.setItem('notificationsData', JSON.stringify(notificationsData));
    }

    if (!localStorage.getItem('teachersData')) {
        const teachersData = [
            { id: 'teacher1', name: 'Петров Петр Петрович', subject: 'Математика', email: 'petrov@school.ru' },
            { id: 'teacher2', name: 'Сидорова Светлана Сергеевна', subject: 'Русский язык', email: 'sidorova@school.ru' },
            { id: 'teacher3', name: 'Иванов Иван Иванович', subject: 'Физика', email: 'ivanov@school.ru' },
            { id: 'teacher4', name: 'Кузнецова Ксения Константиновна', subject: 'История', email: 'kuznetsova@school.ru' },
            { id: 'teacher5', name: 'Смирнова Софья Сергеевна', subject: 'Английский язык', email: 'smirnova@school.ru' },
            { id: 'teacher6', name: 'Попов Павел Павлович', subject: 'Литература', email: 'popov@school.ru' }
        ];
        localStorage.setItem('teachersData', JSON.stringify(teachersData));
    }

    if (!localStorage.getItem('announcementsData')) {
        const announcementsData = [
            { id: 1, title: 'Родительское собрание', content: 'Уважаемые родители! Состоится родительское собрание 25 января в 18:00 в актовом зале школы. Приглашаются все желающие.', date: '2026-01-18', important: true },
            { id: 2, title: 'Школьная олимпиада', content: 'Приглашаем учеников принять участие в школьной олимпиаде по математике, которая состоится 15 февраля. Заявки принимаются до 10 февраля у классного руководителя.', date: '2026-01-20', important: false },
            { id: 3, title: 'Экскурсия в музей', content: 'Уважаемые ученики 10-х классов! 30 января организуется экскурсия в музей космонавтики. Стоимость билета 200 рублей. Запись у классного руководителя.', date: '2026-01-19', important: false },
            { id: 4, title: 'Изменение в расписании', content: 'Завтра, 18 января, уроки начинаются в 9:00 вместо 8:30 из-за педагогического совета.', date: '2026-01-17', important: true }
        ];
        localStorage.setItem('announcementsData', JSON.stringify(announcementsData));
    }

    if (!localStorage.getItem('messagesData')) {
        const messagesData = [];
        localStorage.setItem('messagesData', JSON.stringify(messagesData));
    }
}

// Загрузка данных из локального хранилища
function loadParentData() {
    currentParentData = JSON.parse(localStorage.getItem('parentData'));
    const studentsData = JSON.parse(localStorage.getItem('studentsData'));
    
    if (currentParentData && currentParentData.children.length > 0) {
        const childId = currentParentData.children[0].id;
        currentChildData = studentsData[childId];
    }
}

// Функция для загрузки данных об успеваемости ребенка
function loadGrades() {
    const tableBody = document.querySelector('#grades-table tbody');
    tableBody.innerHTML = '';

    if (currentChildData && currentChildData.grades) {
        // Сортируем оценки по дате (новые сверху)
        const sortedGrades = [...currentChildData.grades].sort((a, b) => 
            new Date(b.date) - new Date(a.date)
        );

        sortedGrades.forEach(grade => {
            const row = document.createElement('tr');
            const gradeClass = getGradeClass(grade.grade);
            const formattedDate = new Date(grade.date).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
            
            row.innerHTML = `
                <td>${grade.subject}</td>
                <td><span class="grade-badge ${gradeClass}">${grade.grade}</span></td>
                <td>${formattedDate}</td>
                <td>${grade.topic || '-'}</td>
            `;
            tableBody.appendChild(row);
        });
    } else {
        tableBody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #666;">Данные об оценках отсутствуют</td></tr>';
    }
}

// Функция для получения CSS класса для оценки
function getGradeClass(grade) {
    switch (grade) {
        case 5: return 'grade-excellent';
        case 4: return 'grade-good';
        case 3: return 'grade-satisfactory';
        case 2: return 'grade-poor';
        default: return 'grade-default';
    }
}

// Функция для загрузки данных о посещаемости ребенка
function loadAttendance() {
    const tableBody = document.querySelector('#attendance-table tbody');
    tableBody.innerHTML = '';

    if (currentChildData && currentChildData.attendance) {
        // Сортируем посещаемость по дате (новые сверху)
        const sortedAttendance = [...currentChildData.attendance].sort((a, b) => 
            new Date(b.date) - new Date(a.date)
        );

        sortedAttendance.forEach(record => {
            const row = document.createElement('tr');
            const statusClass = getStatusClass(record.status);
            const formattedDate = new Date(record.date).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
            
            row.innerHTML = `
                <td>${formattedDate}</td>
                <td><span class="status-badge ${statusClass}">${record.status}</span></td>
                <td>${record.lessons || 6} уроков</td>
                <td>${record.reason || '-'}</td>
            `;
            tableBody.appendChild(row);
        });
    } else {
        tableBody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #666;">Данные о посещаемости отсутствуют</td></tr>';
    }
}

// Функция для получения CSS класса для статуса посещаемости
function getStatusClass(status) {
    switch (status.toLowerCase()) {
        case 'присутствовал': return 'status-present';
        case 'отсутствовал': return 'status-absent';
        case 'опоздал': return 'status-late';
        default: return 'status-default';
    }
}

// Функция для загрузки уведомлений
function loadNotifications() {
    const container = document.getElementById('notifications-container');
    const notifications = JSON.parse(localStorage.getItem('notificationsData')) || [];
    
    container.innerHTML = '';

    if (notifications.length === 0) {
        container.innerHTML = '<p style="color: #666; text-align: center;">Уведомлений пока нет</p>';
        return;
    }

    // Сортируем уведомления (непрочитанные сверху, новые сверху)
    const sortedNotifications = [...notifications].sort((a, b) => {
        if (a.read !== b.read) {
            return a.read ? 1 : -1;
        }
        return new Date(b.date) - new Date(a.date);
    });

    sortedNotifications.forEach(notification => {
        const notificationElement = document.createElement('div');
        notificationElement.className = `notification-item ${notification.read ? 'read' : 'unread'}`;
        
        const typeIcon = getNotificationIcon(notification.type);
        const formattedDate = new Date(notification.date).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short'
        });
        
        notificationElement.innerHTML = `
            <div class="notification-header">
                <span class="notification-icon">${typeIcon}</span>
                <span class="notification-type">${notification.type}</span>
                <span class="notification-date">${formattedDate}</span>
                ${!notification.read ? '<span class="notification-indicator"></span>' : ''}
            </div>
            <div class="notification-content">${notification.message}</div>
            <div class="notification-actions">
                ${!notification.read ? `<button onclick="markAsRead(${notification.id})" class="btn-mark-read">Пометить как прочитанное</button>` : ''}
            </div>
        `;
        container.appendChild(notificationElement);
    });
}

// Функция для получения иконки уведомления
function getNotificationIcon(type) {
    switch (type.toLowerCase()) {
        case 'оценка': return '📊';
        case 'пропуск': return '📅';
        case 'домашнее задание': return '📚';
        case 'объявление': return '📢';
        default: return '📌';
    }
}

// Функция для отметки уведомления как прочитанного
function markAsRead(notificationId) {
    const notifications = JSON.parse(localStorage.getItem('notificationsData')) || [];
    const notification = notifications.find(n => n.id === notificationId);
    
    if (notification) {
        notification.read = true;
        localStorage.setItem('notificationsData', JSON.stringify(notifications));
        loadNotifications();
    }
}

// Функция для загрузки списка учителей
function loadTeachers() {
    const select = document.getElementById('teacher');
    const teachers = JSON.parse(localStorage.getItem('teachersData')) || [];
    
    select.innerHTML = '<option value="">Выберите учителя</option>';

    teachers.forEach(teacher => {
        const option = document.createElement('option');
        option.value = teacher.id;
        option.textContent = `${teacher.name} (${teacher.subject})`;
        select.appendChild(option);
    });
}

// Функция для отправки сообщения учителю
function sendMessage(event) {
    event.preventDefault();

    const teacherId = document.getElementById('teacher').value;
    const message = document.getElementById('message').value;

    if (!teacherId || !message) {
        showNotification('Пожалуйста, выберите учителя и введите сообщение.', 'error');
        return;
    }

    const teachers = JSON.parse(localStorage.getItem('teachersData')) || [];
    const teacher = teachers.find(t => t.id === teacherId);
    
    if (!teacher) {
        showNotification('Учитель не найден.', 'error');
        return;
    }

    const messages = JSON.parse(localStorage.getItem('messagesData')) || [];
    const newMessage = {
        id: Date.now(),
        teacherId: teacherId,
        teacherName: teacher.name,
        message: message,
        date: new Date().toISOString(),
        status: 'sent'
    };
    
    messages.push(newMessage);
    localStorage.setItem('messagesData', JSON.stringify(messages));
    
    showNotification('Сообщение успешно отправлено учителю ' + teacher.name + '!', 'success');
    document.getElementById('message').value = '';
    
    // Добавляем уведомление о отправленном сообщении
    const notifications = JSON.parse(localStorage.getItem('notificationsData')) || [];
    const notification = {
        id: Date.now(),
        type: 'сообщение',
        message: `Вы отправили сообщение учителю ${teacher.name}`,
        date: new Date().toISOString().split('T')[0],
        read: true
    };
    notifications.push(notification);
    localStorage.setItem('notificationsData', JSON.stringify(notifications));
}

// Функция для загрузки школьных объявлений
function loadAnnouncements() {
    const container = document.getElementById('announcements-container');
    const announcements = JSON.parse(localStorage.getItem('announcementsData')) || [];
    
    container.innerHTML = '';

    if (announcements.length === 0) {
        container.innerHTML = '<p style="color: #666; text-align: center;">Объявлений пока нет</p>';
        return;
    }

    // Сортируем объявления (важные сверху, новые сверху)
    const sortedAnnouncements = [...announcements].sort((a, b) => {
        if (a.important !== b.important) {
            return b.important ? 1 : -1;
        }
        return new Date(b.date) - new Date(a.date);
    });

    sortedAnnouncements.forEach(announcement => {
        const announcementElement = document.createElement('div');
        announcementElement.className = `announcement-item ${announcement.important ? 'important' : ''}`;
        
        const formattedDate = new Date(announcement.date).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        
        announcementElement.innerHTML = `
            <div class="announcement-header">
                <h4 class="announcement-title">
                    ${announcement.title}
                    ${announcement.important ? '<span class="important-badge">Важно</span>' : ''}
                </h4>
                <div class="announcement-date">${formattedDate}</div>
            </div>
            <div class="announcement-content">${announcement.content}</div>
        `;
        container.appendChild(announcementElement);
    });
}

// Функция для показа уведомлений
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `toast-notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Функция для обновления информации о родителе
function updateParentInfo() {
    if (currentParentData) {
        const parentNameElement = document.getElementById('parent-name');
        const parentEmailElement = document.getElementById('parent-email');
        const parentPhoneElement = document.getElementById('parent-phone');
        const childNameElement = document.getElementById('child-name');
        const childClassElement = document.getElementById('child-class');
        
        if (parentNameElement) parentNameElement.textContent = currentParentData.name;
        if (parentEmailElement) parentEmailElement.textContent = currentParentData.email;
        if (parentPhoneElement) parentPhoneElement.textContent = currentParentData.phone;
        
        if (currentParentData.children.length > 0) {
            const child = currentParentData.children[0];
            if (childNameElement) childNameElement.textContent = child.name;
            if (childClassElement) childClassElement.textContent = child.class;
        }
    }
}

// Функция для вычисления статистики
function updateStatistics() {
    if (currentChildData) {
        // Средний балл
        if (currentChildData.grades && currentChildData.grades.length > 0) {
            const averageGrade = (currentChildData.grades.reduce((sum, grade) => sum + grade.grade, 0) / currentChildData.grades.length).toFixed(1);
            const avgGradeElement = document.getElementById('average-grade');
            if (avgGradeElement) avgGradeElement.textContent = averageGrade;
        }
        
        // Процент посещаемости
        if (currentChildData.attendance && currentChildData.attendance.length > 0) {
            const presentDays = currentChildData.attendance.filter(record => record.status === 'присутствовал').length;
            const attendancePercentage = ((presentDays / currentChildData.attendance.length) * 100).toFixed(1);
            const attendanceElement = document.getElementById('attendance-percentage');
            if (attendanceElement) attendanceElement.textContent = attendancePercentage + '%';
        }
        
        // Количество домашних заданий
        if (currentChildData.homework) {
            const homeworkCount = currentChildData.homework.length;
            const homeworkElement = document.getElementById('homework-count');
            if (homeworkElement) homeworkElement.textContent = homeworkCount;
        }
    }
}

// Инициализация страницы
document.addEventListener('DOMContentLoaded', () => {
    // Инициализируем данные
    initializeParentData();
    loadParentData();
    
    // Проверяем авторизацию
    if (!isAuthenticated() || getUserRole() !== 'parent') {
        window.location.href = 'index.html';
        return;
    }
    
    // Загружаем данные
    loadGrades();
    loadAttendance();
    loadNotifications();
    loadTeachers();
    loadAnnouncements();
    updateParentInfo();
    updateStatistics();
    
    // Назначаем обработчики событий
    document.getElementById('message-form').addEventListener('submit', sendMessage);
    document.getElementById('logout').addEventListener('click', logout);
    
    // Добавляем периодическое обновление данных
    setInterval(() => {
        loadParentData();
        loadGrades();
        loadAttendance();
        loadNotifications();
        loadAnnouncements();
        updateStatistics();
    }, 30000); // Обновление каждые 30 секунд
});

// Делаем функции глобально доступными
window.markAsRead = markAsRead;
window.showNotification = showNotification;
