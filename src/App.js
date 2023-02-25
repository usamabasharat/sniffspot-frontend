import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NewSpot } from "components/Spot/NewSpot";
import { Spot } from "components/Spot/Spot";
import { Spots } from "components/Spots/Spots";
import { PageNotFound } from "components/Error/PageNotFound";
import { SpotContextProvider } from "contexts/SpotContext";
import urls from "routing/urls";

function App() {
  return (
    <SpotContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path={urls.base} element={<Navigate to={urls.getAllSpots} replace />} />
          <Route path={urls.getAllSpots} element={<Spots />} />
          <Route path={urls.getSpot} element={<Spot />} />
          <Route path={urls.newSpot} element={<NewSpot />} />
          <Route path={urls.editSpot} element={<NewSpot />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </SpotContextProvider>
  );
}

export default App;
