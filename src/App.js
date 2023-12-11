import Header from "./Components/header/header";
import { Provider } from "react-redux";
import store from "./Store/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Header/>
      </Provider>
    </>
  )
}

export default App;
