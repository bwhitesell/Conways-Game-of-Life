import React from 'react';
import CreateGame from '../components/CreateGame';
import { Navbar } from '../components/Navbar';


const create: React.FC = () => {
  return (
    <div>
      <Navbar />
      <CreateGame nHorizontalCells={30} nVerticalCells={17} />
    </div>
  )
}

export default create 