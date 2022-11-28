import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { ChatingView, NotFound } from './views';
import CreateUser from './views/CreateUser/CreateUser';
import './styles.css';
import { UserContextComponent } from './hooks/userContext';
import GridExample from './views/gridExample/GridExample';
function App() {
  return (
    <UserContextComponent>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateUser />} />
          <Route path="/chats" element={<ChatingView />} />
          <Route path="/grid" element={<GridExample />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserContextComponent>
  );
}

export default App;
