import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import "./App.css";
import AppRouter from "@/AppRouter";
import { store } from "@/redux/store";
import ErrorBoundary from "@/components/error";

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <AppRouter />
        <Toaster />
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
