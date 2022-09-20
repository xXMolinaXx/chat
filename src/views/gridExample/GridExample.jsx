import React from 'react'
import './style.css'
const GridExample = () => {
  return (
    <div>
      <div className='container-grid'>
        <div className='item'>item 1</div>
        <div className='item'>item 2</div>
        <div className='item'>item 3</div>
        <div className='item'>item 4</div>
        <div className='item'>item 5</div>
        <div className='item'>item 6</div>
      </div>
      <div className='container-grid2'>
        <div className='item' style={{gridArea:'nav'}}>item 1</div>
        <div className='item' style={{gridArea:'sidebar'}}>item 2</div>
        <div className='item' style={{gridArea:'main'}}>item 3</div>
      </div>
    </div>
  )
}

export default GridExample