// Функции для работы с уведомлениями

// Загрузка уведомлений
function loadNotifications() {
    // В реальном приложении данные будут загружаться с сервера
    // Например: fetch('/api/notifications')

    // Для разработки используем заглушки
    const notificationsContainer = document.getElementById('notifications-list');
    notificationsContainer.innerHTML = '';

    const mockNotifications = [
        { id: 1, title: 'Новая оценка', message: 'Вы получили оценку "5" по математике.', date: '2026-01-29' },
        { id: 2, title: 'Объявление', message: 'Завтра собрание для родителей.', date: '2026-01-28' },
        { id: 3, title: 'Домашнее задание', message: 'Задано новое домашнее задание по физике.', date: '2026-01-27' }
    ];

    mockNotifications.forEach(notification => {
        const notificationElement = document.createElement('div');
        notificationElement.className = 'notification-item';
        notificationElement.innerHTML = `
            <h4>${notification.title}</h4>
            <p>${notification.message}</p>
            <small>${notification.date}</small>
        `;
        notificationsContainer.appendChild(notificationElement);
    });
}

// Управление настройками уведомлений
function toggleNotificationSettings() {
    const checkboxes = document.querySelectorAll('.notification-setting');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const settingType = this.id;
            const isEnabled = this.checked;

            // В реальном приложении настройки будут отправляться на сервер
            // Например: fetch('/api/notifications/settings', { method: 'POST', body: JSON.stringify({ settingType, isEnabled }) })

            alert(`Настройка "${settingType}" ${isEnabled ? 'включена' : 'отключена'}.`);
        });
    });
}

// Инициализация настроек уведомлений
function initNotificationSettings() {
    // В реальном приложении настройки будут загружаться с сервера
    // Например: fetch('/api/notifications/settings')

    // Для разработки используем заглушки
    const settings = {
        grades: true,
        announcements: true,
        messages: false
    };

    document.getElementById('grades-notifications').checked = settings.grades;
    document.getElementById('announcements-notifications').checked = settings.announcements;
    document.getElementById('messages-notifications').checked = settings.messages;
}

// Инициализация модуля уведомлений
document.addEventListener('DOMContentLoaded', function() {
    loadNotifications();
    initNotificationSettings();
    toggleNotificationSettings();
});
