import React from 'react';
import './App.css';
import { Button, DatePicker } from 'antd';
import 'antd/dist/antd.css';
import {serviceList} from "./service/ServiceList";

function App() {
  return serviceList();
}

export default App;
