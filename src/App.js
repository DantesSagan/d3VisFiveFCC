import { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as ROUTES from './Component/routes/routes';

import Loader from './Component/fallback/loader';
import Header from './Component/header';

import './App.css';

const Main = lazy(() => import('./main'));
const KickStarterMap = lazy(() => import('./Component/KickStarterMap'));
const MovieSalesMap = lazy(() => import('./Component/MovieSalesMap'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Header />
        <Switch>
          <Route exact path='/' component={Main} />
          <Route path={ROUTES.KickStarterMap} component={KickStarterMap} />
          <Route path={ROUTES.TreemapMovieSales} component={MovieSalesMap} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}
