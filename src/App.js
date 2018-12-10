import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Popup from "reactjs-popup";
import { PickStage } from './PickStage'
import { OrderStage } from './OrderStage'
import { PersonalInformation } from './PersonalInformation'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStage: 0,
      selectedDelivery: {},
      order: [],
      totalAmount: 0,
      personalInformation: {
        "firstName": "",
        "lastName": "",
        "address": "",
        "phoneNumber": "",
        "email": ""
      },
      isOrderAvailible: false,
      modalShow: false,
      modalTitle:null,
      modalBody:null,
    }
  }

  openModal =()=>{
    this.setState({ modalShow: true })
  }
  closeModal =()=>{
    this.setState({ modalShow: false })
  }

  checkIfOrderAvailible = (newData) => {
    this.setState({
      isOrderAvailible: !Object.values(newData)
        .some(e => !e) &&
        this.state.order.concat.length > 0
    })
  }

  handleChangeActiveStage = (newStage) => {
    if (!newStage) {
      this.setState({ order: [], totalAmount: 0, })
    }
    this.setState({ activeStage: newStage })
  }

  handleChangePersonalInformation = (e) => {
    let newDatos = JSON.parse(JSON.stringify(this.state.personalInformation))
    newDatos[e.target.name] = e.target.value;
    this.setState({ personalInformation: newDatos })
    this.checkIfOrderAvailible(newDatos)
  }

  modifyTotal = (order) => {
    let totalAmount = (Math.floor(order.reduce((a, c) =>
      a + (c.price * c.quantity)
      , 0) * 100) / 100);
    return totalAmount;
  }

  handleAddItem = (item) => {
    if (this.state.order.length < 11) {
      item.quantity = 1
      item.subTotal = item.price
      if (!this.state.order.some((e) => e.idItem === item.idItem)) {
        let newItem = [...this.state.order, item];
        this.setState({ order: newItem, totalAmount: this.modifyTotal(newItem) })
      }
    } else {
      this.setState({modalBody:"It is not possible to add more than 10 items : )",
                    modalShow:true,
    })  
    }
  }

  changeCurrencyAndDecimalSeparator = (n) => {
    let number = parseFloat(Math.round(n * 100) / 100).toFixed(2);
    return "$" + number.replace(/\./, ",")
  }

  handleRemove = (idItem) => {
    let newOrder = this.state.order.filter(e => e.idItem !== idItem)
    this.setState({ order: newOrder, totalAmount: this.modifyTotal(newOrder) })
  }

  handleChangeQuantity = (e, i) => {
    if (+e.target.value > 0 && /^\d+$/.test(e.target.value)) {
      let newOrder = JSON.parse(JSON.stringify(this.state.order))
      newOrder[i].quantity = +e.target.value;
      newOrder[i].subTotal = Math.floor((+e.target.value * +newOrder[i].price) * 100) / 100
      this.setState({ order: newOrder, totalAmount: this.modifyTotal(newOrder) })
    }
  }

  handlePerformOrder = (selectedDeliveryId, route) => {
    this.handleChangeActiveStage(1)
    this.setState({ selectedDelivery: { "id": selectedDeliveryId, "route": route } })
  }

  handleConfirmOrder = () => {
    this.setState({modalBody:"Data: <pre>" +
    JSON.stringify(this.state.personalInformation) +
    "</pre><br />" +
    "Order: <pre>" + JSON.stringify(this.state.order) + "</pre>" +
    "Total: <pre>" + this.state.totalAmount + "</pre>",
    modalShow:true,
}) 
  }


  render() {

    const possiblesStages = [{
      "menu": "Pick a delivery",
      "module": <PickStage
        handlePerformOrder={this.handlePerformOrder}
      />
    },
    {
      "menu": "Make an order",
      "module": <OrderStage
        selectedDelivery={this.state.selectedDelivery}
        handleChangeActiveStage={this.handleChangeActiveStage}
        changeCurrencyAndDecimalSeparator={this.changeCurrencyAndDecimalSeparator}
        handleAddItem={this.handleAddItem}
        handleRemove={this.handleRemove}
        handleChangeQuantity={this.handleChangeQuantity}
        order={this.state.order}
        totalAmount={this.state.totalAmount}
      />
    },
    {
      "menu": "Fill your data",
      "module": <PersonalInformation
        order={this.state.order}
        totalAmount={this.state.totalAmount}
        personalInformation={this.state.personalInformation}
        isOrderAvailible={this.state.isOrderAvailible}
        changeCurrencyAndDecimalSeparator={this.changeCurrencyAndDecimalSeparator}
        handleChangeActiveStage={this.handleChangeActiveStage}
        handleChangePersonalInformation={this.handleChangePersonalInformation}
        handleConfirmOrder={this.handleConfirmOrder}
      />
    }]

    return (
      <div>
        <Container className="header">
          <Row>
            <Col className="align-self-center titulo">Online Delivery</Col>
            <Col></Col>
            <Col className="btn-toolbar menu" role="toolbar">
              <div className="btn-group btn-group-sm" role="group">

                {possiblesStages.map((s, i) =>
                  <button key={i} type="button"
                    className={"btn btn-secondary botones " +
                      ((+i === this.state.activeStage) ? "active" : "")}
                    onClick={(this.state.activeStage > i) ? () => { this.handleChangeActiveStage(i) } : () => { }}
                  >
                    {(i + 1) + " - " + possiblesStages[i].menu}
                  </button>
                )}

              </div>
            </Col>
          </Row>
          <Row>
          </Row>
        </Container>
        {possiblesStages[this.state.activeStage].module}
        <Popup
          open={this.state.modalShow}
          closeOnDocumentClick
          onClose={this.closeModal}
        >
          <div className="modal2">
            <button className="close" onClick={this.closeModal}>&times;</button>
            {this.state.modalBody}
          </div>
        </Popup>

      </div>
    );
  }
}

export default App;
