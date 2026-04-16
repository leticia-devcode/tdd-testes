// ============================================================
// taskManager.js — Regras de negócio do gerenciador de tarefas
// ============================================================
// Todas as funções são PURAS:
//   - mesma entrada → mesma saída
//   - sem efeitos colaterais
//   - sem dependência de DOM, banco de dados ou APIs externas
// ============================================================

let _nextId = 1;

/**
 * Reseta o contador de IDs (útil para testes determinísticos).
 */
export function resetId() {
  _nextId = 1;
}

// ------------------------------------------------------------
// Validação
// ------------------------------------------------------------

export function validateTitle(title) {
  if (typeof title !== 'string') {
    return false;
  }

  const trimmed = title.trim();
  return trimmed.length >= 3;
}

// ------------------------------------------------------------
// Criação
// ------------------------------------------------------------

export function createTask(title, priority = 'medium') {
  return {
    id: _nextId++,
    title: title.trim(),
    completed: false,
    priority // Nova propriedade
  };
}



 export function addTask(tasks, title) {
  if (!validateTitle(title)) {
    throw new Error('Título inválido: deve ser uma string com pelo menos 3 caracteres.');
  }
   if (isDuplicate(tasks, title)) {
    throw new Error('Tarefa duplicada.');
  }

  const newTask = createTask(title);
  return [...tasks, newTask];
}



// ------------------------------------------------------------
// Alteração de estado
// ------------------------------------------------------------

export function toggleTask(task) {
  return {
    ...task,
    completed: !task.completed,
  };
}

// ------------------------------------------------------------
// Remoção
// ------------------------------------------------------------

export function removeTask(tasks, taskId) {
  return tasks.filter((task) => task.id !== taskId);
}

// ------------------------------------------------------------
// Filtros
// ------------------------------------------------------------

export function filterTasks(tasks, status) {
  switch (status) {
    case 'completed':
      return tasks.filter((task) => task.completed === true);
    case 'pending':
      return tasks.filter((task) => task.completed === false);
    case 'all':
    default:
      return [...tasks];
  }
}

// ------------------------------------------------------------
// Contagens
// ------------------------------------------------------------

export function countTasks(tasks) {
  return tasks.length;
}

export function countCompleted(tasks) {
  return tasks.filter((task) => task.completed === true).length;
}

export function countPending(tasks) {
  return tasks.filter((task) => task.completed === false).length;
}

export function validatePriority(priority) {
  return ['low', 'medium', 'high'].includes(priority);
}

export function filterByPriority(tasks, priority) {
  return tasks.filter(t => t.priority === priority);
}

export function isDuplicate(tasks, title) {
  if (!title) return false;
  const normalized = title.trim().toLowerCase();
  return tasks.some(t => t.title.toLowerCase() === normalized);
}

export function sortTasks(tasks) {
  // Cria uma cópia com spread para garantir a imutabilidade antes do sort
  return [...tasks].sort((a, b) => Number(a.completed) - Number(b.completed));
}

export function searchTasks(tasks, query) {
  if (!query) return [...tasks]; // Se a query for vazia, retorna cópia de tudo
  
  const q = query.toLowerCase();
  return tasks.filter(t => t.title.toLowerCase().includes(q));
}
