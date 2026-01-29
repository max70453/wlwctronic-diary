// Базовые функции API для работы с данными

// Моковые данные для разработки
const mockData = {
    announcements: [
        {
            id: 'announcement1',
            title: 'Школьная олимпиада',
            content: 'Уважаемые ученики! Приглашаем вас принять участие в школьной олимпиаде по математике, которая состоится 15 февраля. Заявки принимаются до 10 февраля у вашего классного руководителя.',
            date: '2026-01-20',
            forClass: 'all'
        },
        {
            id: 'announcement2',
            title: 'Родительское собрание',
            content: 'Уважаемые родители и ученики! Состоится родительское собрание 25 января в 18:00 в актовом зале школы. Приглашаются все желающие.',
            date: '2026-01-18',
            forClass: 'all'
        },
        {
            id: 'announcement3',
            title: 'Экскурсия в музей',
            content: 'Уважаемые ученики 10-х классов! 30 января организуется экскурсия в музей космонавтики. Стоимость билета 200 рублей. Запись у классного руководителя.',
            date: '2026-01-19',
            forClass: '10'
        }
    ],
    learningMaterials: {
        'Математика': [
            {
                id: 'material1',
                title: 'Тригонометрические функции',
                description: 'Презентация по теме "Тригонометрические функции"',
                type: 'presentation',
                url: '#',
                date: '2026-01-10'
            },
            {
                id: 'material2',
                title: 'Решение квадратных уравнений',
                description: 'Видеоурок по решению квадратных уравнений',
                type: 'video',
                url: '#',
                date: '2026-01-15'
            },
            {
                id: 'material3',
                title: 'Производные функции',
                description: 'Конспект урока по производным',
                type: 'document',
                url: '#',
                date: '2026-01-20'
            }
        ],
        'Физика': [
            {
                id: 'material4',
                title: 'Законы Ньютона',
                description: 'Конспект урока по законам Ньютона',
                type: 'document',
                url: '#',
                date: '2026-01-12'
            },
            {
                id: 'material5',
                title: 'Электрические цепи',
                description: 'Лабораторная работа по электричеству',
                type: 'document',
                url: '#',
                date: '2026-01-18'
            }
        ],
        'Русский язык': [
            {
                id: 'material6',
                title: 'Сочинение-рассуждение',
                description: 'Методические рекомендации по написанию',
                type: 'document',
                url: '#',
                date: '2026-01-14'
            },
            {
                id: 'material7',
                title: 'Анализ поэтического текста',
                description: 'Видеоурок по анализу стихотворений',
                type: 'video',
                url: '#',
                date: '2026-01-22'
            }
        ],
        'История': [
            {
                id: 'material8',
                title: 'Древняя Русь',
                description: 'Презентация по истории Древней Руси',
                type: 'presentation',
                url: '#',
                date: '2026-01-16'
            }
        ],
        'Английский язык': [
            {
                id: 'material9',
                title: 'Present Perfect Tense',
                description: 'Грамматический справочник',
                type: 'document',
                url: '#',
                date: '2026-01-19'
            },
            {
                id: 'material10',
                title: 'Business English',
                description: 'Аудиокурс делового английского',
                type: 'video',
                url: '#',
                date: '2026-01-25'
            }
        ]
    },
    students: {
        'student1': {
            id: 'student1',
            name: 'Иван Иванов',
            class: '10А',
            email: 'ivan.ivanov@school.ru',
            phone: '+7 (999) 123-45-67',
            grades: [
                { subject: 'Математика', grade: 5, date: '2026-01-15' },
                { subject: 'Математика', grade: 4, date: '2026-01-10' },
                { subject: 'Русский язык', grade: 5, date: '2026-01-12' },
                { subject: 'Физика', grade: 4, date: '2026-01-14' },
                { subject: 'История', grade: 5, date: '2026-01-13' }
            ],
            attendance: [
                { date: '2026-01-15', status: 'присутствовал' },
                { date: '2026-01-14', status: 'присутствовал' },
                { date: '2026-01-13', status: 'отсутствовал' },
                { date: '2026-01-12', status: 'присутствовал' },
                { date: '2026-01-11', status: 'присутствовал' }
            ],
            schedule: [
                { day: 'Понедельник', lessons: [
                    { time: '08:30-09:15', subject: 'Математика', teacher: 'Петров П.П.', room: '101' },
                    { time: '09:25-10:10', subject: 'Русский язык', teacher: 'Сидорова С.С.', room: '102' },
                    { time: '10:30-11:15', subject: 'Физика', teacher: 'Иванов И.И.', room: '203' }
                ]},
                { day: 'Вторник', lessons: [
                    { time: '08:30-09:15', subject: 'История', teacher: 'Кузнецова К.К.', room: '104' },
                    { time: '09:25-10:10', subject: 'Английский язык', teacher: 'Смирнова С.С.', room: '205' },
                    { time: '10:30-11:15', subject: 'Биология', teacher: 'Попов П.П.', room: '206' }
                ]}
            ],
            homework: [
                { subject: 'Математика', task: 'Решить задачи 1-10 на стр. 45', dueDate: '2026-01-30' },
                { subject: 'Русский язык', task: 'Написать сочинение на тему "Зима"', dueDate: '2026-01-31' },
                { subject: 'Физика', task: 'Подготовить презентацию о законах Ньютона', dueDate: '2026-02-01' },
                { subject: 'История', task: 'Прочитать главу 5, ответить на вопросы', dueDate: '2026-01-29' },
                { subject: 'Английский язык', task: 'Выучить 20 новых слов', dueDate: '2026-01-28' },
                { subject: 'Литература', task: 'Анализ стихотворения Пушкина', dueDate: '2026-02-02' }
            ]
        },
        'student2': {
            id: 'student2',
            name: 'Мария Петрова',
            class: '10А',
            grades: [
                { subject: 'Математика', grade: 4, date: '2026-01-15' },
                { subject: 'Математика', grade: 5, date: '2026-01-10' },
                { subject: 'Русский язык', grade: 4, date: '2026-01-12' },
                { subject: 'Физика', grade: 5, date: '2026-01-14' },
                { subject: 'История', grade: 4, date: '2026-01-13' }
            ],
            attendance: [
                { date: '2026-01-15', status: 'присутствовал' },
                { date: '2026-01-14', status: 'присутствовал' },
                { date: '2026-01-13', status: 'отсутствовал' },
                { date: '2026-01-12', status: 'присутствовал' },
                { date: '2026-01-11', status: 'присутствовал' }
            ],
            schedule: [
                { day: 'Понедельник', lessons: [
                    { time: '08:30-09:15', subject: 'Математика', teacher: 'Петров П.П.', room: '101' },
                    { time: '09:25-10:10', subject: 'Русский язык', teacher: 'Сидорова С.С.', room: '102' },
                    { time: '10:30-11:15', subject: 'Физика', teacher: 'Иванов И.И.', room: '203' }
                ]},
                { day: 'Вторник', lessons: [
                    { time: '08:30-09:15', subject: 'История', teacher: 'Кузнецова К.К.', room: '104' },
                    { time: '09:25-10:10', subject: 'Английский язык', teacher: 'Смирнова С.С.', room: '205' },
                    { time: '10:30-11:15', subject: 'Биология', teacher: 'Попов П.П.', room: '206' }
                ]}
            ],
            homework: [
                { subject: 'Математика', task: 'Решить задачи 11-20 на стр. 46', dueDate: '2026-01-20' },
                { subject: 'Русский язык', task: 'Написать сочинение на тему "Весна"', dueDate: '2026-01-22' },
                { subject: 'Физика', task: 'Подготовить доклад о термодинамике', dueDate: '2026-01-25' }
            ]
        }
    },
    teachers: {
        'teacher1': {
            id: 'teacher1',
            name: 'Петр Петрович Петров',
            subjects: ['Математика'],
            classes: ['10А', '11Б'],
            students: ['student1', 'student2']
        },
        'teacher2': {
            id: 'teacher2',
            name: 'Светлана Сергеевна Сидорова',
            subjects: ['Русский язык'],
            classes: ['10А', '11Б'],
            students: ['student1', 'student2']
        }
    },
    classes: {
        '10А': {
            name: '10А',
            students: ['student1', 'student2'],
            schedule: [
                { day: 'Понедельник', lessons: [
                    { time: '08:30-09:15', subject: 'Математика', teacher: 'teacher1', room: '101' },
                    { time: '09:25-10:10', subject: 'Русский язык', teacher: 'teacher2', room: '102' },
                    { time: '10:30-11:15', subject: 'Физика', teacher: 'teacher3', room: '203' }
                ]}
            ]
        }
    },
    parents: {
        'parent1': {
            id: 'parent1',
            name: 'Алексей Иванович Иванов',
            children: ['student1'],
            notifications: [
                { type: 'оценка', message: 'Ваш ребенок получил низкую оценку по математике: 2', date: '2026-01-16' },
                { type: 'пропуск', message: 'Ваш ребенок пропустил урок истории 13 января', date: '2026-01-13' }
            ]
        }
    }
};

// Функция для получения данных об ученике
async function getStudentInfo(studentId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockData.students[studentId] || {});
        }, 500);
    });
}

// Функция для получения расписания ученика
async function getStudentSchedule(studentId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockData.students[studentId]?.schedule || []);
        }, 500);
    });
}

// Функция для получения оценок ученика
async function getStudentGrades(studentId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockData.students[studentId]?.grades || []);
        }, 500);
    });
}

// Функция для получения посещаемости ученика
async function getStudentAttendance(studentId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockData.students[studentId]?.attendance || []);
        }, 500);
    });
}

// Функция для получения домашних заданий ученика
async function getStudentHomework(studentId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockData.students[studentId]?.homework || []);
        }, 500);
    });
}

// Функция для получения статистики успеваемости
async function getStudentPerformanceStats(studentId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const grades = mockData.students[studentId]?.grades || [];
            const averageGrade = grades.length > 0
                ? (grades.reduce((sum, grade) => sum + grade.grade, 0) / grades.length).toFixed(2)
                : 0;

            const subjects = [...new Set(grades.map(grade => grade.subject))];
            const subjectStats = subjects.map(subject => {
                const subjectGrades = grades.filter(grade => grade.subject === subject);
                const avg = subjectGrades.length > 0
                    ? (subjectGrades.reduce((sum, grade) => sum + grade.grade, 0) / subjectGrades.length).toFixed(2)
                    : 0;
                return { subject, average: avg, count: subjectGrades.length };
            });

            resolve({
                averageGrade,
                subjectStats,
                totalGrades: grades.length
            });
        }, 500);
    });
}

// Функции для работы с данными учителя

// Функция для получения информации об учителе
async function getTeacherInfo(teacherId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockData.teachers[teacherId] || {});
        }, 500);
    });
}

// Функция для получения списка классов учителя
async function getTeacherClasses(teacherId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const teacher = mockData.teachers[teacherId];
            if (!teacher) {
                resolve([]);
                return;
            }

            const classes = teacher.classes.map(className => {
                return {
                    name: className,
                    students: mockData.classes[className]?.students.map(studentId => {
                        return mockData.students[studentId];
                    }).filter(Boolean) || []
                };
            });

            resolve(classes);
        }, 500);
    });
}

// Функция для выставления оценки ученику
async function setStudentGrade(studentId, subject, grade, date) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (!mockData.students[studentId]) {
                resolve({ success: false, error: 'Студент не найден' });
                return;
            }

            mockData.students[studentId].grades.push({ subject, grade, date });
            resolve({ success: true });
        }, 500);
    });
}

// Функция для добавления домашнего задания
async function addHomework(className, subject, task, dueDate) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (!mockData.classes[className]) {
                resolve({ success: false, error: 'Класс не найден' });
                return;
            }

            mockData.classes[className].students.forEach(studentId => {
                if (mockData.students[studentId]) {
                    mockData.students[studentId].homework.push({ subject, task, dueDate });
                }
            });

            resolve({ success: true });
        }, 500);
    });
}

// Функции для работы с объявлениями и учебными материалами

// Функция для получения объявлений
async function getAnnouncements(studentClass) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const classPrefix = studentClass.substring(0, 2);
            const filteredAnnouncements = mockData.announcements.filter(announcement => {
                return announcement.forClass === 'all' || announcement.forClass === classPrefix;
            });

            resolve(filteredAnnouncements);
        }, 500);
    });
}

// Функция для получения учебных материалов
async function getLearningMaterials() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockData.learningMaterials);
        }, 500);
    });
}

// Функции для работы с ролью "родитель"

// Функция для получения данных о ребенке родителя
async function getParentChildInfo(parentId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const parent = mockData.parents[parentId];
            if (!parent || !parent.children || parent.children.length === 0) {
                resolve({ success: false, error: 'У родителя нет детей в системе' });
                return;
            }

            const childId = parent.children[0]; // Предполагаем, что у родителя один ребенок
            resolve({ success: true, childId, childInfo: mockData.students[childId] });
        }, 500);
    });
}

// Функция для получения уведомлений родителя
async function getParentNotifications(parentId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const parent = mockData.parents[parentId];
            if (!parent) {
                resolve({ success: false, error: 'Родитель не найден' });
                return;
            }

            resolve({ success: true, notifications: parent.notifications || [] });
        }, 500);
    });
}

// Функция для отправки сообщения учителю от родителя
async function sendMessageToTeacher(parentId, teacherId, message) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // В реальном приложении здесь будет отправка сообщения на сервер
            console.log(`Сообщение от родителя ${parentId} учителю ${teacherId}: ${message}`);
            resolve({ success: true });
        }, 500);
    });
}

// Функция для получения списка учителей
async function getTeachersList() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const teachers = Object.values(mockData.teachers).map(teacher => ({
                id: teacher.id,
                name: teacher.name,
                subjects: teacher.subjects
            }));
            resolve(teachers);
        }, 500);
    });
}

// Функция для получения оценок ребенка
async function getChildGrades(parentId) {
    return new Promise(async (resolve) => {
        const { success, childId } = await getParentChildInfo(parentId);
        if (!success) {
            resolve({ success: false, error: 'Не удалось получить данные о ребенке' });
            return;
        }

        const grades = mockData.students[childId]?.grades || [];
        resolve({ success: true, grades });
    });
}

// Функция для получения посещаемости ребенка
async function getChildAttendance(parentId) {
    return new Promise(async (resolve) => {
        const { success, childId } = await getParentChildInfo(parentId);
        if (!success) {
            resolve({ success: false, error: 'Не удалось получить данные о ребенке' });
            return;
        }

        const attendance = mockData.students[childId]?.attendance || [];
        resolve({ success: true, attendance });
    });
}
