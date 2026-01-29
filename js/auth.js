// Определение ролей и их прав (RBAC)
const ROLES = {
    student: {
        name: 'Ученик',
        permissions: ['view_grades', 'view_homework', 'view_schedule']
    },
    teacher: {
        name: 'Учитель',
        permissions: ['view_grades', 'edit_grades', 'add_homework', 'view_schedule']
    },
    classTeacher: {
        name: 'Классный руководитель',
        permissions: [
            'view_grades', 'edit_grades', 'add_homework', 'view_schedule',
            'monitor_class_performance', 'create_announcements', 'communicate_with_parents'
        ]
    },
    parent: {
        name: 'Родитель',
        permissions: ['view_child_grades', 'view_announcements']
    },
    admin: {
        name: 'Администратор',
        permissions: [
            'manage_users', 'manage_classes', 'manage_subjects',
            'view_grades', 'edit_grades', 'add_homework'
        ]
    }
};

// Функции для аутентификации и управления сессией

// Функция для входа в систему (упрощённая версия для разработки)
function login(role, username, password) {
    // Для разработки просто сохраняем информацию в localStorage
    if (username && password) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', role);
        localStorage.setItem('username', username);

        // Сохраняем ID пользователя в зависимости от роли
        if (role === 'student') {
            localStorage.setItem('studentId', 'student1');
        } else if (role === 'teacher') {
            localStorage.setItem('teacherId', 'teacher1');
        } else if (role === 'classTeacher') {
            localStorage.setItem('classTeacherId', 'classTeacher1');
        } else if (role === 'admin') {
            localStorage.setItem('adminId', 'admin1');
        } else if (role === 'parent') {
            localStorage.setItem('parentId', 'parent1');
        }

        // Перенаправляем на соответствующую страницу
        switch(role) {
            case 'student':
                window.location.href = 'student-dashboard.html';
                break;
            case 'teacher':
                window.location.href = 'teacher-dashboard.html';
                break;
            case 'classTeacher':
                window.location.href = 'class-teacher-dashboard.html';
                break;
            case 'admin':
                window.location.href = 'admin-dashboard.html';
                break;
            case 'parent':
                window.location.href = 'parent-dashboard.html';
                break;
            default:
                window.location.href = 'index.html';
        }
    } else {
        alert('Ошибка аутентификации: введите логин и пароль.');
    }
}

// Функция для выхода из системы
function logout() {
    // Очищаем информацию о пользователе
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    localStorage.removeItem('studentId');
    localStorage.removeItem('teacherId');
    localStorage.removeItem('adminId');
    localStorage.removeItem('parentId');
    localStorage.removeItem('classTeacherId');

    // Перенаправляем на главную страницу
    window.location.href = 'index.html';
}

// Функция для проверки аутентификации
function isAuthenticated() {
    return localStorage.getItem('isAuthenticated') === 'true';
}

// Функция для получения роли пользователя
function getUserRole() {
    return localStorage.getItem('userRole');
}

// Инициализация страницы входа
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Получаем параметры из URL
            const urlParams = new URLSearchParams(window.location.search);
            const role = urlParams.get('role') || 'student';

            // Получаем данные из формы
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Выполняем вход
            login(role, username, password);
        });
    }

    // Проверка аутентификации на защищенных страницах
    if (window.location.pathname.includes('dashboard.html') && !isAuthenticated()) {
        window.location.href = 'index.html';
    }
});
