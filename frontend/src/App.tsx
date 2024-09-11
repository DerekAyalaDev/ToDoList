import './App.css';
import { SearchForm } from './components/SearchForm';
import { Container } from './components/Container';
import { Metrics } from './components/Metrics';
import { CreateModal } from './components/CreateModal';
import './styles/ContainerStyles.css';
import './styles/FormStyles.css';
import './styles/MetricsStyles.css';
import './styles/ModalStyles.css';

function App() {
  return (
    <Container>
      <SearchForm />
      <CreateModal />
      <Metrics />
    </Container>
  );
}

export default App;
