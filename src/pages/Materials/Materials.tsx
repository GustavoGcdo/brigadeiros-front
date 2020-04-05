import Fab from '@material-ui/core/Fab';
import { Add } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../components/layouts/MainLayout';
import Pagination from '../../components/pagination/Pagination';
import { materialsFormRoute } from '../../constants/routes.constant';
import { Format } from '../../helpers/Format';
import { Material } from '../../models/entities/Material';
import { ResultPaginate } from '../../models/types/paginate.types';
import { MaterialsService } from '../../services/materials.service';
import './Materials.scss';

let isActive = true;
const Materials = () => {
  const [resultPaginate, setResultPaginate] = useState<ResultPaginate<Material>>();
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    loadMaterials();
    return () => {
      isActive = false;
    };
  }, []);

  const loadMaterials = (page?: number) => {
    MaterialsService.paginate({ page })
      .then((result) => {
        if (isActive) {
          setResultPaginate(result.data);
        }
      })
      .catch((err) => {
        console.log('deu ruim', err);
      });
  };

  const handleChangePage = (page: number) => {
    setActivePage(page);
    loadMaterials(page);
  };

  return (
    <MainLayout>
      <header className="page-header-container">
        <div className="page-header">
          <span className="title">Listar</span>
          <span className="subtitle">Ingredientes e materiais</span>
        </div>
      </header>

      {/* <div className="search">
        
        <TextField
          label="Pesquisar"
          className="search-input"
          id="search-input"
          placeholder=""
          margin="dense"
          variant="outlined"
          InputProps={{
            endAdornment: <Search />,
          }}
        />
      </div> */}

      <Link to={materialsFormRoute}>
        <Fab className="add-button" color="primary" aria-label="add">
          <Add />
        </Fab>
      </Link>

      <div className="list">
        {resultPaginate?.list.map((material, index) => (
          <div key={index} className="row">
            <div className="content">
              <span className="title">{material.name}</span>
              <span className="secondary-text">
                Quantidade: {Format.treatData(material.quantity)}
              </span>
              <span className="secondary-text">
                Comprado dia: {Format.stringDate(material.purchaseDate)}
              </span>
            </div>
            <div className="actions">{/* <button>Editar</button> */}</div>
          </div>
        ))}
      </div>

      <Pagination
        totalItems={resultPaginate?.total}
        page={activePage}
        onChangePage={handleChangePage}
      />
    </MainLayout>
  );
};

export default Materials;
