import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
// import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import { Provider } from 'react-redux';
import store from './store/store';
import Login from './pages/Authentication/Login';
import SignIn from './pages/Authentication/SignIn';
import AddProduct from './pages/Form/AddProductForm';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    // <DefaultLayout>
    <Provider store={store}>
      <Routes>
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | Yakkha Store Admin Dashboard" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <PageTitle title="Signin | Yakkha Store Admin Dashboard" />
              <Login />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | Yakkha Store Admin Dashboard" />
              <SignUp />
            </>
          }
        />

        <Route
          index
          element={
            <>
              <DefaultLayout>
                <PageTitle title="Yakkha Store Admin Dashboard" />
                <ECommerce />
              </DefaultLayout>
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <DefaultLayout>
                <PageTitle title="Calendar | Yakkha Store Admin Dashboard" />
                <Calendar />
              </DefaultLayout>
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <DefaultLayout>
                <PageTitle title="Profile | Yakkha Store Admin Dashboard" />
                <Profile />
              </DefaultLayout>
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <DefaultLayout>
                <PageTitle title="Form Elements | Yakkha Store Admin Dashboard" />
                <AddProduct />
              </DefaultLayout>
            </>
          }
        />
        {/* <Route
          path="/forms/form-elements"
          element={
            <>
              <DefaultLayout>
                <PageTitle title="Form Elements | Yakkha Store Admin Dashboard" />
                <FormElements />
              </DefaultLayout>
            </>
          }
        /> */}
        <Route
          path="/forms/form-layout"
          element={
            <>
              <DefaultLayout>
                <PageTitle title="Form Layout | Yakkha Store Admin Dashboard" />
                <FormLayout />
              </DefaultLayout>
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <DefaultLayout>
                <PageTitle title="Tables | Yakkha Store Admin Dashboard" />
                <Tables />
              </DefaultLayout>
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <DefaultLayout>
                <PageTitle title="Settings | Yakkha Store Admin Dashboard" />
                <Settings />
              </DefaultLayout>
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <DefaultLayout>
                <PageTitle title="Basic Chart | Yakkha Store Admin Dashboard" />
                <Chart />
              </DefaultLayout>
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <DefaultLayout>
                <PageTitle title="Alerts | Yakkha Store Admin Dashboard" />
                <Alerts />
              </DefaultLayout>
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <DefaultLayout>
                <PageTitle title="Buttons | Yakkha Store Admin Dashboard" />
                <Buttons />
              </DefaultLayout>
            </>
          }
        />
      </Routes>
    </Provider>
    // </DefaultLayout>
  );
}

export default App;
