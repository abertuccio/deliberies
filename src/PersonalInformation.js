import React, { Component } from 'react';
import { Container, Row, Col} from 'reactstrap';
import PropTypes from 'prop-types';

import { Order } from './Order'

export class PersonalInformation extends Component {

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
      <Container className="stageContainer datos">
        <h5>Fill your data!</h5>
        <Row>
          <Col xs="6">

            <div className="deliverOrderForm">
              <div className="form-group row">
                <label htmlFor="nombre" className="col-sm-2 col-form-label">First Name</label>
                <div className="col-sm-10">
                  <input
                    value={this.props.personalInformation.nombre}
                    onChange={this.props.handleChangePersonalInformation}
                    type="text"
                    name="firstName"
                    className="form-control form-control-sm"
                    id="nombre"
                    placeholder="First Name" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="apellido" className="col-sm-2 col-form-label">Last Name</label>
                <div className="col-sm-10">
                  <input
                    value={this.props.personalInformation.apellido}
                    onChange={this.props.handleChangePersonalInformation}
                    type="text"
                    name="lastName"
                    className="form-control form-control-sm"
                    id="apellido"
                    placeholder="Last Name" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="direccion" className="col-sm-2 col-form-label">Address</label>
                <div className="col-sm-10">
                  <input
                    value={this.props.personalInformation.direccion}
                    onChange={this.props.handleChangePersonalInformation}
                    type="text"
                    name="address"
                    className="form-control form-control-sm"
                    id="direccion"
                    placeholder="Address" />
                </div>
              </div>
              <Row className="form-group">
                <label htmlFor="telefono" className="col-sm-2 col-form-label">Phone Number</label>
                <Col xs="10">
                  <input
                    value={this.props.personalInformation.telefono}
                    onChange={this.props.handleChangePersonalInformation}
                    type="text"
                    name="phoneNumber"
                    className="form-control form-control-sm"
                    id="telefono"
                    placeholder="Phone Number" />
                </Col>
              </Row>
              <Row className="form-group">
                <label htmlFor="email" className="col-sm-2 col-form-label">E-mail</label>
                <Col xs="10">
                  <input
                    value={this.props.personalInformation.email}
                    onChange={this.props.handleChangePersonalInformation}
                    type="text"
                    name="email"
                    className="form-control form-control-sm"
                    id="email"
                    placeholder="E-mail " />
                </Col>
              </Row>
            </div>

          </Col>
          <Col xs="6">
            <Order
              editable={false}
              order={this.props.order}
              changeCurrencyAndDecimalSeparator={this.props.changeCurrencyAndDecimalSeparator}
              totalAmount={this.props.totalAmount}
            />
            <Row className="buttonsOrder">
              <Col xs="7">
              </Col>
              <Col xs="5">
                <button onClick={() => this.props.handleChangeActiveStage(1)} type="button" className="btn btn-secondary btn-sm back">Atrás</button>
                <button onClick={(this.props.isOrderAvailible) ? this.props.handleConfirmOrder : () => { }}
                  type="button"
                  className={"btn btn-secondary btn-sm forward " + ((this.props.isOrderAvailible) ? "" : "disabled")}
                >
                  Make the order
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
