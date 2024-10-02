import './index.css'
import { Route, RouterProvider, Routes, createBrowserRouter, redirect } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthorizationPage from './pages/AuthorizationPage';
import WatchlistPage from './pages/WatchlistPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import AdminManageMoviePage from './pages/admin/AdminManageMoviePage';
import AdminEmployeePage from './pages/admin/AdminEmployeePage';


// Make sure user is admin
function getAdmin() {
  // Replace with DB stuff later
  let user = JSON.parse(localStorage.getItem('user'));
  if (user && (user.admin === false && user.admin !== undefined && user.admin !== null)) {
    return redirect("/");
  } else if (user === null || user === undefined) {
    return redirect("/authorization");
  } else {
    return user;
  }
}

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/authorization',
      element: <AuthorizationPage />,
    },
    {
      path: '/watchlist',
      element: <WatchlistPage />,
    },
    {
      path: '/profile',
      element: <ProfilePage />,
    },
    {
      path: '/admin',
      element: <AdminPage />,
      loader: getAdmin,
      children: [
        {
          path: '/admin/movie',
          element: <AdminManageMoviePage />,
          loader: getAdmin,
        },
        {
          path: '/admin/employee',
          element: <AdminEmployeePage />,
          loader: getAdmin,
        }
      ]
    },
  ]);

  return (
    <>
      <div className='w-full h-auto mb-24'>
        <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App
