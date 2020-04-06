import React, { FunctionComponent } from 'react';
import { HashRouter, Redirect, Route } from 'react-router-dom';
import { homeRoute, mainRoute, materialsRoute, recipesRoute, salesRoute, materialsFormRoute } from './constants/routes.constant';
import Home from './pages/Home/Home';
import Materials from './pages/Materials/Materials';
import Recipes from './pages/Recipes/Recipes';
import Sales from './pages/Sales/Sales';
import MaterialsForm from './pages/Materials/MaterialsForm/MaterialsForm';

const Routes: FunctionComponent = () => {
  return (
    <HashRouter>
      <Redirect from={mainRoute} exact to={homeRoute} />
      <Route path={homeRoute} exact component={Home} />
      
      <Route path={materialsRoute} exact component={Materials} />
      <Route path={materialsFormRoute} component={MaterialsForm} />
      
      <Route path={recipesRoute} component={Recipes} />
      <Route path={salesRoute} component={Sales} />
    </HashRouter>
  );
};

export default Routes;
