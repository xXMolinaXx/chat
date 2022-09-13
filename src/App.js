// eslint-disable-next-line
import 'antd/dist/antd.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { ChatingView, NotFound } from './views';
import CreateUser from './views/CreateUser/CreateUser';
import './styles.css';
import { UserContextComponent } from './hooks/userContext';
function App() {
  return (
    <UserContextComponent>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateUser />} />
          <Route path="/chats" element={<ChatingView />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserContextComponent>
  );
}

export default App;
