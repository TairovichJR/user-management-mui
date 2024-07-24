import { Checkbox, TableCell, TableRow } from "@mui/material";
import { IUser } from "../model";

interface UserItemProps {
    user: IUser;
}
const UserItem = ({user}: UserItemProps) => {
    return (
        <TableRow key={user.id}>
              <TableCell sx={{ width: '10px' }}>
                    <Checkbox />
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>{user.company}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
            </TableRow>
    )
}

export default UserItem;