import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NewSpot } from "components/Spot/NewSpot";
import { Spot } from "components/Spot/Spot";
import { Spots } from "components/Spots/Spots";
import { PageNotFound } from "components/Error/PageNotFound";
import { SpotContextProvider } from "contexts/SpotContext";

function App() {
  return (
    <SpotContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/spots" replace />} />
          <Route path="/spots" element={<Spots />} />
          <Route path="/spots/:id" element={<Spot />} />
          <Route path="/spots/new" element={<NewSpot />} />
          <Route path="/spots/edit/:id" element={<NewSpot />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </SpotContextProvider>
  );
}

export default App;
