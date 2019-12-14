import React from "react";
import TopDishes from "./TopDishes.jsx";
import TopDishesMobile from "./TopDishesMobile.jsx";
import Modal from "./Modal.jsx";
import styled from "styled-components";
import axios from "axios";
import { Responsive } from "responsive-react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: [],
      photos: [],
      showModal: false
    };
  }

  componentDidMount() {
    axios
      .get("/api/popular-dishes/3")
      .then(response => this.setState({ dishes: response.data }))
      .then(
        axios
          .get("/api/photos/3")
          .then(response => this.setState({ photos: response.data }))
      );
  }

  showModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  render() {
    return (
      <>
        <Responsive displayIn={["laptop"]}>
          <PopularDishesWrapper>
            <h4>Popular Dishes</h4>
            <TopDishes
              dishes={this.state.dishes}
              photos={this.state.photos}
              showModal={this.showModal.bind(this)}
            />

            {this.state.showModal ? (
              <Modal
                photos={this.state.photos}
                text="This feature is coming out soon..."
                closePopup={this.showModal.bind(this)}
              />
            ) : null}
          </PopularDishesWrapper>
        </Responsive>
        <Responsive displayIn={["Mobile", "Tablet"]}>
          <TopDishesMobile
            dishes={this.state.dishes}
            photos={this.state.photos}
            showModal={this.showModal.bind(this)}
          />
        </Responsive>
      </>
    );
  }
}

export default App;

const PopularDishesWrapper = styled.div`
  font-family: Helvetica Neue;
`;
