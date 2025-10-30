import { Navigate, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import FilesPage from './pages/FilesPage.jsx';
import FileDetailPage from './pages/FileDetailPage.jsx';
import ApprovalsPage from './pages/ApprovalsPage.jsx';
import SimpleAuditDashboard from './pages/SimpleAuditDashboard.jsx';
import ProtectedLayout from './components/ProtectedLayout.jsx';
import BossOnlyRoute from './components/BossOnlyRoute.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route element={<ProtectedLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="files" element={<FilesPage />} />
        <Route path="files/:id" element={<FileDetailPage />} />
        <Route path="approvals" element={<ApprovalsPage />} />
        <Route path="audit" element={
          <BossOnlyRoute>
            <SimpleAuditDashboard />
          </BossOnlyRoute>
        } />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
