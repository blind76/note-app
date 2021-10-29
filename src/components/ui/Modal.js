import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { fadeInAnimation } from "../../theme/animations/fade";
import { slideInBottomAnimation } from "../../theme/animations/slideBottom";

const Modal = ({ children }) => {
  return (
    <Overlay>
      <PositionModal>
        <StyledModal>{children}</StyledModal>
      </PositionModal>
    </Overlay>
  );
};

Modal.propTypes = {
  /** what will be displayed in modal */
  children: PropTypes.node,
};

const PositionModal = styled.div`
  display: flex;
  align-items: flex-start;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  padding: 60px;
  width: 100%;
  animation: ${slideInBottomAnimation({ animationDuration: "300ms" })};
`;

const StyledModal = styled.div`
  display: block;
  background-color: #ffffff;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  max-width: 800px;
  min-height: 300px;
  max-height: 900px;
  padding: 40px 30px;
`;

const Overlay = styled.div`
  display: block;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  z-index: 5000;
  background: rgba(0, 0, 0, 0.25);
  animation: ${fadeInAnimation({ animationDuration: "400ms" })};
`;

export default Modal;
