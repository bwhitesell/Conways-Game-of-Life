import React from 'react'
import Board from '../components/Board'


const board: React.FC = () => {
  return (
    <Board nHorizontalCells={25} nVerticalCells={10} />
  )
}

export default board