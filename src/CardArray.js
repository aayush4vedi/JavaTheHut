import React from 'react';
import Card from './Card' //ATOM

const CardList = ({rangers})=>{
    return (
        <div>
            {
               rangers.map((ranger,i)=>{
                    return(
                        <Card 
                            key={i} 
                            id = {rangers[i].id }
                            name= {rangers[i].name} 
                            color={rangers[i].color} 
                            rollcall={rangers[i].rollcall} 
                            bg={rangers[i].bg}
                        />
                    )
                })
            }
        </div>
    )
}
export default CardList;