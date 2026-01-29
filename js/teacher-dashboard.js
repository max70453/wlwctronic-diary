// Функции для работы с данными учителя

// Инициализация страницы учителя
document.addEventListener('DOMContentLoaded', async function() {
    // Получаем ID учителя из localStorage или другого источника
    // В реальном приложении это будет получено после аутентификации
    const teacherId = localStorage.getItem('teacherId') || 'teacher1';

    // Загружаем и отображаем информацию об учителе
    await loadTeacherInfo(teacherId);

    // Загружаем и отображаем список классов и учеников
    await loadTeacherClasses(teacherId);

    // Инициализируем формы для выставления оценок и добавления домашних заданий
    initGradeForm(teacherId);
    initHomeworkForm(teacherId);
});

// Загрузка и отображение информации об учителе
async function loadTeacherInfo(teacherId) {
    try {
        const teacherInfo = await getTeacherInfo(teacherId);

        if (teacherInfo) {
            document.getElementById('teacher-name-value').textContent = teacherInfo.name;
            document.getElementById('teacher-subjects-value').textContent = teacherInfo.subjects.join(', ');
        }
    } catch (error) {
        console.error('Ошибка при загрузке информации об учителе:', error);
    }
}

// Загрузка и отображение списка классов и учеников
async function loadTeacherClasses(teacherId) {
    try {
        const classes = await getTeacherClasses(teacherId);
        const classesList = document.getElementById('classes-list');

        if (classes && classes.length > 0) {
            let html = '';

            classes.forEach(classInfo => {
                html += `
                    <div class="class-item">
                        <h4>${classInfo.name}</h4>
                        <div class="students-list">
                            <table class="students-table">
                                <thead>
                                    <tr>
                                        <th>Имя ученика</th>
                                        <th>Действия</th>
                                    </tr>
                                </thead>
                                <tbody>
                `;

                classInfo.students.forEach(student => {
                    html += `
                        <tr>
                            <td>${student.name}</td>
                            <td>
                                <button class="mui-btn" onclick="showGradeForm('${student.id}', '${classInfo.name}')">Выставить оценку</button>
                            </td>
                        </tr>
                    `;
                });

                html += `
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;
            });

            classesList.innerHTML = html;
        } else {
            classesList.innerHTML = '<p>Классы не найдены.</p>';
        }
    } catch (error) {
        console.error('Ошибка при загрузке классов:', error);
        document.getElementById('classes-list').innerHTML = '<p>Ошибка при загрузке классов.</p>';
    }
}

// Инициализация формы для выставления оценок
function initGradeForm(teacherId) {
    const gradeFormContainer = document.getElementById('grades-form');

    gradeFormContainer.innerHTML = `
        <div id="grade-form-container" style="display: none;">
            <h4>Выставить оценку</h4>
            <div class="grades-form-container">
                <input type="hidden" id="selected-student-id">
                <input type="hidden" id="selected-class-name">

                <div class="form-row">
                    <div class="form-control">
                        <label for="grade-subject">Предмет</label>
                        <select id="grade-subject" class="MuiInputBase-input MuiInput-input">
                            <option value="Математика">Математика</option>
                            <option value="Русский язык">Русский язык</option>
                            <option value="Физика">Физика</option>
                            <option value="История">История</option>
                        </select>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-control">
                        <label for="grade-value">Оценка</label>
                        <select id="grade-value" class="MuiInputBase-input MuiInput-input">
                            <option value="5">5</option>
                            <option value="4">4</option>
                            <option value="3">3</option>
                            <option value="2">2</option>
                        </select>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-control">
                        <label for="grade-date">Дата</label>
                        <input type="date" id="grade-date" class="MuiInputBase-input MuiInput-input" value="${new Date().toISOString().split('T')[0]}">
                    </div>
                </div>

                <div class="form-row">
                    <button class="MuiButton-root MuiButton-contained MuiButton-containedPrimary" onclick="submitGrade('${teacherId}')">
                        <span class="MuiButton-label">Выставить оценку</span>
                    </button>
                    <button class="MuiButton-root MuiButton-contained" onclick="hideGradeForm()">
                        <span class="MuiButton-label">Отмена</span>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Показать форму для выставления оценки
function showGradeForm(studentId, className) {
    document.getElementById('selected-student-id').value = studentId;
    document.getElementById('selected-class-name').value = className;
    document.getElementById('grade-form-container').style.display = 'block';
}

// Скрыть форму для выставления оценки
function hideGradeForm() {
    document.getElementById('grade-form-container').style.display = 'none';
}

// Отправить оценку
async function submitGrade(teacherId) {
    const studentId = document.getElementById('selected-student-id').value;
    const subject = document.getElementById('grade-subject').value;
    const grade = document.getElementById('grade-value').value;
    const date = document.getElementById('grade-date').value;

    try {
        const result = await setStudentGrade(studentId, subject, parseInt(grade), date);

        if (result.success) {
            alert('Оценка успешно выставлена!');
            hideGradeForm();
        } else {
            alert('Ошибка при выставлении оценки: ' + result.error);
        }
    } catch (error) {
        console.error('Ошибка при выставлении оценки:', error);
        alert('Ошибка при выставлении оценки.');
    }
}

// Инициализация формы для добавления домашних заданий
function initHomeworkForm(teacherId) {
    const homeworkFormContainer = document.getElementById('grades-form');

    const formHTML = `
        <div class="homework-form-container" style="margin-top: 30px;">
            <h4>Добавить домашнее задание</h4>
            <div class="grades-form-container">
                <div class="form-row">
                    <div class="form-control">
                        <label for="homework-class">Класс</label>
                        <select id="homework-class" class="MuiInputBase-input MuiInput-input">
                            <option value="10А">10А</option>
                        </select>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-control">
                        <label for="homework-subject">Предмет</label>
                        <select id="homework-subject" class="MuiInputBase-input MuiInput-input">
                            <option value="Математика">Математика</option>
                            <option value="Русский язык">Русский язык</option>
                            <option value="Физика">Физика</option>
                            <option value="История">История</option>
                        </select>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-control">
                        <label for="homework-task">Задание</label>
                        <textarea id="homework-task" class="MuiInputBase-input MuiInput-input" rows="3"></textarea>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-control">
                        <label for="homework-due-date">Срок выполнения</label>
                        <input type="date" id="homework-due-date" class="MuiInputBase-input MuiInput-input" value="${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}">
                    </div>
                </div>

                <div class="form-row">
                    <button class="MuiButton-root MuiButton-contained MuiButton-containedPrimary" onclick="submitHomework('${teacherId}')">
                        <span class="MuiButton-label">Добавить задание</span>
                    </button>
                </div>
            </div>
        </div>
    `;

    homeworkFormContainer.innerHTML += formHTML;
}

// Отправить домашнее задание
async function submitHomework(teacherId) {
    const className = document.getElementById('homework-class').value;
    const subject = document.getElementById('homework-subject').value;
    const task = document.getElementById('homework-task').value;
    const dueDate = document.getElementById('homework-due-date').value;

    try {
        const result = await addHomework(className, subject, task, dueDate);

        if (result.success) {
            alert('Домашнее задание успешно добавлено!');
        } else {
            alert('Ошибка при добавлении домашнего задания: ' + result.error);
        }
    } catch (error) {
        console.error('Ошибка при добавлении домашнего задания:', error);
        alert('Ошибка при добавлении домашнего задания.');
    }
}
