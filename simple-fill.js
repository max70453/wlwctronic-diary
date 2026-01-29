// Простое заполнение данных без сложной логики
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== НАЧАЛО ЗАПОЛНЕНИЯ ДАННЫХ ===');
    
    // Ждем загрузки DOM
    setTimeout(function() {
        // Данные по умолчанию
        const defaultData = {
            name: 'Иван Иванов',
            class: '10А',
            email: 'ivan.ivanov@school.ru',
            phone: '+7 (999) 123-45-67'
        };
        
        // Заполняем основную информацию
        const nameElement = document.getElementById('student-name-value');
        const classElement = document.getElementById('student-class-value');
        
        if (nameElement) {
            nameElement.textContent = defaultData.name;
            console.log('✅ Имя установлено:', defaultData.name);
        } else {
            console.log('❌ Элемент student-name-value не найден');
        }
        
        if (classElement) {
            classElement.textContent = defaultData.class;
            console.log('✅ Класс установлен:', defaultData.class);
        } else {
            console.log('❌ Элемент student-class-value не найден');
        }
        
        // Заполняем профиль
        const profileName = document.getElementById('profile-name');
        const profileEmail = document.getElementById('profile-email');
        const profileClass = document.getElementById('profile-class');
        const profilePhone = document.getElementById('profile-phone');
        
        if (profileName) {
            profileName.textContent = defaultData.name;
            console.log('✅ Profile name установлен');
        }
        
        if (profileEmail) {
            profileEmail.textContent = defaultData.email;
            console.log('✅ Profile email установлен');
        }
        
        if (profileClass) {
            profileClass.textContent = defaultData.class;
            console.log('✅ Profile class установлен');
        }
        
        if (profilePhone) {
            profilePhone.textContent = defaultData.phone;
            console.log('✅ Profile phone установлен');
        }
        
        // Заполняем расписание
        const dailySchedule = document.getElementById('daily-schedule');
        if (dailySchedule) {
            dailySchedule.innerHTML = `
                <ul class="schedule-list">
                    <li class="schedule-item">
                        <span class="schedule-time">08:30-09:15</span>
                        <span>Математика</span>
                        <span class="schedule-room">101</span>
                    </li>
                    <li class="schedule-item">
                        <span class="schedule-time">09:25-10:10</span>
                        <span>Физика</span>
                        <span class="schedule-room">202</span>
                    </li>
                </ul>
            `;
            console.log('✅ Расписание установлено');
        }
        
        // Заполняем полное расписание
        const scheduleTable = document.getElementById('schedule-table');
        if (scheduleTable) {
            scheduleTable.innerHTML = `
                <div class="table-wrapper">
                    <table class="schedule-table">
                        <thead>
                            <tr>
                                <th>День недели</th>
                                <th>Время</th>
                                <th>Предмет</th>
                                <th>Учитель</th>
                                <th>Кабинет</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Понедельник</td>
                                <td>08:30-09:15</td>
                                <td>Математика</td>
                                <td>Иванов И.И.</td>
                                <td>101</td>
                            </tr>
                            <tr>
                                <td>Понедельник</td>
                                <td>09:25-10:10</td>
                                <td>Физика</td>
                                <td>Петров П.П.</td>
                                <td>202</td>
                            </tr>
                            <tr>
                                <td>Вторник</td>
                                <td>08:30-09:15</td>
                                <td>Русский язык</td>
                                <td>Сидорова С.С.</td>
                                <td>103</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;
            console.log('✅ Полное расписание установлено');
        }
        
        // Заполняем новые оценки
        const newGrades = document.getElementById('new-grades');
        if (newGrades) {
            newGrades.innerHTML = `
                <ul class="grades-list">
                    <li class="grade-item">
                        <span>Математика</span>
                        <span class="grade-value grade-good">5</span>
                        <span>28.01.2026</span>
                    </li>
                    <li class="grade-item">
                        <span>Физика</span>
                        <span class="grade-value grade-mid">4</span>
                        <span>27.01.2026</span>
                    </li>
                </ul>
            `;
            console.log('✅ Новые оценки установлены');
        }
        
        // Заполняем полную таблицу оценок
        const gradesTable = document.getElementById('grades-table');
        if (gradesTable) {
            gradesTable.innerHTML = `
                <div class="table-wrapper">
                    <table class="grades-table">
                        <thead>
                            <tr>
                                <th>Предмет</th>
                                <th>Оценка</th>
                                <th>Дата</th>
                                <th>Учитель</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Математика</td>
                                <td><span class="grade-value grade-good">5</span></td>
                                <td>28.01.2026</td>
                                <td>Иванов И.И.</td>
                            </tr>
                            <tr>
                                <td>Физика</td>
                                <td><span class="grade-value grade-mid">4</span></td>
                                <td>27.01.2026</td>
                                <td>Петров П.П.</td>
                            </tr>
                            <tr>
                                <td>Русский язык</td>
                                <td><span class="grade-value grade-good">5</span></td>
                                <td>26.01.2026</td>
                                <td>Сидорова С.С.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;
            console.log('✅ Полная таблица оценок установлена');
        }
        
        // Заполняем статистику
        const performanceStats = document.getElementById('performance-stats');
        if (performanceStats) {
            performanceStats.innerHTML = `
                <div class="stats-container">
                    <div class="stat-item">
                        <h4>Средний балл</h4>
                        <p class="stat-value">4.5</p>
                        <small>По всем предметам</small>
                    </div>
                    <div class="stat-item">
                        <h4>Всего оценок</h4>
                        <p class="stat-value">12</p>
                        <small>За этот период</small>
                    </div>
                </div>
            `;
            console.log('✅ Статистика установлена');
        }
        
        console.log('=== ЗАПОЛНЕНИЕ ДАННЫХ ЗАВЕРШЕНО ===');
    }, 1000); // Ждем 1 секунду для полной загрузки DOM
});
