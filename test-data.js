// Тестовый скрипт для проверки загрузки данных
console.log('=== ТЕСТ ЗАГРУЗКИ ДАННЫХ ===');

// Проверяем mockData
if (typeof mockData !== 'undefined') {
    console.log('✅ MockData доступен');
    console.log('Студенты:', Object.keys(mockData.students));
    
    // Проверяем данные student1
    const student1 = mockData.students['student1'];
    if (student1) {
        console.log('✅ Данные student1:', student1);
        console.log('Имя:', student1.name);
        console.log('Класс:', student1.class);
        console.log('Оценки:', student1.grades);
        console.log('Расписание:', student1.schedule);
    } else {
        console.log('❌ Данные student1 не найдены');
    }
} else {
    console.log('❌ MockData не доступен');
}

// Проверяем DOM элементы
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== ПРОВЕРКА DOM ЭЛЕМЕНТОВ ===');
    
    const elements = [
        'student-name-value',
        'student-class-value', 
        'profile-name',
        'daily-schedule',
        'grades-table',
        'performance-stats'
    ];
    
    elements.forEach(id => {
        const element = document.getElementById(id);
        console.log(`${id}:`, element ? '✅' : '❌');
    });
    
    // Пытаемся заполнить данные напрямую
    if (mockData && mockData.students) {
        const student = mockData.students['student1'];
        if (student) {
            console.log('=== ЗАПОЛНЕНИЕ ДАННЫХ ===');
            
            const nameElement = document.getElementById('student-name-value');
            const classElement = document.getElementById('student-class-value');
            
            if (nameElement) {
                nameElement.textContent = student.name;
                console.log('✅ Имя установлено:', student.name);
            }
            
            if (classElement) {
                classElement.textContent = student.class;
                console.log('✅ Класс установлен:', student.class);
            }
        }
    }
});
