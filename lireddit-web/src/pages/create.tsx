import React from 'react';
import CreateGame from '../components/CreateGame';
import { Navbar } from '../components/Navbar';
import { redirectLoggedOutUser } from '../utils';


const create: React.FC = () => {
  redirectLoggedOutUser("/");

  return (
    <div>
      <Navbar />
      <CreateGame nHorizontalCells={30} nVerticalCells={17} />
    </div>
  )
}

export default create 