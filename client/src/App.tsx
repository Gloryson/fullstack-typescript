import { Route, Routes } from 'react-router-dom';
import { Navigation } from './components';
import { AuthorizationPage, DatabasePage, RegistrationPage, UploadImagePage } from './pages';





export default function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/authorization' element={ <AuthorizationPage /> } />
        <Route path='/registration' element={ <RegistrationPage /> } />
        <Route path='/upload-image' element={ <UploadImagePage /> } />
        <Route />
        <Route path='/database' element={ <DatabasePage /> } />
        <Route />
        <Route />
      </Routes>
    </>
  )
}