import "./App.css";
import { SearchForm } from "./components/SearchForm";
import { Container } from "./components/Container";
import { Metrics } from "./components/Metrics";
import { CreateModal } from "./components/CreateModal";
import { TodoTable } from "./components/TodoTable";
import "./styles/ContainerStyles.css";
import "./styles/FormStyles.css";
import "./styles/MetricsStyles.css";
import "./styles/ModalStyles.css";
import "./styles/TableStyles.css";
import { SearchProvider } from "./components/SearchContext";

function App() {
  return (
    <SearchProvider>
      <Container>
        <SearchForm />
        <CreateModal />
        <TodoTable />
        <Metrics />
      </Container>
    </SearchProvider>
  );
}

export default App;
