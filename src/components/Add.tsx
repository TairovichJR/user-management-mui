import { Box, Button } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const Add = () => {

  const navigate = useNavigate();
    
  return (
    <Box display='flex' justifyContent='end'>
         <Button 
            variant='contained' 
            onClick={(e) => navigate(`/users/createUser`)}> 
                <AddIcon /> Add
         </Button>
    </Box>
   
  )
}

export default Add