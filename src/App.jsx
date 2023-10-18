import { Provider } from 'react-redux';
import { store } from './store';

import UsersPage from "./pages/UsersPage";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <UsersPage />
    </Provider>
  )
}

export default App
