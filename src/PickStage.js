import React, { Component } from 'react';
import { Container, Row, Col} from 'reactstrap';
import PropTypes from 'prop-types';
import { Deliveries } from './Deliveries'
import Popup from "reactjs-popup";

export class PickStage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchName: "",
      searchDescription: "",
      deliveries: [],
      deliveriesFull: [],
      isDeliveriesLoaded: false,
      modalShow: false,
      modalTitle: null,
      modalBody: null,
    }
  }

  static propTypes = {
    handlePerformOrder: PropTypes.func,
  }

  componentDidMount() {
    fetch('/fakeAPI/deliveries.json')
      .then((response) => {
        if (response.status !== 200) {
          this.setState({
            modalBody: "Hubo un error en la obtención de los datos",
            modalShow: true,
          })
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
        this.setState({
          modalBody: "Hubo un error en la obtención de los datos",
          modalShow: true,
        })
      })
  }

  openModal = () => {
    this.setState({ modalShow: true })
  }
  closeModal = () => {
    this.setState({ modalShow: false })
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
      <Container className="stageContainer eleji">
        <h5>Filters:</h5>
        <Row className="formularioBusqueda">
          <Col>
            <label htmlFor="nameSearch">Name:</label>
            <input
              type="text"
              className="form-control col"
              id="nameSearch"
              placeholder="Name:"
              value={this.state.searchName}
              onChange={this.handleChangeSearchName}
            />
          </Col>
          <Col>
            <label htmlFor="descriptionSearch">Description:</label>
            <input
              type="text"
              className="form-control col"
              id="descriptionSearch"
              placeholder="Description:"
              value={this.state.searchDescription}
              onChange={this.handleChangeSearchDescription}
            />
          </Col>
          <Col xs="6"></Col>
        </Row>
        <div className="resultadoDeliveries">
          {(this.state.isDeliveriesLoaded) ?
            <Deliveries
              handlePerformOrder={this.props.handlePerformOrder}
              deliveries={this.state.deliveries}
              searchName={this.state.searchName}
              searchDescription={this.state.searchDescription}
            /> : "Loading..."
          }
        </div>
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
      </Container>
    );
  }
}
