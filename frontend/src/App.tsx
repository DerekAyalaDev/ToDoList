import React from 'react';
import './App.css';
import { SearchForm } from './components/SearchForm';
import { Container } from './components/Container';
import './styles/ContainerStyles.css';
import './styles/SearchFormStyles.css';
import './styles/MetricsStyles.css';
import { Metrics } from './components/Metrics';

function App() {
  return (
    <Container>
      <SearchForm />
      <Metrics />
    </Container>
  );
}

export default App;
