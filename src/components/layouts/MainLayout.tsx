import withWidth, { isWidthDown, WithWidth } from '@material-ui/core/withWidth';
import React, { FunctionComponent } from 'react';
import MobileMenu from '../mobile-menu/MobileMenu';
import Navbar from '../navbar/Navbar';
import './MainLayout.scss';

const MainLayout: FunctionComponent<WithWidth> = ({ width, children }) => {
  return (
    <div className="app">
      <header className="app-navbar">
        <Navbar />

        <div className="app-menu">{isWidthDown('sm', width) && <MobileMenu />}</div>
      </header>
      <main className="app-content">{children}</main>
    </div>
  );
};

export default withWidth()(MainLayout);
