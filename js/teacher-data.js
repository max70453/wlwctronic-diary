// Mock данные для преподавателя
const teacherMockData = {
    teachers: {
        'teacher1': {
            id: 'teacher1',
            name: 'Иванов Иван Иванович',
            subjects: ['Информатика', 'Базы данных'],
            email: 'ivanov@school.ru',
            phone: '+7 (123) 456-78-90',
            experience: 'стаж 15 лет',
            qualification: 'Высшая категория',
            classes: [
                { id: 'class1', name: '2ПО-25', subject: 'Информатика', students: 12 },
                { id: 'class2', name: '1КСК-25', subject: 'Базы данных', students: 10 }
            ],
            schedule: [
                { day: 'Понедельник', time: '08:30-10:00', class: '2ПО-25', subject: 'Информатика', room: '201' },
                { day: 'Понедельник', time: '10:10-11:40', class: '1КСК-25', subject: 'Базы данных', room: '202' },
                { day: 'Вторник', time: '08:30-10:00', class: '2ПО-25', subject: 'Информатика', room: '201' },
                { day: 'Вторник', time: '10:10-11:40', class: '1КСК-25', subject: 'Базы данных', room: '202' },
                { day: 'Среда', time: '08:30-10:00', class: '2ПО-25', subject: 'Информатика', room: '201' },
                { day: 'Среда', time: '10:10-11:40', class: '2ПО-25', subject: 'Информатика', room: '201' },
                { day: 'Четверг', time: '08:30-10:00', class: '1КСК-25', subject: 'Базы данных', room: '202' },
                { day: 'Четверг', time: '10:10-11:40', class: '1КСК-25', subject: 'Базы данных', room: '202' },
                { day: 'Пятница', time: '08:30-10:00', class: '2ПО-25', subject: 'Информатика', room: '201' },
                { day: 'Пятница', time: '10:10-11:40', class: '1КСК-25', subject: 'Базы данных', room: '202' }
            ],
            recentGrades: [
                { id: 1, student: 'Петров А.С.', class: '10А', subject: 'Математика', grade: '5', date: '28.01.2026', topic: 'Контрольная работа' },
                { id: 2, student: 'Сидорова М.И.', class: '10Б', subject: 'Математика', grade: '4', date: '27.01.2026', topic: 'Самостоятельная работа' },
                { id: 3, student: 'Козлов Д.В.', class: '11А', subject: 'Физика', grade: '5', date: '26.01.2026', topic: 'Лабораторная работа' },
                { id: 4, student: 'Новикова Е.А.', class: '10А', subject: 'Математика', grade: '3', date: '25.01.2026', topic: 'Устный ответ' }
            ],
            homework: [
                { id: 1, class: '10А', subject: 'Математика', task: 'Решить задачи №123-125, стр.45', dueDate: '30.01.2026', priority: 'high' },
                { id: 2, class: '10Б', subject: 'Математика', task: 'Подготовить доклад на тему "Производные"', dueDate: '31.01.2026', priority: 'medium' },
                { id: 3, class: '11А', subject: 'Физика', task: 'Лабораторная работа №4, стр.78', dueDate: '01.02.2026', priority: 'high' }
            ],
            announcements: [
                { id: 1, title: 'Контрольная работа по информатике', content: '30 января в группе 2ПО-25 будет контрольная работа по теме "Алгоритмы"', date: '28.01.2026', important: true },
                { id: 2, title: 'Родительское собрание', content: '5 февраля в 18:00 состоится родительское собрание для 2ПО-25 и 1КСК-25', date: '27.01.2026', important: false },
                { id: 3, title: 'Олимпиада по физике', content: 'Приглашаются желающие участвовать в городской олимпиаде по физике из групп 2ПО-25 и 1КСК-25', date: '26.01.2026', important: false }
            ],
            statistics: {
                totalStudents: 22,
                averageGrades: {
                    'Информатика': 4.2,
                    'Базы данных': 4.5
                },
                classesCount: 2,
                lessonsPerWeek: 10
            }
        }
    }
};

// Функции для работы с данными преподавателя
function getTeacherData(teacherId) {
    console.log('Запрос данных для teacherId:', teacherId);
    
    const stored = localStorage.getItem('teacherData');
    console.log('Данные в localStorage:', stored ? 'найдены' : 'не найдены');
    
    if (stored) {
        const data = JSON.parse(stored);
        const teacher = data.teachers[teacherId] || teacherMockData.teachers[teacherId];
        console.log('Данные преподавателя:', teacher ? 'найдены' : 'не найдены');
        return teacher;
    }
    const teacher = teacherMockData.teachers[teacherId];
    console.log('Данные из mock:', teacher ? 'найдены' : 'не найдены');
    return teacher;
}

function saveTeacherData(teacherId, data) {
    const stored = localStorage.getItem('teacherData');
    let allData = stored ? JSON.parse(stored) : teacherMockData;
    allData.teachers[teacherId] = data;
    localStorage.setItem('teacherData', JSON.stringify(allData));
}

// Инициализация данных в localStorage
if (!localStorage.getItem('teacherData')) {
    console.log('Инициализация данных в localStorage');
    localStorage.setItem('teacherData', JSON.stringify(teacherMockData));
    console.log('Данные инициализированы');
} else {
    console.log('Данные в localStorage уже существуют');
}
