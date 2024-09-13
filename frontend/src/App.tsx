import './App.css';
import { SearchForm } from './components/SearchForm';
import { Container } from './components/Container';
import { Metrics } from './components/Metrics';
import { CreateModal } from './components/CreateModal';
import { TodoTable } from './components/TodoTable';
import './styles/ContainerStyles.css';
import './styles/FormStyles.css';
import './styles/MetricsStyles.css';
import './styles/ModalStyles.css';

const todos = [
  { id: 1, name: 'Task 1', priority: 'Low', dueDate: '2024-09-20', done: true },
  { id: 2, name: 'Task 2', priority: 'High', dueDate: '2024-09-15', done: false },
  { id: 3, name: 'Task 3', priority: 'Medium', dueDate: '2024-09-25', done: true },
  { id: 4, name: 'Task 4', priority: 'Low', dueDate: '2024-10-05', done: false },
  { id: 5, name: 'Task 5', priority: 'Medium', dueDate: '2024-09-30', done: true },
];

function App() {
  return (
    <Container>
      <SearchForm />
      <CreateModal />
      <TodoTable todos={todos} />
      <Metrics />
    </Container>
  );
}

export default App;
