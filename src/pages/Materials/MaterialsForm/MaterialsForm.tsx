import { Checkbox, IconButton, Snackbar } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Form, FormHandles } from '@unform/core';
import React, { useRef, useState } from 'react';
import DatePickerForm from '../../../components/formComponents/DatePickerForm';
import InputForm from '../../../components/formComponents/InputForm';
import SelectForm from '../../../components/formComponents/SelectForm';
import MainLayout from '../../../components/layouts/MainLayout';
import InputMaskForm from '../../../components/formComponents/InputMaskForm';
import { ArrowBack } from '@material-ui/icons';
import { RouteComponentProps } from 'react-router-dom';
import { MaterialsService } from '../../../services/materials.service';
import { Material } from '../../../models/entities/Material';
import ErrorMessage from '../../../components/errorMessage/ErrorMessage';
import { ErrorHandler } from '../../../infra/errorHandler';
import { materialsRoute } from '../../../constants/routes.constant';

const errorMessageOnSave = 'Erro ao tentar salvar';

const MaterialsForm: React.FC<RouteComponentProps> = ({ history }) => {
  const formRef = useRef<FormHandles>(null);
  const [specifyWeightOrVolume, setSpecifyWeightOrVolume] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const [messageSnackBar, setMessageSnackBar] = useState('');
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const goBack = () => {
    history.goBack();
  };

  const handleSubmit = () => {
    setErrorMessages([]);
    const formData = formRef.current?.getData();
    const newMaterial = formData as Material;

    MaterialsService.save(newMaterial)
      .then((result) => {
        console.log(result);
        history.push(materialsRoute);
      })
      .catch((resultError) => {
        console.log(resultError);
        setMessageSnackBar(errorMessageOnSave);
        setOpenSnackBar(true);

        const errors = resultError.errors;

        const errorMessagesServer = ErrorHandler.getErrorMessagesByName(
          errors,
          'file',
          'capacities',
        );
        setErrorMessages(errorMessagesServer);

        const fieldErrors = ErrorHandler.getFieldErrors(errors);
        formRef.current?.setErrors(fieldErrors);
      });
  };

  const handleChangeSpecifyWeightOrVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setSpecifyWeightOrVolume(checked);
  };

  const handleCloseSnackBar = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    setOpenSnackBar(false);
  };

  return (
    <MainLayout>
      <header className="page-header-container">
        <IconButton onClick={goBack}>
          <ArrowBack className="btn-back" />
        </IconButton>
        <div className="page-header">
          <span className="title">Adicionar</span>
          <span className="subtitle">Materiais e ingredientes</span>
        </div>
      </header>

      <Paper variant="outlined">
        <div className="content-form">
          <Form ref={formRef} onSubmit={handleSubmit}>
            <div className="section-form dashed">
              <div className="header-section">
                <span className="title-section">Informações</span>
              </div>
              <div className="row-form collumns-2">
                <InputForm name="name" label="Nome" variant="outlined" />
                <InputForm
                  name="quantityOfProducts"
                  type="number"
                  label="Quantos você comprou?"
                  variant="outlined"
                />

                <InputMaskForm name="price" label="Quanto custou cada?" typeMask="currency" />

                <DatePickerForm name="purchaseDate" label="Data de compra" />
              </div>
            </div>

            <div className="section-form dashed">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={specifyWeightOrVolume}
                    onChange={handleChangeSpecifyWeightOrVolume}
                  />
                }
                label="Especificar unidade de medida"
              />
            </div>

            {specifyWeightOrVolume && (
              <div className="section-form dashed">
                <div className="header-section">
                  <span className="title-section">Detalhes</span>
                </div>
                <div className="row-form collumns-2">
                  <SelectForm
                    name="unitOfMeasurement"
                    label="Unidade de medida"
                    variant="outlined"
                    options={[
                      { label: 'Gramas', value: 'g' },
                      { label: 'Mililitros', value: 'ml' },
                      { label: 'Litros', value: 'l' },
                      { label: 'Unidades', value: 'unit' },
                    ]}
                  />

                  <InputForm name="quantity" type="number" label="Quantidade" variant="outlined" />
                </div>
              </div>
            )}

            <div className="form-actions">
              <Button onClick={handleSubmit} variant="contained" color="primary">
                Salvar
              </Button>
            </div>

            {errorMessages.map((error: string, index) => (
              <ErrorMessage key={index} message={error} />
            ))}
          </Form>
        </div>
      </Paper>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
        message={messageSnackBar}
      />
    </MainLayout>
  );
};

export default MaterialsForm;
