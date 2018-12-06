import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaArrowCircleLeft } from 'react-icons/fa'

export class Order extends Component {

  static propTypes = {
    order: PropTypes.array,
    editable: PropTypes.bool,
    handleRemove: PropTypes.func,
    handleChangeQuantity: PropTypes.func,
    changeCurrencyAndDecimalSeparator: PropTypes.func,
    totalAmount: PropTypes.number,
  }

  render() {

    return (
      <table className="table table-striped" id="mealOrder">
        <thead>
          <tr>
            <th style={{ width: '50%' }}>Product</th>
            <th style={{ width: '10%' }}>Amount</th>
            <th style={{ width: '20%' }}>Price</th>
            <th style={{ width: '20%' }}>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {this.props.order.map((e, i) =>
            <tr key={i}>
              <td>
                {(this.props.editable) ? <FaArrowCircleLeft
                  className="removeItem"
                  onClick={() => this.props.handleRemove(e.idItem)}
                /> : ""}
                <span className="menuItemDetail">{e.name}</span>
              </td>
              <td>
                {(this.props.editable) ? <input
                  className="form-control form-control-sm quantity"
                  value={this.props.order[i].quantity}
                  onChange={(e) => this.props.handleChangeQuantity(e, i)}
                  type="text"
                /> : this.props.order[i].quantity}
              </td>
              <td>{this.props.changeCurrencyAndDecimalSeparator(e.price)}</td>
              <td>{this.props.changeCurrencyAndDecimalSeparator(e.subTotal)}</td>
            </tr>
          )}
          <tr className="total">
            <td colSpan="3"></td>
            <td>{this.props.changeCurrencyAndDecimalSeparator(this.props.totalAmount)}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}
