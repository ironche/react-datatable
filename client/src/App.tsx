import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoutes } from './routes';
import CenteredLayout from './home/layouts/CenteredLayout';
import WelcomePage from './home/pages/welcome';
import NotFoundPage from './home/pages/not-found';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.HOME} element={<CenteredLayout />}>
          <Route index element={<WelcomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
