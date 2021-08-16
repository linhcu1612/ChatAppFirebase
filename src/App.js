/** @format */

import Login from "components/Login";
import ChatRoom from "components/ChatRoom";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import AuthProvider from "Context/AuthProvider";
import AppProvider from "Context/AppProvider";
import AddRoomModal from "components/Modals/AddRoomModal";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Switch>
            <Route component={Login} path='/login' />
            <Route component={ChatRoom} path='/' />
          </Switch>
          <AddRoomModal />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
