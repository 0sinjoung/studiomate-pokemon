import "./App.css";
import { RecoilEnv, RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import PageProvider from "./PageProvider";

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <div className="App">
          <PageProvider />
        </div>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
