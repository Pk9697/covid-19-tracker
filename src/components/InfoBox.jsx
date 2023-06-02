import React from 'react'
import { Card,CardContent,Typography } from '@mui/material'
import '../assets/css/InfoBox.css'
import { prettyPrintStat } from '../helpers/utils'
function InfoBox(props) {
  const { title, cases, total,active,isRed,className, ...rest } = props
  return (
    <Card className={`info-box ${className} ${active && 'info-box--selected'} ${isRed && 'info-box--red'}`} {...rest}>
        <CardContent>
            <Typography className='info-box__title' color="textSecondary">{title}</Typography>
            <h2 className={`info-box__cases ${!isRed && 'info-box__cases--green'}`}>+{prettyPrintStat(cases)}</h2>
            <Typography className='info-box__total' color="textSecondary">{prettyPrintStat(total)} Total</Typography>
        </CardContent>
    </Card>
  )
}

export default InfoBox