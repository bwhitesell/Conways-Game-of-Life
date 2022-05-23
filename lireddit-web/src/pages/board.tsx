import React from 'react'
import Board from '../components/Board'


const board: React.FC = () => {
  return (
    <Board nHorizontalCells={40} nVerticalCells={20} />
  )
}

export default board