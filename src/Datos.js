import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Order } from './Order'

export class Datos extends Component {

  static propTypes = {
    personalInformation: PropTypes.object,
    order: PropTypes.array,
    totalAmount: PropTypes.number,
    isOrderAvailible: PropTypes.bool,
    handleChangeDatos: PropTypes.func,
    changeCurrencyAndDecimalSeparator: PropTypes.func,
    handleConfirmOrder: PropTypes.func,
    handleChangeActiveStage: PropTypes.func,
  }


  render() {

    return (
      <div className="container stageContainer datos">
        <h5>Completá tus datos!</h5>
        <div className="row">
          <div className="col-6">

            <div className="deliverOrderForm">
              <div className="form-group row">
                <label htmlFor="nombre" className="col-sm-2 col-form-label">Nombre</label>
                <div className="col-sm-10">
                  <input value={this.props.personalInformation.nombre} onChange={this.props.handleChangePersonalInformation} type="text" name="nombre" className="form-control form-control-sm" id="nombre" placeholder="Nombre" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="apellido" className="col-sm-2 col-form-label">Apellido</label>
                <div className="col-sm-10">
                  <input value={this.props.personalInformation.apellido} onChange={this.props.handleChangePersonalInformation} type="text" name="apellido" className="form-control form-control-sm" id="apellido" placeholder="Apellido" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="direccion" className="col-sm-2 col-form-label">Dirección</label>
                <div className="col-sm-10">
                  <input value={this.props.personalInformation.direccion} onChange={this.props.handleChangePersonalInformation} type="text" name="direccion" className="form-control form-control-sm" id="direccion" placeholder="Dirección" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="telefono" className="col-sm-2 col-form-label">Teléfono</label>
                <div className="col-sm-10">
                  <input value={this.props.personalInformation.telefono} onChange={this.props.handleChangePersonalInformation} type="text" name="telefono" className="form-control form-control-sm" id="telefono" placeholder="Teléfono" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                  <input value={this.props.personalInformation.email} onChange={this.props.handleChangePersonalInformation} type="text" name="email" className="form-control form-control-sm" id="email" placeholder="Email " />
                </div>
              </div>
            </div>

          </div>
          <div className="col-6">
            <Order
              editable={false}
              order={this.props.order}
              changeCurrencyAndDecimalSeparator={this.props.changeCurrencyAndDecimalSeparator}
              totalAmount={this.props.totalAmount}
            />
            <div className="row buttonsOrder">
              <div className="col-7">
              </div>
              <div className="col-5 ">
                <button onClick={() => this.props.handleChangeActiveStage(1)} type="button" className="btn btn-secondary btn-sm back">Atrás</button>


                <button onClick={(this.props.isOrderAvailible) ? this.props.handleConfirmOrder : () => { }}
                  type="button"
                  className={"btn btn-secondary btn-sm forward " + ((this.props.isOrderAvailible) ? "" : "disabled")}
                >
                  Realizar Pedido
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
