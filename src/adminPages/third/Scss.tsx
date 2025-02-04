import styled from "styled-components";

const CalendarContainer = styled.div`
  .fc .fc-day-sun a {
    color: red;
  }
  .fc .fc-day-sat a {
    color: blue;
  }
  .fc-myButton-button {
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background-color: #1bd130;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: #10741c;
    }
  }
  .fc-event {
    font-size: 0.9rem;
    border-radius: 4px;
    cursor: pointer;
  }
  .fc-h-event {
    padding: 3px;
    margin-bottom: 10px;
  }
`;

const Modal = styled.div<{ show: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  width: 400px;
  padding: 20px;
  z-index: 1000;
  display: ${(props) => (props.show ? "block" : "none")};

  .modal-header {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 10px;
  }
  .modal-date {
    color: gray;
    margin-bottom: 10px;
  }
`;

const ToggleBtn = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  img {
    cursor: pointer;
  }
`;
const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  background-color: #6c757d;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #5a6268;
  }
  &:last-child {
    background-color: #ff8a8a;
    &:hover {
      background-color: #c46a6a;
    }
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const DeletePopUp = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid black;
  border-radius: 10px;
  width: 450px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  z-index: 100;
  background-color: #fff;
`;

export default {
  CalendarContainer,
  Modal,
  ToggleBtn,
  ButtonGroup,
  Button,
  Overlay,
  DeletePopUp,
};
