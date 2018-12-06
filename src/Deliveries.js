import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Deliveries extends Component {

  static propTypes = {
    searchName: PropTypes.string,
    searchDescription: PropTypes.string,
    deliveries: PropTypes.array,
    handlePerformOrder: PropTypes.func,
  }

  render() {

    let rName = new RegExp("(" + this.props.searchName + ")", "gi")
    let rDesc = new RegExp("(" + this.props.searchDescription + ")", "gi")

    return (
      <div className="container">
        <div className="d-flex flex-wrap" >
          {(this.props.deliveries) ? this.props.deliveries.map((e, i) =>
            <div key={i}
              className={"p-2 card mb-3 deliverShop " + ((i % 4 !== 0) ? "addMargin" : "")}
              style={{ maxWidth: 18 + 'rem' }}>
              <div className="card-header bg-primary deliverName">
                {<span
                  dangerouslySetInnerHTML={{
                    __html: (this.props.searchName) ? e.name.replace(rName, "<b>$1</b>") : e.name
                  }} />}
              </div>
              <div className="card-body">
                <p className="card-text bg-transparent">
                  {<span
                    dangerouslySetInnerHTML={{
                      __html: (this.props.searchDescription) ? e.description.replace(rDesc, "<b>$1</b>") : e.description
                    }} />}
                </p>
              </div>
              <div className="card-footer bg-transparent realizarPedido"
                onClick={() => this.props.handlePerformOrder(e.idShop, e.nameEncoded)}>
                Make an order
                            </div>
            </div>
          ) : ""}
        </div>
      </div>
    );
  }
}   