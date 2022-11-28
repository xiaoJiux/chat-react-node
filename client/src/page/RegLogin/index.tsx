import React from 'react';
import {Outlet} from "react-router-dom";
import './index.less'

const RegLog = () => {
  return (
    <div className="RegLog">
      <div className="child">
        <Outlet/>
      </div>
    </div>
  );
};

export default RegLog;
