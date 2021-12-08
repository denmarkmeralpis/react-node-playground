import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { AddLog } from './components/AddLog';
import { EditLog } from './components/EditLog';
import { GlobalProvider } from './context/GlobalState';
import { ReturnBook } from './components/ReturnBook';

import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Container
} from 'reactstrap';

function App() {
  return (
    <Container className="mt-4">
      <GlobalProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/new" component={ AddLog } />
            <Route path="/edit/:id" component={ EditLog } />
            <Route path="/return" component={ ReturnBook } />
          </Switch>
        </Router>
      </GlobalProvider>
    </Container>
  );
}

export default App;
