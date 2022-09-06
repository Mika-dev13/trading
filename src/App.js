import { StockDetailPage } from "./pages/StockDetailPage";
import { StockOverviewPage } from "./pages/StockOverviewPage";


function App() {
  return (
    <div className="App">
      <StockDetailPage />
      <StockOverviewPage />
      <h2 className='text-danger mt-5'>hello world</h2>
    </div>
  );
}

export default App;
