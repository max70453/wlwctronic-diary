// Mock данные для преподавателя
const teacherMockData = {
    teachers: {
        'teacher1': {
            id: 'teacher1',
            name: 'Иванов Иван Иванович',
            subjects: ['Математика', 'Физика'],
            email: 'ivanov@school.ru',
            phone: '+7 (123) 456-78-90',
            experience: '15 лет',
            qualification: 'Высшая категория',
            classes: [
                { id: 'class1', name: '10А класс', subject: 'Математика', students: 25 },
                { id: 'class2', name: '10Б класс', subject: 'Математика', students: 23 },
                { id: 'class3', name: '11А класс', subject: 'Физика', students: 22 }
            ],
            schedule: [
                { day: 'Понедельник', time: '08:30-09:15', class: '10А', subject: 'Математика', room: '201' },
                { day: 'Понедельник', time: '09:25-10:10', class: '10Б', subject: 'Математика', room: '202' },
                { day: 'Вторник', time: '10:20-11:05', class: '11А', subject: 'Физика', room: '301' },
                { day: 'Среда', time: '08:30-09:15', class: '10А', subject: 'Математика', room: '201' },
                { day: 'Четверг', time: '11:15-12:00', class: '11А', subject: 'Физика', room: '301' },
                { day: 'Пятница', time: '09:25-10:10', class: '10Б', subject: 'Математика', room: '202' }
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
                { id: 1, title: 'Контрольная работа по математике', content: '30 января в 10А классе будет контрольная работа по теме "Производные"', date: '28.01.2026', important: true },
                { id: 2, title: 'Родительское собрание', content: '5 февраля в 18:00 состоится родительское собрание для 10 классов', date: '27.01.2026', important: false },
                { id: 3, title: 'Олимпиада по физике', content: 'Приглашаются желающие участвовать в городской олимпиаде по физике', date: '26.01.2026', important: false }
            ],
            statistics: {
                totalStudents: 70,
                averageGrades: {
                    'Математика': 4.2,
                    'Физика': 4.5
                },
                classesCount: 3,
                lessonsPerWeek: 18
            }
        }
    }
};

// Функции для работы с данными преподавателя
function getTeacherData(teacherId) {
    const stored = localStorage.getItem('teacherData');
    if (stored) {
        const data = JSON.parse(stored);
        return data.teachers[teacherId] || teacherMockData.teachers[teacherId];
    }
    return teacherMockData.teachers[teacherId];
}

function saveTeacherData(teacherId, data) {
    const stored = localStorage.getItem('teacherData');
    let allData = stored ? JSON.parse(stored) : teacherMockData;
    allData.teachers[teacherId] = data;
    localStorage.setItem('teacherData', JSON.stringify(allData));
}

// Инициализация данных в localStorage
if (!localStorage.getItem('teacherData')) {
    localStorage.setItem('teacherData', JSON.stringify(teacherMockData));
}
