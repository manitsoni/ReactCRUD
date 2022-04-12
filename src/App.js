import "./App.css";
import SetHeader from './header/header'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GetInfo from "./get-data/getData";
import HoooksDemo from "./hooksDemo";
import AddUser from "./add-data";
import { createContext } from "react";
const Firstname = createContext();

function Card(props) {
  return (
    <input type={props.type} value={props.value} />
  );
}
function App() {
  return (
    <>
      <Firstname.Provider value={"manit"}>
        <SetHeader />
      </Firstname.Provider>
    </>
  );
}
export default App;
export { Firstname }