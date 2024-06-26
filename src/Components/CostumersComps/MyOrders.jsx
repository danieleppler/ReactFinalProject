import React from 'react'
import { useSelector } from 'react-redux'
import GenericTable from '../GenericTable'

const MyOrders = () => {
    const UserFromStore = useSelector((state)=>state?.rootReducer.CurrentLogedInUser)

  return (
    <div style={{marginLeft:"240px"}}>
        {
            UserFromStore.ProdcutsBought.length > 0 ?
            <GenericTable KeysOrder = {['Date','Title','Qty','Total']} data={UserFromStore.ProdcutsBought} />
            :
            <h2>No Orders Yet!</h2>
        }
      
    </div>
  )
}

export default MyOrders
