import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
// import 'bootstrap/dist/js/bootstrap.min.js';

import { Order } from './Order'
import { FaArrowCircleRight, FaSearchPlus } from 'react-icons/fa'

export class OrderStage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeGroup: 0,
      groups: [],
      items: [],
      isDeliveryLoaded: false,
    }
  }

  static propTypes = {
    selectedDelivery: PropTypes.object,
    handleChangeActiveStage: PropTypes.func,
    changeCurrencyAndDecimalSeparator: PropTypes.func,
    handleRemove: PropTypes.func,
    handleAddItem: PropTypes.func,
    totalAmount: PropTypes.number,
    handleChangeQuantity: PropTypes.func,
  }

  componentDidMount() {
    fetch('/fakeAPI/shops/' + this.props.selectedDelivery.route + '.json')
      .then((response) => {
        if (response.status !== 200) {
          $('#exampleModalLong .modal-body').html(`Hubo un error en 
                          la obtención de los datos 
                          de <b>${this.props.selectedDelivery.route}</b>`)
          $('#exampleModalLong').modal('show')
        }
        return response.json()
      })
      .then((jsonResponse) => {
        let prevGroups = [];
        let prevItems = [];
        jsonResponse.forEach(g => {
          prevGroups.push(g.group);
          prevItems.push(g.items)
        })
        setTimeout(() => {
          this.setState({ groups: prevGroups, items: prevItems, isDeliveryLoaded: true })
        }, 200)
      }).catch((e) => {
        this.props.handleChangeActiveStage(0)
        $('#exampleModalLong .modal-body').html(`Hubo un error en 
                            la obtención de los datos 
                            de <b>${this.props.selectedDelivery.route}</b>`)
        $('#exampleModalLong').modal('show');
      })

    // $("body").tooltip({
    //   selector: '[data-toggle="tooltip"]'
    // });

  }

  handleSelectGroup = (activeGroup) => {
    this.setState({ activeGroup: activeGroup })
  }

  render() {

    return (
      <div className="container stageContainer pedidos">
        <h5>Make your order!</h5>
        <div className="row">
          <div className="col-6">
            {(this.state.isDeliveryLoaded) ?
              <div className="row">
                <div className="col-3" id="orderGroups">
                  <div className="nav flex-column nav-tabs" id="orderGroup">
                    {this.state.groups.map((e, i) =>
                      <button key={i}
                        className={"nav-link orderItem " + ((i === this.state.activeGroup) ? "active" : "")}
                        onClick={() => this.handleSelectGroup(i)} >
                        {e}
                      </button>
                    )}
                  </div>
                </div>
                <div className="col-9">
                  <div className="tab-content">
                    {this.state.groups.map((e, i) =>
                      <div key={i} className={"tab-pane fade show " + ((this.state.activeGroup === i) ? "active" : "")}>
                        <table className="table table-striped" id="mealMenu">
                          <tbody>
                            {this.state.items[i].map((it, ix) =>
                              (!isNaN(it.price)) ?
                                <tr key={ix}>
                                  <td style={{ width: '70%' }}  >{it.name}</td>
                                  <td style={{ width: '20%' }}  >{this.props.changeCurrencyAndDecimalSeparator(it.price)}</td>
                                  <td style={{ width: '10%' }} className="text-justify">
                                    <span
                                      tabIndex="0"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title={(it.description) ? it.description : it.name}
                                    ><FaSearchPlus
                                        className="itemDetail"
                                      /></span>
                                    <FaArrowCircleRight className="addProductButton" onClick={() => this.props.handleAddItem(it)} />
                                  </td>
                                </tr> : ""
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              : "Cargando..."}
          </div>
          <div className="col-6">
            <Order
              editable={true}
              order={this.props.order}
              changeCurrencyAndDecimalSeparator={this.props.changeCurrencyAndDecimalSeparator}
              handleRemove={this.props.handleRemove}
              handleChangeQuantity={this.props.handleChangeQuantity}
              totalAmount={this.props.totalAmount}
            />
            <div className="row buttonsOrder">
              <div className="col-8">
              </div>
              <div className="col-4">
                <button onClick={() => this.props.handleChangeActiveStage(0)} type="button" className="btn btn-secondary btn-sm back">Back</button>
                <button onClick={(!this.props.order.length) ? () => { } : () => this.props.handleChangeActiveStage(2)}
                  type="button"
                  className={"btn btn-secondary btn-sm forward " + ((!this.props.order.length) ? "disabled" : "")} >Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
