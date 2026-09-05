// Add the 'name' property to the Worker type
type Worker = {
  name: string
  email: string
  branch: string
  role: string
  apiId: string
  color: string
}

export const MOCK_WORKERS: Worker[] = [
  {
    name: 'Марія Олія Іванівна',
    email: 'user@gmail.com',
    branch: 'Філія',
    role: 'Адміністратор',
    apiId: 'emp_73f92ab1',
    color: '#4caf50',
  },
  {
    name: 'Олег Петрович Сидоренко',
    email: 'oleg.sidorenko@example.com',
    branch: 'Філія',
    role: 'Лікар',
    apiId: 'emp_84f93ab2',
    color: '#ff9800',
  },
  {
    name: 'Анна Василівна Коваль',
    email: 'anna.koval@example.com',
    branch: 'Філія',
    role: 'Лікар',
    apiId: 'emp_39f93ab3',
    color: '#3f51b5',
  },
  {
    name: 'Ігор Сергійович Ткаченко',
    email: 'igor.tkachenko@example.com',
    branch: 'Філія',
    role: 'Асистент',
    apiId: 'emp_22f93ab4',
    color: '#00bcd4',
  },
  {
    name: 'Тетяна Олександрівна',
    email: 'tetyana.hrytsenko@example.com',
    branch: 'Філія',
    role: 'Асистент',
    apiId: 'emp_15f93ab5',
    color: '#e64a19',
  },
  {
    name: 'Володимир Андрійович',
    email: 'volodymyr.bondar@example.com',
    branch: 'Філія',
    role: 'Лікар',
    apiId: 'emp_67f93ab6',
    color: '#9c27b0',
  },
  {
    name: 'Наталя Миколаївна',
    email: 'nataliya.lysenko@example.com',
    branch: 'Філія',
    role: 'Лікар',
    apiId: 'emp_78f93ab7',
    color: '#cddc39',
  },
]

type Permission = {
  label: string
  values: boolean[]
}

export const PERMISSIONS: Permission[] = [
  { label: 'Візити', values: [false, false, false] },
  { label: 'Бачить тільки своє', values: [false, false, false] },
  { label: 'Блокування видалення не своїх даних', values: [false, true, false] },
  { label: 'Повне блокування видалення', values: [false, false, false] },
  { label: 'Дозволити експорт', values: [false, false, false] },
  { label: 'Дозволити масове редагування', values: [false, false, false] },
  { label: 'Дозволити імпорт', values: [false, false, false] },
  { label: 'Сховати журнал активності в картках', values: [false, false, false] },
  { label: 'Пацієнти', values: [false, false, false] },
  { label: 'Розділ: Статистика', values: [false, false, false] },
]

export const ROLE_OPTIONS = ['Адміністратор', 'Лікар', 'Асистент']
export const BRANCH_OPTIONS = ['Філія']
export const COLOR_OPTIONS = [
  { value: '#4caf50', label: 'Зелений', id: 1 },
  { value: '#0029d9', label: 'Синій', id: 2 },
  { value: '#ff9800', label: 'Оранжевий', id: 3 },
]

export const TAB_LABELS = ['Працівники', 'Ролі', 'Філії']

// Add the 'Brance' type definition
type Brance = {
  name: string
  usersCount: number
  address: string
  id: string
}

export const MOCK_BRANCES: Brance[] = [
  {
    name: 'Філія',
    usersCount: 10,
    address: 'Адреса',
    id: 'emp_73f92ab1',
  },
  {
    name: 'Філія',
    usersCount: 10,
    address: 'Адреса',
    id: 'emp_73f92ab2',
  },
  {
    name: 'Філія',
    usersCount: 154,
    address: 'Адреса',
    id: 'emp_73f92ab3',
  },
  {
    name: 'Філія',
    usersCount: 123,
    address: 'Адреса',
    id: 'emp_73f92ab4',
  },
]
