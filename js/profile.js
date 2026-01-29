// Функции для работы с профилем пользователя

// Загрузка данных профиля
function loadProfile() {
    // В реальном приложении данные будут загружаться с сервера
    // Например: fetch('/api/profile')

    // Для разработки используем заглушки
    const userRole = localStorage.getItem('userRole');
    let profileData = {};

    switch (userRole) {
        case 'student':
            profileData = {
                name: 'Петров Пётр',
                email: 'petrov@example.com',
                class: '10А',
                phone: '+7 (999) 123-45-67'
            };
            break;
        case 'teacher':
            profileData = {
                name: 'Иванов Иван Иванович',
                email: 'ivanov@example.com',
                subjects: 'Математика, Физика',
                phone: '+7 (999) 123-45-68'
            };
            break;
        case 'classTeacher':
            profileData = {
                name: 'Сидоров Сидор Сидорович',
                email: 'sidorov@example.com',
                class: '10А',
                phone: '+7 (999) 123-45-69'
            };
            break;
        case 'parent':
            profileData = {
                name: 'Петров Пётр Иванович',
                email: 'parent@example.com',
                child: 'Петров Пётр',
                phone: '+7 (999) 123-45-70'
            };
            break;
        case 'admin':
            profileData = {
                name: 'Администратор',
                email: 'admin@example.com',
                phone: '+7 (999) 123-45-71'
            };
            break;
        default:
            profileData = {
                name: 'Гость',
                email: 'guest@example.com'
            };
    }

    // Отображение данных профиля
    document.getElementById('profile-name').textContent = profileData.name;
    document.getElementById('profile-email').textContent = profileData.email;

    if (profileData.class) {
        document.getElementById('profile-class').textContent = profileData.class;
    }

    if (profileData.subjects) {
        document.getElementById('profile-subjects').textContent = profileData.subjects;
    }

    if (profileData.child) {
        document.getElementById('profile-child').textContent = profileData.child;
    }

    document.getElementById('profile-phone').textContent = profileData.phone;
}

// Редактирование профиля
function editProfile() {
    const editButton = document.getElementById('edit-profile-button');
    const saveButton = document.getElementById('save-profile-button');
    const profileFields = document.querySelectorAll('.profile-field');

    editButton.style.display = 'none';
    saveButton.style.display = 'inline-block';

    profileFields.forEach(field => {
        const span = field.querySelector('span');
        const currentValue = span.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentValue;
        input.className = 'profile-input';
        span.replaceWith(input);
    });
}

// Сохранение изменений профиля
function saveProfile() {
    const editButton = document.getElementById('edit-profile-button');
    const saveButton = document.getElementById('save-profile-button');
    const profileInputs = document.querySelectorAll('.profile-input');

    editButton.style.display = 'inline-block';
    saveButton.style.display = 'none';

    profileInputs.forEach(input => {
        const span = document.createElement('span');
        span.textContent = input.value;
        input.replaceWith(span);
    });

    // В реальном приложении данные будут отправляться на сервер
    // Например: fetch('/api/profile', { method: 'PUT', body: JSON.stringify(updatedProfile) })

    alert('Изменения сохранены!');
}

// Изменение пароля
function changePassword() {
    const oldPassword = prompt('Введите старый пароль:');
    const newPassword = prompt('Введите новый пароль:');

    // В реальном приложении данные будут отправляться на сервер
    // Например: fetch('/api/change-password', { method: 'POST', body: JSON.stringify({ oldPassword, newPassword }) })

    if (oldPassword && newPassword) {
        alert('Пароль успешно изменён!');
    } else {
        alert('Ошибка при изменении пароля.');
    }
}
