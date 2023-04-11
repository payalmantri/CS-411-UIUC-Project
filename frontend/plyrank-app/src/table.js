import React from 'react';


function Table(props) {
  const {teamName, playerNames} = props;
  return (
    <div style={{display:"flex", flexDirection:"column", width:"100vw", marginTop:10}}>

      <div className='header' style={{fontSize:25, backgroundColor:"grey"}}>{teamName}</div>
      {playerNames.map((d,idx) => {
        return(
<div className='row' key={d}> {idx}:  {d}</div>
        )
      })}
      
     
    </div>
    // <div style={{ display: 'table', width: '100%' }}>
    //   <div style={{ display: 'table-header-group', backgroundColor: '#eee', textAlign:"center" }}>
    //     Header 1
    //   </div>
    //   <div style={{ display: 'table-row-group' }}>
    //     <div style={{ display: 'table-row' }}>
    //       <div style={{ display: 'table-cell', padding: '10px', backgroundColor: '#eee' }}>Cell 1</div>
    //       <div style={{ display: 'table-cell', padding: '10px' }}>Cell 2</div>
    //       <div style={{ display: 'table-cell', padding: '10px' }}>Cell 3</div>
    //     </div>
    //     <div style={{ display: 'table-row' }}>
    //       <div style={{ display: 'table-cell', padding: '10px' }}>Cell 4</div>
    //       <div style={{ display: 'table-cell', padding: '10px', backgroundColor: '#eee' }}>Cell 5</div>
    //       <div style={{ display: 'table-cell', padding: '10px' }}>Cell 6</div>
    //     </div>
    //     <div style={{ display: 'table-row' }}>
    //       <div style={{ display: 'table-cell', padding: '10px' }}>Cell 7</div>
    //       <div style={{ display: 'table-cell', padding: '10px' }}>Cell 8</div>
    //       <div style={{ display: 'table-cell', padding: '10px', backgroundColor: '#eee' }}>Cell 9</div>
    //     </div>
    //   </div>
    // </div>

  )
}

export default Table;
