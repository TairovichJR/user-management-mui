import { Box } from '@mui/material'
import UserForm from '../../components/UserForm'

const NewUser = () => {
  return (
    <Box display="flex" gap={3}>
        <UserForm formType="createUser" />
    </Box>
  )
}

export default NewUser