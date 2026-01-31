// Временные заглушки для данных (если api.js не подключён или функции не определены)
function getStudentSchedule(studentId) {
    return Promise.resolve([
        {
            day: 'Понедельник',
            lessons: [
                { time: '08:30 - 09:15', subject: 'Математика', teacher: 'Соколова М.В.', room: '101' },
                { time: '09:25 - 10:10', subject: 'Физика', teacher: 'Столярова Ю.Б.', room: '202' },
                { time: '10:30 - 11:15', subject: 'Русский язык', teacher: 'Груба О.Б.', room: '103' },
                { time: '11:25 - 12:10', subject: 'История', teacher: 'Солодкая Н.П.', room: '104' }
            ]
        },
        {
            day: 'Вторник',
            lessons: [
                { time: '08:30 - 09:15', subject: 'Английский язык', teacher: 'Соколова М.В.', room: '205' },
                { time: '09:25 - 10:10', subject: 'Биология', teacher: 'Попов П.П.', room: '206' },
                { time: '10:30 - 11:15', subject: 'Химия', teacher: 'Лебедева Л.Л.', room: '207' }
            ]
        },
        {
            day: 'Среда',
            lessons: [
                { time: '08:30 - 09:15', subject: 'Математика', teacher: 'Соколова М.В.', room: '101' },
                { time: '09:25 - 10:10', subject: 'Физкультура', teacher: 'Николаев Н.Н.', room: '301' },
                { time: '10:30 - 11:15', subject: 'Литература', teacher: 'Васильева В.В.', room: '108' }
            ]
        },
        {
            day: 'Четверг',
            lessons: [
                { time: '08:30 - 09:15', subject: 'Физика', teacher: 'Столярова Ю.Б.', room: '202' },
                { time: '09:25 - 10:10', subject: 'Информатика', teacher: 'Тихонов Т.Т.', room: '302' },
                { time: '10:30 - 11:15', subject: 'География', teacher: 'Морозов М.М.', room: '109' }
            ]
        },
        {
            day: 'Пятница',
            lessons: [
                { time: '08:30 - 09:15', subject: 'Русский язык', teacher: 'Груба О.Б.', room: '103' },
                { time: '09:25 - 10:10', subject: 'Математика', teacher: 'Соколова М.В.', room: '101' },
                { time: '10:30 - 11:15', subject: 'История', teacher: 'Солодкая Н.П.', room: '104' }
            ]
        }
    ]);
}

function getStudentGrades(studentId) {
    return Promise.resolve([
        { subject: 'Математика', grade: '5', date: '2026-01-28', teacher: 'Соколова М.В.' },
        { subject: 'Физика', grade: '4', date: '2026-01-27', teacher: 'Столярова Ю.Б.' },
        { subject: 'Русский язык', grade: '5', date: '2026-01-26', teacher: 'Груба О.Б.' },
        { subject: 'История', grade: '4', date: '2026-01-25', teacher: 'Солодкая Н.П.' },
        { subject: 'Английский язык', grade: '5', date: '2026-01-24', teacher: 'Смирнова С.С.' },
        { subject: 'Биология', grade: '3', date: '2026-01-23', teacher: 'Попов П.П.' },
        { subject: 'Литература', grade: '5', date: '2026-01-22', teacher: 'Васильева В.В.' },
        { subject: 'Химия', grade: '4', date: '2026-01-21', teacher: 'Лебедева Л.Л.' },
        { subject: 'Информатика', grade: '5', date: '2026-01-20', teacher: 'Тихонов Т.Т.' },
        { subject: 'География', grade: '4', date: '2026-01-19', teacher: 'Морозов М.М.' }
    ]);
}

// Функции для работы с данными ученика

// Загрузка расписания на день
async function loadDailySchedule(studentId) {
    try {
        const schedule = await getStudentSchedule(studentId);
        const dailyScheduleContainer = document.getElementById('daily-schedule');

        if (schedule && schedule.length > 0) {
            // Получаем текущий день недели
            const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
            const today = new Date().getDay();
            const todayName = daysOfWeek[today];

            // Находим расписание на сегодня
            const todaySchedule = schedule.find(day => day.day === todayName);

            if (todaySchedule && todaySchedule.lessons.length > 0) {
                let html = '<ul class="schedule-list">';

                todaySchedule.lessons.forEach(lesson => {
                    html += `
                        <li class="schedule-item">
                            <span class="schedule-time">${lesson.time}</span>
                            <span>${lesson.subject}</span>
                            <span class="schedule-room">${lesson.room}</span>
                        </li>
                    `;
                });

                html += '</ul>';
                dailyScheduleContainer.innerHTML = html;
            } else {
                dailyScheduleContainer.innerHTML = '<p class="no-data">На сегодня уроков нет.</p>';
            }
        } else {
            dailyScheduleContainer.innerHTML = '<p class="no-data">Расписание не найдено.</p>';
        }
    } catch (error) {
        console.error('Ошибка при загрузке расписания на день:', error);
        document.getElementById('daily-schedule').innerHTML = '<p class="no-data">Ошибка при загрузке расписания.</p>';
    }
}

// Загрузка новых оценок
async function loadNewGrades(studentId) {
    try {
        const grades = await getStudentGrades(studentId);
        const newGradesContainer = document.getElementById('new-grades');

        if (grades && grades.length > 0) {
            // Фильтруем оценки за последние 7 дней
            const today = new Date();
            const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

            const newGrades = grades.filter(grade => {
                const gradeDate = new Date(grade.date);
                return gradeDate >= lastWeek;
            });

            if (newGrades.length > 0) {
                let html = '<ul class="grades-list">';

                newGrades.forEach(grade => {
                    const gradeClass = grade.grade >= 4 ? 'grade-good' : 'grade-bad';
                    html += `
                        <li class="grade-item">
                            <span>${grade.subject}</span>
                            <span class="grade-value ${gradeClass}">${grade.grade}</span>
                            <span>${grade.date}</span>
                        </li>
                    `;
                });

                html += '</ul>';
                newGradesContainer.innerHTML = html;
            } else {
                newGradesContainer.innerHTML = '<p class="no-data">Новых оценок нет.</p>';
            }
        } else {
            newGradesContainer.innerHTML = '<p class="no-data">Оценки не найдены.</p>';
        }
    } catch (error) {
        console.error('Ошибка при загрузке новых оценок:', error);
        document.getElementById('new-grades').innerHTML = '<p class="no-data">Ошибка при загрузке оценок.</p>';
    }
}

// Инициализация страницы ученика
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== ЗАГРУЗКА СТРАНИЦЫ СТУДЕНТА ===');
    
    const studentId = localStorage.getItem('studentId') || 'student1';
    console.log('ID студента:', studentId);
    
    // Принудительно очищаем все кэши
    localStorage.removeItem(`student_${studentId}`);
    localStorage.removeItem('gradesData');
    localStorage.removeItem('originalGradesData');
    localStorage.removeItem('announcementsData');
    localStorage.removeItem('scheduleData');
    
    let studentData = mockData.students[studentId];
    localStorage.setItem(`student_${studentId}`, JSON.stringify(studentData));
    console.log('Новые данные сохранены в localStorage:', studentData);
    console.log('Количество оценок:', studentData.grades.length);
    
    // Принудительно устанавливаем группу
    setTimeout(() => {
        const classElement = document.getElementById('student-class-value');
        if (classElement) {
            classElement.textContent = '3 ПО-21';
            console.log('Принудительно установлена группа: 3 ПО-21');
        }
    }, 100);
    
    const studentClass = studentData.class || studentData.adress || '3 ПО-21';

    // Заполняем все данные
    populateAllStudentData(studentData, studentId);
    
    console.log('Все данные загружены');
    
    // Добавляем анимации для элементов
    addAnimations();
});

// Функция заполнения всех данных ученика
function populateAllStudentData(studentData, studentId) {
    console.log('Начинаю заполнение данных для ученика:', studentId);
    console.log('Данные ученика:', studentData);
    
    // Проверяем наличие DOM элементов
    const elements = {
        'student-name-value': document.getElementById('student-name-value'),
        'student-class-value': document.getElementById('student-class-value'),
        'header-user-name': document.getElementById('header-user-name'),
        'header-user-class': document.getElementById('header-user-class'),
        'profile-name': document.getElementById('profile-name'),
        'profile-email': document.getElementById('profile-email'),
        'profile-class': document.getElementById('profile-class'),
        'profile-phone': document.getElementById('profile-phone'),
        'daily-schedule': document.getElementById('daily-schedule'),
        'schedule-table': document.getElementById('schedule-table'),
        'new-grades': document.getElementById('new-grades'),
        'grades-table': document.getElementById('grades-table'),
        'performance-stats': document.getElementById('performance-stats'),
        'announcements': document.getElementById('announcements'),
        'learning-materials': document.getElementById('learning-materials'),
        'notifications-list': document.getElementById('notifications-list')
    };
    
    console.log('Проверка DOM элементов:', elements);
    
    // Заполняем основную информацию
    console.log('Заполняем основную информацию...');
    populateBasicStudentInfo(studentData);
    
    // Заполняем расписание
    console.log('Заполняем расписание...');
    populateSchedule(studentData);
    
    // Заполняем оценки
    console.log('Заполняем оценки...');
    populateGrades(studentData);
    
    // Заполняем статистику
    console.log('Заполняем статистику...');
    populatePerformanceStats(studentData);
    
    // Заполняем домашние задания
    console.log('Пропускаем домашние задания (функция отключена)');
    // populateHomework(studentData);
    
    // Заполняем объявления
    console.log('Пропускаем объявления (заменены на уведомления)');
    // populateAnnouncements(studentClass);
    
    // Заполняем учебные материалы
    console.log('Заполняем учебные материалы...');
    populateLearningMaterials();
    
    // Заполняем профиль
    console.log('Заполняем профиль...');
    populateProfile(studentData);
    
    // Заполняем уведомления
    console.log('Заполняем уведомления...');
    populateNotifications();
    
    console.log('Все данные заполнены успешно!');
}

// Функция немедленного заполнения базовой информации
function populateBasicStudentInfo(studentInfo) {
    const name = studentInfo?.name || 'Иван Иванов';
    const studentClass = studentInfo?.class || studentInfo?.adress || '3 ПО-21';
    
    console.log('populateBasicStudentInfo called with:', studentInfo);
    console.log('Using studentClass:', studentClass);
    console.log('Available fields:', {
        class: studentInfo?.class,
        adress: studentInfo?.adress
    });
    
    // Заполняем основную информацию
    const nameElement = document.getElementById('student-name-value');
    const classElement = document.getElementById('student-class-value');
    
    console.log('Elements found:', {
        nameElement: !!nameElement,
        classElement: !!classElement
    });
    
    if (nameElement) {
        nameElement.textContent = name;
        console.log('Set name to:', name);
    }
    if (classElement) {
        classElement.textContent = studentClass;
        console.log('Set class to:', studentClass);
    }
    
    // Обновляем шапку
    const headerName = document.getElementById('header-user-name');
    const headerClass = document.getElementById('header-user-class');
    
    if (headerName) headerName.textContent = name;
    if (headerClass) headerClass.textContent = studentClass;
}

// Заполнение профиля
function populateProfile(studentInfo) {
    const profileName = document.getElementById('profile-name');
    const profileEmail = document.getElementById('profile-email');
    const profileClass = document.getElementById('profile-class');
    const profilePhone = document.getElementById('profile-phone');
    
    if (profileName) profileName.textContent = studentInfo.name;
    if (profileEmail) profileEmail.textContent = studentInfo.email || `${studentInfo.name.toLowerCase().replace(' ', '.')}@school.ru`;
    if (profileClass) profileClass.textContent = studentInfo.adress || 'Площадь Свободы д. 15 кв. 7';
    if (profilePhone) profilePhone.textContent = studentInfo.phone || '+7 (999) 123-45-67';
}

// Заполнение расписания
function populateSchedule(studentInfo) {
    const scheduleTable = document.getElementById('schedule-table');
    const dailyScheduleContainer = document.getElementById('daily-schedule');
    
    if (studentInfo.schedule && studentInfo.schedule.length > 0) {
        // Расписание на день
        const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        const today = new Date().getDay();
        const todayName = daysOfWeek[today];
        const todaySchedule = studentInfo.schedule.find(day => day.day === todayName);
        
        if (todaySchedule && todaySchedule.lessons.length > 0) {
            let html = '<ul class="schedule-list">';
            todaySchedule.lessons.forEach(lesson => {
                html += `
                    <li class="schedule-item">
                        <span class="schedule-time">${lesson.time}</span>
                        <span>${lesson.subject}</span>
                        <span class="schedule-room">${lesson.room}</span>
                    </li>
                `;
            });
            html += '</ul>';
            if (dailyScheduleContainer) dailyScheduleContainer.innerHTML = html;
        }
        
        // Полное расписание в виде классической таблицы (как на скриншоте)
        const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт'];
        
        // Создаем заголовок с днями недели
        let html = '<table class="schedule-table"><thead><tr><th></th>';
        weekDays.forEach(day => {
            html += `<th>${day}</th>`;
        });
        html += '</tr></thead><tbody>';
        
        // Данные расписания как на скриншоте
        const scheduleData = [
            {
                time: '8:30-10:05',
                day: 'Пн',
                lessons: ['Математика', 'Русский язык', 'Математика', 'Физика', 'Русский язык']
            },
            {
                time: '10:25-12:00',
                day: 'Пн',
                lessons: ['Литература', 'Математика', 'История', 'Математика', 'Физкультура']
            },
            {
                time: '12:20-13:55',
                day: 'Пн',
                lessons: ['История', 'Физика', 'Русский язык', 'Химия', 'Литература']
            },
            {
                time: '14:15-15:50',
                day: 'Пн',
                lessons: ['Физкультура', 'Химия', 'Физкультура', 'Русский язык', 'Информатика']
            },
            {
                time: '16:10-17:45',
                day: 'Пн',
                lessons: ['География', 'Информатика', 'Биология', 'Английский язык', 'Обществознание']
            }
        ];
        
        // Группируем по времени
        const timeSlots = ['8:30-10:05', '10:25-12:00', '12:20-13:55', '14:15-15:50', '16:10-17:45'];
        
        timeSlots.forEach(timeSlot => {
            html += `<tr><td class="schedule-time-cell">${timeSlot}</td>`;
            
            weekDays.forEach(day => {
                // Находим нужный предмет для этого времени и дня
                const timeData = scheduleData.find(d => d.time === timeSlot);
                if (timeData) {
                    const dayIndex = weekDays.indexOf(day);
                    const subject = timeData.lessons[dayIndex];
                    
                    if (subject && subject !== '—') {
                        html += `<td class="schedule-lesson-cell">${subject}</td>`;
                    } else {
                        html += '<td class="schedule-empty-cell">—</td>';
                    }
                } else {
                    html += '<td class="schedule-empty-cell">—</td>';
                }
            });
            
            html += '</tr>';
        });
        
        html += '</tbody></table>';
        if (scheduleTable) scheduleTable.innerHTML = html;
    }
}

// Заполнение оценок
function populateGrades(studentInfo) {
    const gradesTable = document.getElementById('grades-table');
    const paginationContainer = document.getElementById('grades-pagination');
    
    console.log('populateGrades called with:', studentInfo);
    console.log('Grades data:', studentInfo.grades);
    
    if (!studentInfo.grades || studentInfo.grades.length === 0) {
        if (gradesTable) gradesTable.innerHTML = '<p class="no-data">Оценок пока нет.</p>';
        if (paginationContainer) paginationContainer.innerHTML = '';
        return;
    }
    
    // Глобальные переменные для фильтрации и пагинации
    window.originalGradesData = studentInfo.grades;
    window.gradesData = [...studentInfo.grades];
    window.currentPage = 1;
    window.gradesPerPage = 5;
    window.currentFilters = {
        subject: 'all',
        period: 'all',
        type: 'all'
    };
    
    console.log('Grades data set:', window.gradesData.length, 'grades');
    
    // Заполняем список предметов в фильтре
    populateSubjectFilter();
    
    // Добавляем обработчики событий для фильтров
    setupFilterHandlers();
    
    // Отображаем первую страницу
    displayGradesPage(1);
}

// Заполнение списка предметов в фильтре
function populateSubjectFilter() {
    const subjectFilter = document.getElementById('subject-filter');
    if (!subjectFilter) return;
    
    const subjects = [...new Set(window.originalGradesData.map(grade => grade.subject))];
    
    // Очищаем и заполняем список предметов
    subjectFilter.innerHTML = '<option value="all">Все предметы</option>';
    subjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject;
        option.textContent = subject;
        subjectFilter.appendChild(option);
    });
}

// Настройка обработчиков для фильтров
function setupFilterHandlers() {
    const applyBtn = document.getElementById('apply-filters');
    const resetBtn = document.getElementById('reset-filters');
    
    if (applyBtn) {
        applyBtn.addEventListener('click', applyFilters);
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetFilters);
    }
}

// Применение фильтров
function applyFilters() {
    const subjectFilter = document.getElementById('subject-filter');
    const periodFilter = document.getElementById('period-filter');
    const typeFilter = document.getElementById('type-filter');
    
    if (!subjectFilter || !periodFilter || !typeFilter) return;
    
    window.currentFilters.subject = subjectFilter.value;
    window.currentFilters.period = periodFilter.value;
    window.currentFilters.type = typeFilter.value;
    
    // Фильтруем данные
    filterGrades();
    
    console.log('Filters applied:', window.currentFilters, 'Filtered grades:', window.gradesData.length);
}

// Сброс фильтров
function resetFilters() {
    const subjectFilter = document.getElementById('subject-filter');
    const periodFilter = document.getElementById('period-filter');
    const typeFilter = document.getElementById('type-filter');
    
    if (subjectFilter) subjectFilter.value = 'all';
    if (periodFilter) periodFilter.value = 'all';
    if (typeFilter) typeFilter.value = 'all';
    
    window.currentFilters = {
        subject: 'all',
        period: 'all',
        type: 'all'
    };
    
    // Восстанавливаем исходные данные
    window.gradesData = [...window.originalGradesData];
    window.currentPage = 1;
    
    // Отображаем все данные
    displayGradesPage(1);
    updatePagination();
}

// Функция фильтрации оценок
function filterGrades() {
    const subjectFilter = window.currentFilters.subject;
    const periodFilter = window.currentFilters.period;
    const typeFilter = window.currentFilters.type;
    
    let filteredData = [...window.originalGradesData];
    
    // Фильтрация по предмету
    if (subjectFilter !== 'all') {
        filteredData = filteredData.filter(grade => grade.subject === subjectFilter);
    }
    
    // Фильтрация по периоду
    if (periodFilter !== 'all') {
        const now = new Date();
        let cutoffDate;
        
        switch (periodFilter) {
            case 'week':
                cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                break;
            case 'month':
                cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                break;
            case 'quarter':
                cutoffDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
                break;
        }
        
        if (cutoffDate) {
            filteredData = filteredData.filter(grade => {
                const gradeDate = new Date(grade.date);
                return gradeDate >= cutoffDate;
            });
        }
    }
    
    // Фильтрация по типу работы
    if (typeFilter !== 'all') {
        filteredData = filteredData.filter(grade => grade.topic === typeFilter);
    }
    
    window.gradesData = filteredData;
    window.currentPage = 1;
    
    displayGradesPage(1);
    updatePagination();
}

// Функция отображения страницы с оценками
function displayGradesPage(page) {
    const gradesTable = document.getElementById('grades-table');
    const paginationContainer = document.getElementById('grades-pagination');
    
    const startIndex = (page - 1) * window.gradesPerPage;
    const endIndex = startIndex + window.gradesPerPage;
    const pageGrades = window.gradesData.slice(startIndex, endIndex);
    
    console.log('Displaying page', page, 'grades:', pageGrades.length);
    
    // Расчет среднего балла для всех оценок
    const totalGrades = window.gradesData.reduce((sum, grade) => sum + parseInt(grade.grade), 0);
    const averageGrade = (totalGrades / window.gradesData.length).toFixed(2);
    
    console.log('Average grade:', averageGrade, 'Total grades:', totalGrades);
    
    // Создаем HTML для таблицы с оценками
    let html = `
        <div class="table-wrapper">
            <table class="grades-table">
                <thead>
                    <tr>
                        <th>Предмет</th>
                        <th>Оценка</th>
                        <th>Дата</th>
                        <th>Учитель</th>
                        <th>Тип работы</th>
                        <th>Средний балл</th>
                        <th>Итоговая</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    pageGrades.forEach((grade, index) => {
        const gradeClass = grade.grade >= 4 ? 'grade-good' : grade.grade == 3 ? 'grade-mid' : 'grade-bad';
        
        // Рассчитываем средний балл для этого предмета (из отфильтрованных данных)
        const subjectGrades = window.gradesData.filter(g => g.subject === grade.subject);
        const subjectAverage = (subjectGrades.reduce((sum, g) => sum + parseInt(g.grade), 0) / subjectGrades.length).toFixed(2);
        
        // Проверяем, завершен ли предмет (есть ли финальный экзамен/зачет по этому предмету во всех данных)
        const subjectAllGrades = window.originalGradesData.filter(g => g.subject === grade.subject);
        const hasFinalExam = subjectAllGrades.some(g => g.topic && (
            g.topic.toLowerCase().includes('экзамен') || 
            g.topic.toLowerCase().includes('зачет') ||
            g.topic.toLowerCase().includes('итоговый экзамен') ||
            g.topic.toLowerCase().includes('выпускной экзамен')
        ));
        
        // Показываем итоговую только для финальных экзаменов/зачетов
        const isFinalExamOrTest = grade.topic && (
            grade.topic.toLowerCase().includes('экзамен') || 
            grade.topic.toLowerCase().includes('зачет') ||
            grade.topic.toLowerCase().includes('итоговый экзамен') ||
            grade.topic.toLowerCase().includes('выпускной экзамен')
        );
        
        console.log(`Grade ${index}:`, grade.subject, 'Topic:', grade.topic, 'Is final exam/test:', isFinalExamOrTest, 'Subject has final exam:', hasFinalExam);
        
        let subjectTotalDisplay = '';
        if (isFinalExamOrTest && hasFinalExam) {
            // Рассчитываем итоговую оценку как средний балл (максимум 5)
            const subjectAverage = (subjectAllGrades.reduce((sum, g) => sum + parseInt(g.grade), 0) / subjectAllGrades.length).toFixed(1);
            subjectTotalDisplay = `<span class="subject-total">${subjectAverage}</span>`;
            console.log(`  -> Showing average: ${subjectAverage}`);
        } else {
            subjectTotalDisplay = '<span class="subject-total">—</span>';
            console.log(`  -> Showing dash`);
        }
        
        html += `
            <tr>
                <td>${grade.subject}</td>
                <td><span class="grade-value ${gradeClass}">${grade.grade}</span></td>
                <td>${grade.date}</td>
                <td>${grade.teacher || 'Не указано'}</td>
                <td>${grade.topic || 'Не указано'}</td>
                <td><span class="subject-average">${subjectAverage}</span></td>
                <td>${subjectTotalDisplay}</td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
        </div>
    `;
    
    if (gradesTable) gradesTable.innerHTML = html;
    
    // Обновляем пагинацию
    updatePagination();
}

// Функция обновления пагинации
function updatePagination() {
    const paginationContainer = document.getElementById('grades-pagination');
    const totalPages = Math.ceil(window.gradesData.length / window.gradesPerPage);
    
    let paginationHTML = `
        <div class="pagination-info">
            Показано ${((window.currentPage - 1) * window.gradesPerPage) + 1}-${Math.min(window.currentPage * window.gradesPerPage, window.gradesData.length)} из ${window.gradesData.length} оценок
        </div>
    `;
    
    // Кнопка "Назад"
    paginationHTML += `
        <button class="pagination-button" onclick="changeGradesPage(${window.currentPage - 1})" 
                ${window.currentPage === 1 ? 'disabled' : ''}>
            ←
        </button>
    `;
    
    // Номера страниц
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= window.currentPage - 1 && i <= window.currentPage + 1)) {
            paginationHTML += `
                <button class="pagination-button ${i === window.currentPage ? 'active' : ''}" 
                        onclick="changeGradesPage(${i})">
                    ${i}
                </button>
            `;
        } else if (i === window.currentPage - 2 || i === window.currentPage + 2) {
            paginationHTML += `<span style="padding: 0 5px;">...</span>`;
        }
    }
    
    // Кнопка "Вперед"
    paginationHTML += `
        <button class="pagination-button" onclick="changeGradesPage(${window.currentPage + 1})" 
                ${window.currentPage === totalPages ? 'disabled' : ''}>
            →
        </button>
    `;
    
    if (paginationContainer) paginationContainer.innerHTML = paginationHTML;
}

// Делаем функцию доступной глобально
window.changeGradesPage = function(page) {
    const totalPages = Math.ceil(window.gradesData.length / window.gradesPerPage);
    if (page >= 1 && page <= totalPages) {
        window.currentPage = page;
        displayGradesPage(page);
    }
};

// Заполнение статистики
function populatePerformanceStats(studentInfo) {
    const statsContainer = document.getElementById('performance-stats');
    
    if (studentInfo.grades && studentInfo.grades.length > 0) {
        const averageGrade = (studentInfo.grades.reduce((sum, grade) => sum + grade.grade, 0) / studentInfo.grades.length).toFixed(2);
        const totalGrades = studentInfo.grades.length;
        
        // Статистика по предметам
        const subjects = [...new Set(studentInfo.grades.map(grade => grade.subject))];
        const subjectStats = subjects.map(subject => {
            const subjectGrades = studentInfo.grades.filter(grade => grade.subject === subject);
            const avg = (subjectGrades.reduce((sum, grade) => sum + grade.grade, 0) / subjectGrades.length).toFixed(2);
            return { subject, average: avg, count: subjectGrades.length };
        });
        
        let html = `
            <div class="stats-container">
                <div class="stat-item">
                    <h4>Средний балл</h4>
                    <p class="stat-value">${averageGrade}</p>
                    <small>По всем предметам</small>
                </div>
                <div class="stat-item">
                    <h4>Всего оценок</h4>
                    <p class="stat-value">${totalGrades}</p>
                    <small>За этот период</small>
                </div>
            </div>
            <div class="subject-stats">
                <h4>Статистика по предметам</h4>
                <table class="subject-stats-table">
                    <thead>
                        <tr>
                            <th>Предмет</th>
                            <th>Средний балл</th>
                            <th>Количество оценок</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        subjectStats.forEach(subject => {
            const gradeColor = subject.average >= 4.5 ? '#4caf50' : 
                              subject.average >= 3.5 ? '#ff9800' : '#f44336';
            
            html += `
                <tr>
                    <td><strong>${subject.subject}</strong></td>
                    <td><span style="color: ${gradeColor}; font-weight: 600;">${subject.average}</span></td>
                    <td>${subject.count}</td>
                </tr>
            `;
        });
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
        
        if (statsContainer) statsContainer.innerHTML = html;
    }
}

// // Заполнение домашних заданий
// function populateHomework(studentInfo) {
//     // Создаем отдельный контейнер для домашних заданий
//     let homeworkContainer = document.getElementById('homework-container');
//     if (!homeworkContainer) {
//         const gradesSection = document.getElementById('grades-table').closest('.MuiPaper-root');
//         if (gradesSection) {
//             const homeworkSection = document.createElement('div');
//             homeworkSection.className = 'MuiPaper-root MuiPaper-elevation1 fade-in delay-4';
//             homeworkSection.innerHTML = `
//                 <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
//                     <h3>Домашние задания</h3>
//                 </div>
//                 <div id="homework-container">
//                     <!-- Домашние задания будут загружены через JS -->
//                 </div>
//             `;
//             gradesSection.parentNode.insertBefore(homeworkSection, gradesSection.nextSibling);
//             homeworkContainer = document.getElementById('homework-container');
//         }
//     }
    
//     if (studentInfo.homework && studentInfo.homework.length > 0 && homeworkContainer) {
//         let html = '<table class="homework-table"><thead><tr><th>Предмет</th><th>Задание</th><th>Срок выполнения</th></tr></thead><tbody>';
        
//         studentInfo.homework.forEach((task, index) => {
//             const isUrgent = new Date(task.dueDate) <= new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
//             html += `
//                 <tr class="${isUrgent ? 'urgent-homework' : ''}">
//                     <td><strong>${task.subject}</strong></td>
//                     <td>${task.task}</td>
//                     <td><span class="due-date ${isUrgent ? 'urgent' : ''}">${task.dueDate}</span></td>
//                 </tr>
//             `;
//         });
        
//         html += '</tbody></table>';
//         homeworkContainer.innerHTML = html;
//     }
// }

// Заполнение объявлений
function populateAnnouncements(studentClass) {
    console.log('populateAnnouncements called with class:', studentClass);
    const announcementsContainer = document.getElementById('announcements');
    
    if (!announcementsContainer) {
        console.log('announcements container not found');
        return;
    }
    
    const announcements = mockData.announcements.filter(announcement => {
        return announcement.forClass === 'all' || announcement.forClass === studentClass.substring(0, 2);
    });
    
    console.log('Found announcements:', announcements.length);
    
    if (announcements.length > 0) {
        let html = '<div class="announcements-section">';
        
        announcements.forEach((announcement, index) => {
            const isImportant = announcement.title.toLowerCase().includes('важно') || announcement.title.toLowerCase().includes('срочно');
            html += `
                <div class="announcement-item fade-in delay-${index + 1} ${isImportant ? 'important' : ''}">
                    <h4>
                        ${isImportant ? '<span class="material-icons" style="color: #f44336; vertical-align: middle; margin-right: 8px;">priority_high</span>' : ''}
                        ${announcement.title}
                    </h4>
                    <p class="announcement-date">
                        <span class="material-icons" style="font-size: 14px; vertical-align: middle; margin-right: 4px;">event</span>
                        ${announcement.date}
                    </p>
                    <p>${announcement.content}</p>
                </div>
            `;
        });
        
        html += '</div>';
        announcementsContainer.innerHTML = html;
        console.log('Announcements populated successfully');
    } else {
        announcementsContainer.innerHTML = '<p class="no-data">Объявлений нет.</p>';
        console.log('No announcements found');
    }
}

// Заполнение учебных материалов
function populateLearningMaterials() {
    const materialsContainer = document.getElementById('learning-materials');
    const materials = mockData.learningMaterials;
    
    if (materials && Object.keys(materials).length > 0 && materialsContainer) {
        let html = '<div class="learning-materials-section">';
        
        for (const [subject, subjectMaterials] of Object.entries(materials)) {
            html += `<div class="subject-materials fade-in delay-1"><h4>${subject}</h4>`;
            
            subjectMaterials.forEach((material, index) => {
                const typeIcon = material.type === 'presentation' ? 'slideshow' : 
                                material.type === 'video' ? 'play_circle' : 
                                material.type === 'document' ? 'description' : 'insert_drive_file';
                
                html += `
                    <div class="material-item fade-in delay-${index + 2}">
                        <h5>
                            <span class="material-icons" style="vertical-align: middle; margin-right: 8px; color: #1976d2;">
                                ${typeIcon}
                            </span>
                            ${material.title}
                        </h5>
                        <p>${material.description} (${material.type}, ${material.date})</p>
                        <a href="${material.url}" target="_blank" class="material-link">
                            <span class="material-icons" style="font-size: 16px; vertical-align: middle; margin-right: 4px;">open_in_new</span>
                            Открыть материал
                        </a>
                    </div>
                `;
            });
            
            html += '</div>';
        }
        
        html += '</div>';
        materialsContainer.innerHTML = html;
    }
}

// Заполнение уведомлений
function populateNotifications() {
    const notificationsList = document.getElementById('notifications-list');
    
    const notifications = [
        {
            id: 1,
            title: 'Новая оценка по математике',
            message: 'Вы получили оценку "5" за контрольную работу',
            date: '2026-01-28 14:30',
            type: 'grade',
            read: false
        },
        {
            id: 2,
            title: 'Домашнее задание',
            message: 'Добавлено новое ДЗ по физике на завтра',
            date: '2026-01-28 16:45',
            type: 'homework',
            read: false
        },
        {
            id: 3,
            title: 'Объявление',
            message: 'Завтра будет собрание для 10-х классов',
            date: '2026-01-27 18:00',
            type: 'announcement',
            read: true
        },
        {
            id: 4,
            title: 'Расписание изменено',
            message: 'Урок литературы перенесен на 4-й урок',
            date: '2026-01-27 12:15',
            type: 'schedule',
            read: true
        }
    ];
    
    if (notifications.length > 0 && notificationsList) {
        let html = '';
        notifications.forEach((notification, index) => {
            const icon = notification.type === 'grade' ? 'grade' : 
                        notification.type === 'homework' ? 'assignment' : 
                        notification.type === 'announcement' ? 'campaign' : 'schedule';
            
            html += `
                <div class="notification-item fade-in delay-${index + 1} ${!notification.read ? 'unread' : ''}">
                    <h4>
                        <span class="material-icons" style="vertical-align: middle; margin-right: 8px; color: #1976d2;">
                            ${icon}
                        </span>
                        ${notification.title}
                    </h4>
                    <p>${notification.message}</p>
                    <small>${notification.date}</small>
                </div>
            `;
        });
        
        notificationsList.innerHTML = html;
    }
}

// Загрузка и отображение информации об ученике
async function loadStudentInfo(studentId) {
    try {
        console.log('Загрузка информации об ученике для:', studentId);
        
        // Сначала пробуем получить через API
        let studentInfo = await getStudentInfo(studentId);
        
        // Если API не сработало, берем напрямую из mockData
        if (!studentInfo || !studentInfo.name) {
            console.log('API не сработал, берем напрямую из mockData');
            studentInfo = mockData.students[studentId];
        }
        
        console.log('Полученная информация об ученике:', studentInfo);

        if (studentInfo && studentInfo.name) {
            // Заполняем основную информацию
            const nameElement = document.getElementById('student-name-value');
            const classElement = document.getElementById('student-class-value');
            
            if (nameElement) {
                nameElement.textContent = studentInfo.name;
                console.log('Имя установлено:', studentInfo.name);
            } else {
                console.error('Элемент student-name-value не найден');
            }
            
            if (classElement) {
                classElement.textContent = studentInfo.class;
                console.log('Класс установлен:', studentInfo.class);
            } else {
                console.error('Элемент student-class-value не найден');
            }
            
            // Обновляем профиль
            const profileName = document.getElementById('profile-name');
            const profileEmail = document.getElementById('profile-email');
            const profileClass = document.getElementById('profile-class');
            const profilePhone = document.getElementById('profile-phone');
            
            if (profileName) {
                profileName.textContent = studentInfo.name;
                console.log('Profile name установлен:', studentInfo.name);
            }
            if (profileEmail) {
                profileEmail.textContent = studentInfo.email || `${studentInfo.name.toLowerCase().replace(' ', '.')}@school.ru`;
                console.log('Profile email установлен:', studentInfo.email);
            }
            if (profileClass) {
                profileClass.textContent = studentInfo.class;
                console.log('Profile class установлен:', studentInfo.class);
            }
            if (profilePhone) {
                profilePhone.textContent = studentInfo.phone || '+7 (999) 123-45-67';
                console.log('Profile phone установлен:', studentInfo.phone);
            }
            
            // Обновляем шапку
            const headerName = document.getElementById('header-user-name');
            const headerClass = document.getElementById('header-user-class');
            
            if (headerName) {
                headerName.textContent = studentInfo.name;
                console.log('Header name установлен:', studentInfo.name);
            }
            if (headerClass) {
                headerClass.textContent = studentInfo.class + ' класс';
                console.log('Header class установлен:', studentInfo.class);
            }
        } else {
            console.error('Student info is empty or invalid:', studentInfo);
            // Если данные не загрузились, используем значения по умолчанию
            const nameElement = document.getElementById('student-name-value');
            const classElement = document.getElementById('student-class-value');
            
            if (nameElement) nameElement.textContent = 'Иван Иванов';
            if (classElement) classElement.textContent = '3 ПО-21';
        }
    } catch (error) {
        console.error('Ошибка при загрузке информации об ученике:', error);
        // В случае ошибки также используем значения по умолчанию
        const nameElement = document.getElementById('student-name-value');
        const classElement = document.getElementById('student-class-value');
        
        if (nameElement) nameElement.textContent = 'Иван Иванов';
        if (classElement) classElement.textContent = '3 ПО-21';
    }
}

// Загрузка и отображение расписания
async function loadStudentSchedule(studentId) {
    try {
        console.log('Загрузка расписания для:', studentId);
        
        // Сначала пробуем получить через API
        let schedule = await getStudentSchedule(studentId);
        
        // Если API не сработало, берем напрямую из mockData
        if (!schedule || schedule.length === 0) {
            console.log('API расписания не сработал, берем напрямую из mockData');
            schedule = mockData.students[studentId]?.schedule || [];
        }
        
        const scheduleTable = document.getElementById('schedule-table');
        console.log('Полученное расписание:', schedule);

        if (schedule && schedule.length > 0) {
            let html = '<div class="schedule-table-wrapper"><table class="schedule-table"><thead><tr><th>День недели</th><th>Время</th><th>Предмет</th><th>Учитель</th><th>Кабинет</th></tr></thead><tbody>';

            schedule.forEach(daySchedule => {
                daySchedule.lessons.forEach((lesson, index) => {
                    html += `
                        <tr class="fade-in delay-${index + 1}">
                            <td><strong>${daySchedule.day}</strong></td>
                            <td>${lesson.time}</td>
                            <td>${lesson.subject}</td>
                            <td>${lesson.teacher}</td>
                            <td><span class="schedule-room">${lesson.room}</span></td>
                        </tr>
                    `;
                });
            });

            html += '</tbody></table></div>';
            scheduleTable.innerHTML = html;
            console.log('Расписание успешно загружено');
        } else {
            scheduleTable.innerHTML = '<p class="no-data">Расписание не найдено.</p>';
        }
    } catch (error) {
        console.error('Ошибка при загрузке расписания:', error);
        document.getElementById('schedule-table').innerHTML = '<p class="no-data">Ошибка при загрузке расписания.</p>';
    }
}

// Загрузка и отображение оценок
async function loadStudentGrades(studentId) {
    try {
        console.log('Загрузка оценок для:', studentId);
        
        // Сначала пробуем получить через API
        let grades = await getStudentGrades(studentId);
        
        // Если API не сработало, берем напрямую из mockData
        if (!grades || grades.length === 0) {
            console.log('API оценок не сработал, берем напрямую из mockData');
            grades = mockData.students[studentId]?.grades || [];
        }
        
        const gradesTable = document.getElementById('grades-table');
        console.log('Полученные оценки:', grades);

        if (grades && grades.length > 0) {
            let html = '<div class="grades-table-wrapper"><table class="grades-table"><thead><tr><th>Предмет</th><th>Оценка</th><th>Дата</th><th>Учитель</th></tr></thead><tbody>';

            grades.forEach((grade, index) => {
                const gradeClass = grade.grade >= 4 ? 'grade-good' : grade.grade == 3 ? 'grade-mid' : 'grade-bad';
                html += `
                    <tr class="fade-in delay-${index + 1}">
                        <td>${grade.subject}</td>
                        <td><span class="grade-value ${gradeClass}">${grade.grade}</span></td>
                        <td>${grade.date}</td>
                        <td>${grade.teacher || '-'}</td>
                    </tr>
                `;
            });

            html += '</tbody></table></div>';
            gradesTable.innerHTML = html;
            console.log('Оценки успешно загружены');
        } else {
            gradesTable.innerHTML = '<p class="no-data">Оценки не найдены.</p>';
        }
    } catch (error) {
        console.error('Ошибка при загрузке оценок:', error);
        document.getElementById('grades-table').innerHTML = '<p class="no-data">Ошибка при загрузке оценок.</p>';
    }
}

// Загрузка и отображение статистики успеваемости
async function loadStudentPerformanceStats(studentId) {
    try {
        const stats = await getStudentPerformanceStats(studentId);
        const statsContainer = document.getElementById('performance-stats');

        if (stats) {
            let html = `
                <div class="stats-container">
                    <div class="stat-item">
                        <h4>Средний балл</h4>
                        <p class="stat-value">${stats.averageGrade}</p>
                        <small>По всем предметам</small>
                    </div>
                    <div class="stat-item">
                        <h4>Всего оценок</h4>
                        <p class="stat-value">${stats.totalGrades}</p>
                        <small>За этот период</small>
                    </div>
                </div>
                <div class="subject-stats">
                    <h4>Статистика по предметам</h4>
                    <table class="subject-stats-table">
                        <thead>
                            <tr>
                                <th>Предмет</th>
                                <th>Средний балл</th>
                                <th>Количество оценок</th>
                            </tr>
                        </thead>
                        <tbody>
            `;

            stats.subjectStats.forEach(subject => {
                const gradeColor = subject.average >= 4.5 ? '#4caf50' : 
                                  subject.average >= 3.5 ? '#ff9800' : '#f44336';
                
                html += `
                    <tr>
                        <td><strong>${subject.subject}</strong></td>
                        <td><span style="color: ${gradeColor}; font-weight: 600;">${subject.average}</span></td>
                        <td>${subject.count}</td>
                    </tr>
                `;
            });

            html += `
                        </tbody>
                    </table>
                </div>
            `;

            statsContainer.innerHTML = html;
        } else {
            statsContainer.innerHTML = '<p class="no-data">Статистика не найдена.</p>';
        }
    } catch (error) {
        console.error('Ошибка при загрузке статистики успеваемости:', error);
        document.getElementById('performance-stats').innerHTML = '<p>Ошибка при загрузке статистики.</p>';
    }
}

// Загрузка и отображение домашних заданий
// async function loadStudentHomework(studentId) {
//     try {
//         const homework = await getStudentHomework(studentId);
        
        // Создаем отдельный контейнер для домашних заданий
        // let homeworkContainer = document.getElementById('homework-container');
        // if (!homeworkContainer) {
        //     // Если контейнер не существует, создаем его после оценок
        //     const gradesSection = document.getElementById('grades-table').closest('.MuiPaper-root');
        //     const homeworkSection = document.createElement('div');
        //     homeworkSection.className = 'MuiPaper-root MuiPaper-elevation1 fade-in delay-4';
        //     homeworkSection.innerHTML = `
        //         <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        //             <h3 class="MuiTypography-root MuiTypography-h5">Домашние задания</h3>
        //         </div>
        //         <div id="homework-container">
        //             <!-- Домашние задания будут загружены через JS -->
        //         </div>
        //     `;
        //     gradesSection.parentNode.insertBefore(homeworkSection, gradesSection.nextSibling);
        //     homeworkContainer = document.getElementById('homework-container');
        // }

        // if (homework && homework.length > 0) {
        //     let html = '<div class="homework-table-wrapper"><table class="homework-table"><thead><tr><th>Предмет</th><th>Задание</th><th>Срок выполнения</th></tr></thead><tbody>';

        //     homework.forEach((task, index) => {
        //         const isUrgent = new Date(task.dueDate) <= new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
        //         html += `
        //             <tr class="fade-in delay-${index + 1} ${isUrgent ? 'urgent-homework' : ''}">
        //                 <td><strong>${task.subject}</strong></td>
        //                 <td>${task.task}</td>
        //                 <td><span class="due-date ${isUrgent ? 'urgent' : ''}">${task.dueDate}</span></td>
        //             </tr>
        //         `;
        //     });

        //     html += '</tbody></table></div>';
        //     homeworkContainer.innerHTML = html;
        // } else {
        //     homeworkContainer.innerHTML = '<p class="no-data">Домашних заданий нет.</p>';
        // }
    // } catch (error) {
    //     console.error('Ошибка при загрузке домашних заданий:', error);
    //     const homeworkContainer = document.getElementById('homework-container');
    //     if (homeworkContainer) {
    //         homeworkContainer.innerHTML = '<p class="no-data">Ошибка при загрузке домашних заданий.</p>';
    //     }
    // }
// }

// Загрузка и отображение объявлений
async function loadAnnouncements(studentClass) {
    try {
        const announcements = await getAnnouncements(studentClass);
        const announcementsContainer = document.getElementById('announcements');

        if (announcements && announcements.length > 0) {
            let html = '<div class="announcements-section">';

            announcements.forEach((announcement, index) => {
                const isImportant = announcement.title.toLowerCase().includes('важно') || announcement.title.toLowerCase().includes('срочно');
                html += `
                    <div class="announcement-item fade-in delay-${index + 1} ${isImportant ? 'important' : ''}">
                        <h4>
                            ${isImportant ? '<span class="material-icons" style="color: #f44336; vertical-align: middle; margin-right: 8px;">priority_high</span>' : ''}
                            ${announcement.title}
                        </h4>
                        <p class="announcement-date">
                            <span class="material-icons" style="font-size: 14px; vertical-align: middle; margin-right: 4px;">event</span>
                            ${announcement.date}
                        </p>
                        <p>${announcement.content}</p>
                    </div>
                `;
            });

            html += '</div>';
            announcementsContainer.innerHTML = html;
        } else {
            announcementsContainer.innerHTML = '<p class="no-data">Объявлений нет.</p>';
        }
    } catch (error) {
        console.error('Ошибка при загрузке объявлений:', error);
        document.getElementById('announcements').innerHTML = '<p class="no-data">Ошибка при загрузке объявлений.</p>';
    }
}

// Загрузка и отображение посещаемости
async function loadStudentAttendance(studentId) {
    try {
        const attendance = await getStudentAttendance(studentId);
        
        if (attendance && attendance.length > 0) {
            // Добавляем посещаемость в статистику
            const statsContainer = document.getElementById('performance-stats');
            const existingStats = statsContainer.innerHTML;
            
            const presentDays = attendance.filter(a => a.status === 'присутствовал').length;
            const totalDays = attendance.length;
            const attendanceRate = ((presentDays / totalDays) * 100).toFixed(1);
            
            const attendanceHtml = `
                <div class="stat-item">
                    <h4>Посещаемость</h4>
                    <p class="stat-value">${attendanceRate}%</p>
                    <small>${presentDays} из ${totalDays} дней</small>
                </div>
            `;
            
            // Вставляем статистику посещаемости после существующих статистик
            if (existingStats.includes('stats-container')) {
                statsContainer.innerHTML = existingStats.replace(
                    '</div>',
                    `</div>${attendanceHtml}`
                );
            }
        }
    } catch (error) {
        console.error('Ошибка при загрузке посещаемости:', error);
    }
}

// Загрузка и отображение учебных материалов
async function loadLearningMaterials() {
    try {
        console.log('Загрузка учебных материалов...');
        
        // Сначала пробуем получить через API
        let materials = await getLearningMaterials();
        
        // Если API не сработало, берем напрямую из mockData
        if (!materials || Object.keys(materials).length === 0) {
            console.log('API учебных материалов не сработал, берем напрямую из mockData');
            materials = mockData.learningMaterials || {};
        }
        
        const materialsContainer = document.getElementById('learning-materials');
        console.log('Полученные учебные материалы:', materials);

        if (materials && Object.keys(materials).length > 0) {
            let html = '<div class="learning-materials-section">';

            for (const [subject, subjectMaterials] of Object.entries(materials)) {
                html += `<div class="subject-materials fade-in delay-1"><h4>${subject}</h4>`;

                subjectMaterials.forEach((material, index) => {
                    const typeIcon = material.type === 'presentation' ? 'slideshow' : 
                                    material.type === 'video' ? 'play_circle' : 
                                    material.type === 'document' ? 'description' : 'insert_drive_file';
                    
                    html += `
                        <div class="material-item fade-in delay-${index + 2}">
                            <h5>
                                <span class="material-icons" style="vertical-align: middle; margin-right: 8px; color: #1976d2;">
                                    ${typeIcon}
                                </span>
                                ${material.title}
                            </h5>
                            <p>${material.description} (${material.type}, ${material.date})</p>
                            <a href="${material.url}" target="_blank" class="material-link">
                                <span class="material-icons" style="font-size: 16px; vertical-align: middle; margin-right: 4px;">open_in_new</span>
                                Открыть материал
                            </a>
                        </div>
                    `;
                });

                html += '</div>';
            }

            html += '</div>';
            materialsContainer.innerHTML = html;
            console.log('Учебные материалы успешно загружены');
        } else {
            materialsContainer.innerHTML = '<p class="no-data">Учебных материалов нет.</p>';
        }
    } catch (error) {
        console.error('Ошибка при загрузке учебных материалов:', error);
        document.getElementById('learning-materials').innerHTML = '<p class="no-data">Ошибка при загрузке учебных материалов.</p>';
    }
}

// Дополнительные функции для улучшения интерфейса

// Добавление анимаций к элементам
function addAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Функция редактирования профиля
function editProfile() {
    const profileFields = document.querySelectorAll('.profile-field');
    const editButton = document.getElementById('edit-profile-button');
    const saveButton = document.getElementById('save-profile-button');
    
    profileFields.forEach(field => {
        const label = field.querySelector('label');
        const span = field.querySelector('span');
        if (label && span) {
            const fieldName = label.textContent.replace(':', '');
            const value = span.textContent;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = value;
            input.className = 'profile-input';
            span.replaceWith(input);
        }
    });
    
    editButton.style.display = 'none';
    saveButton.style.display = 'inline-block';
}

// Функция сохранения профиля
function saveProfile() {
    const profileFields = document.querySelectorAll('.profile-field');
    const editButton = document.getElementById('edit-profile-button');
    const saveButton = document.getElementById('save-profile-button');
    
    profileFields.forEach(field => {
        const input = field.querySelector('.profile-input');
        const label = field.querySelector('label');
        if (input && label) {
            const span = document.createElement('span');
            span.textContent = input.value;
            input.replaceWith(span);
        }
    });
    
    editButton.style.display = 'inline-block';
    saveButton.style.display = 'none';
    
    // Показать уведомление об успешном сохранении
    showNotification('Профиль успешно обновлен!', 'success');
}

// Функция изменения пароля
function changePassword() {
    const newPassword = prompt('Введите новый пароль:');
    if (newPassword && newPassword.length >= 6) {
        showNotification('Пароль успешно изменен!', 'success');
    } else if (newPassword) {
        showNotification('Пароль должен содержать минимум 6 символов!', 'error');
    }
}

// Функция показа уведомлений
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification-toast ${type}`;
    notification.innerHTML = `
        <span class="material-icons" style="margin-right: 8px;">
            ${type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info'}
        </span>
        ${message}
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        font-weight: 500;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Добавление CSS для анимаций уведомлений
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .grade-mid {
        color: #ff9800;
        background: rgba(255, 152, 0, 0.1);
    }
    
    .urgent-homework {
        background: rgba(244, 67, 54, 0.05);
    }
    
    .due-date.urgent {
        color: #d32f2f;
        font-weight: 600;
        background: rgba(211, 47, 47, 0.1);
        padding: 4px 8px;
        border-radius: 4px;
    }
    
    .announcement-item.important {
        border-left-color: #f44336;
        background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .notification-item.unread {
        border-left-color: #4caf50;
        background: linear-gradient(135deg, #e8f5e8 0%, #f1f8e9 100%);
        font-weight: 500;
    }
    
    .material-link {
        display: inline-flex;
        align-items: center;
        padding: 8px 16px;
        background: rgba(25, 118, 210, 0.1);
        border-radius: 4px;
        transition: all 0.3s;
    }
    
    .material-link:hover {
        background: rgba(25, 118, 210, 0.2);
        transform: translateY(-1px);
    }
`;
document.head.appendChild(style);

// Функция загрузки уведомлений
function loadNotifications() {
    const notificationsList = document.getElementById('notifications-list');
    
    if (!notificationsList) {
        console.log('Элемент notifications-list не найден, пропускаем загрузку уведомлений');
        return;
    }
    
    // Mock данные для уведомлений
    const notifications = [
        {
            id: 1,
            title: 'Новая оценка по математике',
            message: 'Вы получили оценку "5" за контрольную работу',
            date: '2026-01-28 14:30',
            type: 'grade',
            read: false
        },
        {
            id: 2,
            title: 'Домашнее задание',
            message: 'Задано домашнее задание по химии. Страница 145-147, упражнения 1-5.',
            date: '2026-01-28 12:15',
            type: 'homework',
            read: false
        },
        {
            id: 3,
            title: 'Расписание изменено',
            message: 'Внимание! Расписание на завтра изменено. Пара по физике перенесена на 3-ю пару.',
            date: '2026-01-28 10:45',
            type: 'schedule',
            read: false
        }
    ];
    
    if (notifications.length > 0) {
        let html = '';
        notifications.forEach((notification, index) => {
            const icon = notification.type === 'grade' ? 'grade' : 
                        notification.type === 'homework' ? 'assignment' : 'schedule';
            
            html += `
                <div class="notification-item fade-in delay-${index + 1} ${!notification.read ? 'unread' : ''}">
                    <h4>
                        <span class="material-icons" style="vertical-align: middle; margin-right: 8px; color: #1976d2;">
                            ${icon}
                        </span>
                        ${notification.title}
                    </h4>
                    <p>${notification.message}</p>
                    <small>${notification.date}</small>
                </div>
            `;
        });
        
        notificationsList.innerHTML = html;
    } else {
        notificationsList.innerHTML = '<p class="no-data">Уведомлений нет.</p>';
    }
}
