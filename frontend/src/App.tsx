import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import "./App.css";
import AppRouter from "@/AppRouter";
import { store } from "@/redux/store";
import ErrorBoundary from "@/components/error";
import { ThemeProvider } from "@/components/theme";

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Provider store={store}>
          <AppRouter />
          <Toaster />
        </Provider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
