import './homePageStyleSheet.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import HeaderBar from './components/HeaderBar/HeaderBar.js';


function HomePage(props) {

  const navigate = useNavigate();
  const { state } = useLocation();
  var loggedIn = false;

  useEffect(() => {
    Axios.get('http://localhost:3001/loggedIn', {}).then(res => {
      console.log(res);
      if (res.data == null) {
        navigate("/login");
      }
      else {
        getDetails(parseInt(res.data));
      }
    });
  })

  const getDetails = (userID) => {
    Axios.post('http://localhost:3001/home', {
      information: "User Details",
      UserID: userID
    }).then(res => setName("Welcome " + res.data.firstName + "!")).catch(error => console.log(error));
  }

  const logout = () => {
    Axios.get('http://localhost:3001/logout', {}).then(res => { navigate("/login"); });
  }

  const [fullName, setName] = useState("null");

  return (
    <>
      <HeaderBar name={fullName}></HeaderBar>
    </>
  );
}


export default HomePage
