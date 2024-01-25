import './homePageStyleSheet.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import HeaderBar from '../general-components/HeaderBar/HeaderBar.js';


function HomePage(props) {
  return (
    <>
      <HeaderBar></HeaderBar>
    </>
  );
}


export default HomePage
