import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { AddBox, Home, LibraryBooks, Settings } from '@material-ui/icons';
import React, { FunctionComponent, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {
  homeRoute,
  materialsRoute,
  recipesRoute,
  salesRoute,
} from '../../constants/routes.constant';
import './MobileMenu.scss';

const MobileMenu: FunctionComponent<RouteComponentProps> = ({ history, location }) => {
  const [value, setValue] = useState(location.pathname);
  const [isActiveManageMenu, setIsActiveManageMenu] = useState(false);

  function getClassMenuItem(route: string) {
    const isActiveRoute = isActive(route);
    if (isActiveRoute) {
      return `menu-item active`;
    }
    return `menu-item`;
  }

  function isActive(route: string) {
    const activeRoute = location.pathname;
    return activeRoute.includes(route);
  }

  const onClickMenuItem = (route: string) => {
    setIsActiveManageMenu(false);
    history.push(route);
  };

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    if (newValue === 'manage') {
      setIsActiveManageMenu(true);
    } else {
      setIsActiveManageMenu(false);
      history.push(newValue);
    }

    setValue(newValue);
  };

  return (
    <div>
      <div className={`container-menu-mobile ${isActiveManageMenu && 'on'}`}>
        <div className="menu-header">
          <span className="menu-title">Gerenciar</span>
        </div>

        <ul className="menu-mobile">
          <li
            className={getClassMenuItem(materialsRoute)}
            onClick={() => onClickMenuItem(materialsRoute)}
          >
            Ingredientes e materiais
          </li>
          {/* <li className="menu-item">Receitas</li>
          <li className="menu-item">Vendas</li>
          <li className="menu-item">Caixa</li>
          <li className="menu-item">Unidades de medida</li>
          <li className="menu-item">Tipo de produto</li>
          <li className="menu-item">Tipo de pagamento</li> */}
        </ul>
      </div>

      <BottomNavigation showLabels value={value} onChange={handleChange}>
        <BottomNavigationAction label="Inicio" value={homeRoute} icon={<Home />} />
        <BottomNavigationAction label="Receitas" value={recipesRoute} icon={<LibraryBooks />} />
        <BottomNavigationAction label="Vendas" value={salesRoute} icon={<AddBox />} />

        <BottomNavigationAction label="Gerenciar" value="manage" icon={<Settings />} />
      </BottomNavigation>
    </div>
  );
};

export default withRouter(MobileMenu);
