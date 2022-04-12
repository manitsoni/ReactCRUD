import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import "../header/header.css"
import {
  BrowserRouter, Routes,
  Route,
  NavLink
} from "react-router-dom";
import HoooksDemo from '../hooksDemo';
import AddUser from '../add-data';
import GetInfo from '../get-data/getData';
import Parent from '../ParentChildDemo/parent';
import ManageState from '../state/ManageState';
import DataGridDemo from '../get-data/dataGrid';
import InputCountry from '../CountryWeather/InputCountry';
import CountryList from '../CountryWeather/CountryList';
class myClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = { attribute: "NEw" }
  }
}
function SetHeader(props) {
  return (

    <BrowserRouter>
      <div>
        <ul class="ul">
          <li class="li">
            <NavLink to="/" exact activeClassName="active">Home</NavLink>
          </li>
          <li class="li">
            <NavLink to="/add" exact activeClassName="active">Add user</NavLink>
          </li>

          <li class="li">
            <NavLink to="/time" exact activeClassName="active">Time</NavLink>
          </li>
          <li class="li">
            <NavLink to="/pc" exact activeClassName="active">Parent child</NavLink>
          </li>
          <li class="li">
            <NavLink to="/state" exact activeClassName="active">State</NavLink>
          </li>
          <li class="li">
            <NavLink to="/grid" exact activeClassName="active">Data grid</NavLink>
          </li>
          <li class="li">
            <NavLink to="/capp" exact activeClassName="active">Country weather</NavLink>
          </li>
        </ul>
      </div>
      <Routes>
        <Route path="/" >
          <Route index element={<GetInfo />} />
          <Route path="/add" element={<AddUser />} />
          <Route path="/time" element={<HoooksDemo />} />
          <Route path="/pc" element={<Parent />} />
          <Route path="/edit/:mode/:uid" element={<AddUser />} />
          <Route path="/state" element={<ManageState name="manit" number="123" />} />
          <Route path="/grid" element={<DataGridDemo />} />
          <Route path="/capp" element={<InputCountry />} />
          <Route path="/search/:name" element={<CountryList />} />
          <Route path="*" element={<GetInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default SetHeader
