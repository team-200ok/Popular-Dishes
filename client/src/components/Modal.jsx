import React from "react";
import styled from "styled-components";
import PhotoSlide from "./PhotoSlide.jsx";

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIdx: 0
    };
    this.totalPhotoCount = Math.floor(
      Math.random(this.props.photos.length / 2) * 100
    );
    this.PhotoSliderRef = React.createRef();
  }

  prevSlideButton() {
    const currentIdx = this.state.currentIdx;
    if (currentIdx >= 1) {
      this.setState({
        currentIdx: currentIdx - 1
      });
    }
    console.log({ currentIdx });
  }

  nextSlideButton() {
    const currentIdx = this.state.currentIdx;
    if (currentIdx < this.totalPhotoCount - 1) {
      this.setState({
        currentIdx: currentIdx + 1
      });
    }
  }

  render() {
    return (
      <StyledModalWrapper className="modal">
        <StyledInnerModal className="modalInner">
          <ModalButton
            className="prev-slide-button"
            onClick={this.prevSlideButton.bind(this)}
          >
            &#x3c;
          </ModalButton>
          <PhotoSlide
            image={this.props.photos[this.state.currentIdx]}
            currentIdx={this.state.currentIdx}
            totalPhotoCount={this.totalPhotoCount}
          />
          <ModalButton
            className="next-slide-button"
            onClick={this.nextSlideButton.bind(this)}
          >
            &#x3e;
          </ModalButton>
          <StyledReviewDIV>
            <img
              style={{ width: "80%" }}
              src="https://food-photos-yelp.s3-us-west-1.amazonaws.com/Screen+Shot+2019-12-15+at+3.19.45+PM.png"
            ></img>
          </StyledReviewDIV>
        </StyledInnerModal>
        <StyledExitButton onClick={this.props.closePopup}>
          <h3>Close X</h3>
        </StyledExitButton>
      </StyledModalWrapper>
    );
  }
}

const StyledModalWrapper = styled.div`
  position: fixed;
  width: 100vm;
  height: 100vm;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10000;
`;
const StyledInnerModal = styled.div`
  display: flex;
  height: 80vh;
  width: 80vw;
  margin: auto;
  flex-direction: row;
  justify-content: space-between;
  background-color: black;
  border-radius: 10px;
  z-index: 10000;
`;

const StyledReviewDIV = styled.div`
  overflow: auto;
  width: 30%;
  background-color: white;
  z-index: 10000;
`;

// button styling
const ModalButton = styled.button`
  height: 35px;
  width: 35px;
  color: white;
  margin: auto;
  border: 0px;
  background-color: black;
  font-size: 35px;
  transform: scale(0.5, 1);
`;

const StyledExitButton = styled.button`
  position: absolute;
  background-color: Transparent;
  right: 10%;
  top: 5%;
  border: none;
  cursor: pointer;
  overflow: hidden;
  color: white;
  font-family: Helvetica Neue;
`;
export default Modal;
