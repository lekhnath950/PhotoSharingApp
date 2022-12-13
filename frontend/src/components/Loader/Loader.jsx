import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'

const Loader = () => {
  return (
    <div className='loader'>
      <CircularProgress color="inherit"/>
      <Backdrop/>
    </div>
  )
}

export default Loader