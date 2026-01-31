// Функции для работы с уведомлениями

// Загрузка уведомлений
function loadNotifications() {
    console.log('Загрузка уведомлений...');
    
    // В реальном приложении данные будут загружаться с сервера
    // Например: fetch('/api/notifications')

    // Для разработки используем заглушки
    const notificationsContainer = document.getElementById('notifications-list');
    
    if (!notificationsContainer) {
        console.log('Элемент notifications-list не найден, пропускаем загрузку уведомлений');
        return;
    }
    
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
    console.log('Инициализация настроек уведомлений...');

    // Для разработки используем заглушки
    const settings = {
        grades: true,
        announcements: true,
        messages: false
    };

    // Проверяем существование элементов перед установкой значений
    const gradesCheckbox = document.getElementById('grades-notifications');
    const announcementsCheckbox = document.getElementById('announcements-notifications');
    const messagesCheckbox = document.getElementById('messages-notifications');

    if (gradesCheckbox) gradesCheckbox.checked = settings.grades;
    if (announcementsCheckbox) announcementsCheckbox.checked = settings.announcements;
    if (messagesCheckbox) messagesCheckbox.checked = settings.messages;
}

// Инициализация модуля уведомлений
document.addEventListener('DOMContentLoaded', function() {
    loadNotifications();
    initNotificationSettings();
    toggleNotificationSettings();
});
