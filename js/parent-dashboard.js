// Функция для загрузки данных об успеваемости ребенка
async function loadGrades() {
    try {
        const response = await fetchWithAuth('/api/grades', { method: 'GET' });
        const grades = await response.json();

        const tableBody = document.querySelector('#grades-table tbody');
        tableBody.innerHTML = '';

        grades.forEach(grade => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${grade.subject}</td>
                <td>${grade.grade}</td>
                <td>${new Date(grade.date).toLocaleDateString()}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Ошибка при загрузке оценок:', error);
    }
}

// Функция для загрузки данных о посещаемости ребенка
async function loadAttendance() {
    try {
        const response = await fetchWithAuth('/api/attendance', { method: 'GET' });
        const attendance = await response.json();

        const tableBody = document.querySelector('#attendance-table tbody');
        tableBody.innerHTML = '';

        attendance.forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${new Date(record.date).toLocaleDateString()}</td>
                <td>${record.status}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Ошибка при загрузке посещаемости:', error);
    }
}

// Функция для загрузки уведомлений
async function loadNotifications() {
    try {
        const response = await fetchWithAuth('/api/notifications', { method: 'GET' });
        const notifications = await response.json();

        const container = document.getElementById('notifications-container');
        container.innerHTML = '';

        notifications.forEach(notification => {
            const notificationElement = document.createElement('div');
            notificationElement.className = 'notifications';
            notificationElement.innerHTML = `
                <p><strong>${notification.type}:</strong> ${notification.message}</p>
                <p><small>${new Date(notification.date).toLocaleDateString()}</small></p>
            `;
            container.appendChild(notificationElement);
        });
    } catch (error) {
        console.error('Ошибка при загрузке уведомлений:', error);
    }
}

// Функция для загрузки списка учителей
async function loadTeachers() {
    try {
        const response = await fetchWithAuth('/api/teachers', { method: 'GET' });
        const teachers = await response.json();

        const select = document.getElementById('teacher');
        select.innerHTML = '<option value="">Выберите учителя</option>';

        teachers.forEach(teacher => {
            const option = document.createElement('option');
            option.value = teacher.id;
            option.textContent = `${teacher.lastName} ${teacher.firstName} ${teacher.middleName}`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Ошибка при загрузке списка учителей:', error);
    }
}

// Функция для отправки сообщения учителю
async function sendMessage(event) {
    event.preventDefault();

    const teacherId = document.getElementById('teacher').value;
    const message = document.getElementById('message').value;

    if (!teacherId || !message) {
        alert('Пожалуйста, выберите учителя и введите сообщение.');
        return;
    }

    try {
        const response = await fetchWithAuth('/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                teacherId,
                message,
            }),
        });

        if (response.ok) {
            alert('Сообщение успешно отправлено!');
            document.getElementById('message').value = '';
        } else {
            alert('Ошибка при отправке сообщения.');
        }
    } catch (error) {
        console.error('Ошибка при отправке сообщения:', error);
    }
}

// Функция для загрузки школьных объявлений
async function loadAnnouncements() {
    try {
        const response = await fetchWithAuth('/api/announcements', { method: 'GET' });
        const announcements = await response.json();

        const container = document.getElementById('announcements-container');
        container.innerHTML = '';

        announcements.forEach(announcement => {
            const announcementElement = document.createElement('div');
            announcementElement.className = 'announcements';
            announcementElement.innerHTML = `
                <p><strong>${announcement.title}</strong></p>
                <p>${announcement.content}</p>
                <p><small>${new Date(announcement.date).toLocaleDateString()}</small></p>
            `;
            container.appendChild(announcementElement);
        });
    } catch (error) {
        console.error('Ошибка при загрузке объявлений:', error);
    }
}

// Инициализация страницы
document.addEventListener('DOMContentLoaded', () => {
    loadGrades();
    loadAttendance();
    loadNotifications();
    loadTeachers();
    loadAnnouncements();

    document.getElementById('message-form').addEventListener('submit', sendMessage);
    document.getElementById('logout').addEventListener('click', logout);
});
