import { Provider } from "react-redux";
import "./App.css";
import AppRouter from "./AppRouter";
import { Toaster } from "react-hot-toast";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
      <Toaster />
    </Provider>
  );
}

export default App;
