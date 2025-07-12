// Timefit - Organize seu tempo, alcance mais!
document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('new-task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const totalEndTimeDisplay = document.getElementById('total-end-time');

    let tasks = [];
    let draggedItem = null;

    // Carregar tarefas do localStorage
    function loadTasks() {
        const saved = localStorage.getItem('timefit-tasks');
        if (saved) {
            try {
                tasks = JSON.parse(saved);
            } catch {
                tasks = [];
            }
        }
    }

    // Salvar tarefas no localStorage
    function saveTasks() {
        localStorage.setItem('timefit-tasks', JSON.stringify(tasks));
    }

    // Preenche o select de hora de início geral
    function fillStartTimeSelect() {
        const select = document.getElementById('start-time-select');
        select.innerHTML = '';
        for (let h = 0; h < 24; h++) {
            for (let m = 0; m < 60; m += 15) {
                const value = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
                const option = document.createElement('option');
                option.value = value;
                option.textContent = value;
                select.appendChild(option);
            }
        }
    }

    // Carregar hora inicial do localStorage
    function loadStartTime() {
        const saved = localStorage.getItem('timefit-start-time');
        const select = document.getElementById('start-time-select');
        if (saved && select) select.value = saved;
    }
    function saveStartTime() {
        const select = document.getElementById('start-time-select');
        if (select) localStorage.setItem('timefit-start-time', select.value);
    }

    const parseTimeToMinutes = (timeStr) => {
        if (!timeStr) return 0;
        const [hours, minutes] = timeStr.split(':').map(Number);
        return (isNaN(hours) ? 0 : hours * 60) + (isNaN(minutes) ? 0 : minutes);
    };

    const formatMinutesToTime = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    };

    const renderAndRecalculate = () => {
        const activeElement = document.activeElement;
        const activeTaskId = activeElement.closest('.task-item')?.dataset.id;
        const activeElementClass = activeElement.className;

        taskList.innerHTML = '';
        let currentTime = parseTimeToMinutes(document.getElementById('start-time-select').value);
        tasks.forEach((task, index) => {
            const taskStartTime = currentTime;
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.setAttribute('draggable', 'true');
            li.dataset.id = task.id;
            // Cria select para duração
            let durationOptions = '';
            for (let min = 15; min <= 240; min += 15) {
                const label = `${String(Math.floor(min/60)).padStart(2, '0')}:${String(min%60).padStart(2, '0')}`;
                durationOptions += `<option value="${min}"${task.duration === min ? ' selected' : ''}>${label}</option>`;
            }
            li.innerHTML = `
                <input type="checkbox" class="complete-check" ${task.completed ? 'checked' : ''} aria-label="Marcar como concluída">
                <span class="start-time">${formatMinutesToTime(taskStartTime)}</span>
                <span class="task-text" contenteditable="true" spellcheck="false">${task.text}</span>
                <select class="duration-select">${durationOptions}</select>
                <button class="delete-btn" aria-label="Excluir tarefa">×</button>
            `;
            taskList.appendChild(li);
            currentTime += task.duration;
        });
        totalEndTimeDisplay.textContent = formatMinutesToTime(currentTime);
        saveTasks();
        if (activeTaskId) {
            const newActiveItem = taskList.querySelector(`.task-item[data-id="${activeTaskId}"]`);
            if (newActiveItem) {
                const elementToFocus = newActiveItem.querySelector(`.${activeElementClass.split(' ')[0]}`);
                if (elementToFocus) {
                    elementToFocus.focus();
                    if (elementToFocus.hasAttribute('contenteditable')) {
                        document.execCommand('selectAll', false, null);
                        document.getSelection().collapseToEnd();
                    }
                }
            }
        }
    };

    const addTask = (text, duration = 60) => {
        if (text.trim() === '') return;
        const newId = Date.now() + Math.random();
        const newTask = {
            id: newId,
            text: text.trim(),
            completed: false,
            duration: duration
        };
        tasks.push(newTask);
        renderAndRecalculate();
    };

    const findTaskAndIndex = (id) => {
        const taskIndex = tasks.findIndex(t => t.id == id);
        return { task: tasks[taskIndex], index: taskIndex };
    }

    const deleteTask = (id) => {
        tasks = tasks.filter(task => task.id != id);
        renderAndRecalculate();
    };

    taskList.addEventListener('click', (e) => {
        const target = e.target;
        const parentItem = target.closest('.task-item');
        if (!parentItem) return;
        const id = parseFloat(parentItem.dataset.id);
        if (target.classList.contains('delete-btn')) {
            deleteTask(id);
        }
    });

    taskList.addEventListener('change', (e) => {
        const target = e.target;
        const parentItem = target.closest('.task-item');
        if (!parentItem) return;
        const id = parseFloat(parentItem.dataset.id);
        const { task } = findTaskAndIndex(id);
        if (!task) return;
        if (target.classList.contains('complete-check')) {
            task.completed = target.checked;
            renderAndRecalculate();
        }
        if (target.classList.contains('duration-select')) {
            task.duration = parseInt(target.value, 10);
            renderAndRecalculate();
        }
    });

    taskList.addEventListener('focusout', (e) => {
        const target = e.target;
        if (target.classList.contains('task-text')) {
            const parentItem = target.closest('.task-item');
            if (!parentItem) return;
            const id = parseFloat(parentItem.dataset.id);
            const { task } = findTaskAndIndex(id);
            if (task && task.text !== target.innerText) {
                task.text = target.innerText;
            }
        }
    });

    addTaskBtn.addEventListener('click', () => {
        addTask(newTaskInput.value);
        newTaskInput.value = '';
        newTaskInput.focus();
    });

    newTaskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    });
    newTaskInput.addEventListener('paste', (e) => {
        e.preventDefault();
        const pasteData = (e.clipboardData || window.clipboardData).getData('text');
        const lines = pasteData.split('\n').filter(line => line.trim() !== '');
        lines.forEach(line => {
            addTask(line.trim(), 60);
        });
        newTaskInput.value = '';
    });
    document.getElementById('start-time-select').addEventListener('change', () => {
        renderAndRecalculate();
        saveStartTime();
    });
    taskList.addEventListener('dragstart', (e) => {
        draggedItem = e.target;
        setTimeout(() => draggedItem.classList.add('dragging'), 0);
    });
    taskList.addEventListener('dragend', () => {
        draggedItem.classList.remove('dragging');
        draggedItem = null;
    });
    taskList.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(taskList, e.clientY);
        if (afterElement == null) {
            taskList.appendChild(draggedItem);
        } else {
            taskList.insertBefore(draggedItem, afterElement);
        }
    });
    taskList.addEventListener('drop', () => {
        const newOrderedIds = Array.from(taskList.querySelectorAll('.task-item')).map(item => parseFloat(item.dataset.id));
        tasks.sort((a, b) => newOrderedIds.indexOf(a.id) - newOrderedIds.indexOf(b.id));
        renderAndRecalculate();
    });
    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.task-item:not(.dragging)')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
    // Inicialização
    fillStartTimeSelect();
    loadTasks();
    loadStartTime();
    if (tasks.length === 0) {
        addTask("Reunião de alinhamento", 30);
        addTask("Desenvolver feature X", 120);
        addTask("Pausa para o café", 15);
        addTask("Revisar Pull Request", 45);
    } else {
        renderAndRecalculate();
    }
});
