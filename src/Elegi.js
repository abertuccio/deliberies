import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Deliveries } from './Deliveries'
import $ from 'jquery';

export class Elegi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchName: "",
      searchDescription: "",
      deliveries: [],
      deliveriesFull: [],
      isDeliveriesLoaded: false,
    }
  }

  static propTypes = {
    handlePerformOrder: PropTypes.func,
  }

  componentDidMount() {
    fetch('/fakeAPI/deliveries.json')
      .then((response) => {
        if (response.status !== 200) {
          $('#exampleModalLong .modal-body').html("Hubo un error en la obtención de los datos")
          $('#exampleModalLong').modal('show')
        }
        return response.json()

      })
      .then((jsonResponse) => {
        setTimeout(() => {
          this.setState({
            deliveries: jsonResponse,
            deliveriesFull: jsonResponse,
            isDeliveriesLoaded: true,
          })
        }, 200)


      })
      .catch((e) => {
        $('#exampleModalLong .modal-body').html("Hubo un error en la obtención de los datos")
        $('#exampleModalLong').modal('show')
      })
  }

  search = (q) => {
    let currName = ((q[1] === "n") ? q[0] : this.state.searchName).toLowerCase();
    let currDescription = ((q[1] === "d") ? q[0] : this.state.searchDescription).toLowerCase();
    let universe = (q[2] ? this.state.deliveries : this.state.deliveriesFull)
    let res = universe.filter(d => {
      let resName = (currName) ? d.name.toLowerCase().includes(currName) : true;
      let resDescription = (currDescription) ? d.description.toLowerCase().includes(currDescription) : true;
      if (resName && resDescription) return true
      else return false
    });
    this.setState({ deliveries: res })
  }

  handleChangeSearchName = (e) => {
    let name = e.target.value.replace(/[^a-zñ0-9 ]/gi, "")
    this.search([name.trim(), "n", (name.includes(this.state.searchName))])
    this.setState({ searchName: name })
  }

  handleChangeSearchDescription = (e) => {
    let description = e.target.value.replace(/[^a-zñ0-9 ]/gi, "").trim()
    this.search([description.trim(), "d", (description.includes(this.state.searchDescription))])
    this.setState({ searchDescription: description })
  }

  render() {
    return (
      <div className="container stageContainer eleji">
        <h5>Filtros:</h5>
        <div className="row formularioBusqueda">
          <div className="col">
            <label htmlFor="nameSearch">Nombre:</label>
            <input
              type="text"
              className="form-control col"
              id="nameSearch"
              placeholder="Nombre:"
              value={this.state.searchName}
              onChange={this.handleChangeSearchName}
            />
          </div>
          <div className="col">
            <label htmlFor="descriptionSearch">Descripción:</label>
            <input
              type="text"
              className="form-control col"
              id="descriptionSearch"
              placeholder="Descripción:"
              value={this.state.searchDescription}
              onChange={this.handleChangeSearchDescription}
            />
          </div>
          <div className="col-6"></div>
        </div>
        <div className="resultadoDeliveries">
          {(this.state.isDeliveriesLoaded) ?
            <Deliveries
              handlePerformOrder={this.props.handlePerformOrder}
              deliveries={this.state.deliveries}
              searchName={this.state.searchName}
              searchDescription={this.state.searchDescription}
            /> : "Cargando..."
          }
        </div>
      </div>
    );
  }
}
