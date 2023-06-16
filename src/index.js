import { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Layout from './components/Layout/Layout';
import Spinner from './components/Spinner/Spinner';
import { Routes, Route } from 'react-router-dom';
import { getToken } from './service/token';
import { fetchMe } from './redux/user/userSlice';
import './styles/globals.scss';

const Home = lazy(() => import('./pages/Home/Home'));
const Auth = lazy(() => import('./pages/Auth/Auth'));
const Report = lazy(() => import('./pages/Report/Report'));
const Reports = lazy(() => import('./pages/Reports/Reports'));
const Details = lazy(() => import('./pages/Details/Details'));
const Officers = lazy(() => import('./pages/Officers/Officers'));
const OfficersForm = lazy(() => import('./pages/OfficersForm/OfficersForm'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

const root = ReactDOM.createRoot(document.getElementById('root'));

if (getToken()) store.dispatch(fetchMe());

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {[
            { path: '/', component: Home },
            { path: '/registration', component: Auth, type: 'registration' },
            { path: '/login', component: Auth, type: 'login' },
            { path: '/report', component: Report },
            { path: '/reports', component: Reports },
            { path: '/reports/:id', component: Details, type: 'reports' },
            { path: '/reports/edit/:id', component: Report },
            { path: '/officers', component: Officers },
            { path: '/officers/:id', component: Details, type: 'officers' },
            { path: '/officers/create', component: OfficersForm },
            { path: '/officers/edit/:id', component: OfficersForm },
            { path: '*', component: NotFound },
          ].map(({ path, component: Component, type }) => (
            <Route
              key={path}
              path={path}
              element={
                <Suspense fallback={<Spinner />}>
                  <Component type={type} />
                </Suspense>
              }
            />
          ))}
        </Route>
      </Routes>
    </Provider>
  </BrowserRouter>,
);
