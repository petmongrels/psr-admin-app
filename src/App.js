import React from 'react';
import './App.css';
import { Button, DatePicker } from 'antd';
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
        <Button type="primary">PRESS ME</Button>
        <DatePicker />
    </div>
  );
}

export default App;
