// src/app/features/userSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from '../../model';
import UserService from '../../hooks/UserService';

interface UsersState {
  users: IUser[];
  selectedUserIds: number[];
  filteredUsers: IUser[];
  searchKey: string;
  toggledRoles: string[];
  roleValues: string[];
  tab: string;
  statusTabs: Record<string, number>;
  loading: boolean;
  error: string | null;
  userDetails: IUser | null;
  userDetailsLoading: boolean;
  userDetailsError: string | null;
  dialogOpen: boolean;
  snackbar: boolean;
  snackbarText: string;
}

const initialState: UsersState = {
  users: [],
  selectedUserIds: [],
  filteredUsers: [],
  searchKey: '',
  toggledRoles: [],
  roleValues: [],
  tab: 'all',
  statusTabs: { "All": 0, "Active": 0, "Banned": 0, "Pending": 0, "Rejected": 0 },
  loading: true,
  error: null,
  userDetails: null,
  userDetailsLoading: false,
  userDetailsError: null,
  dialogOpen: false,
  snackbar: false,
  snackbarText: ''
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await UserService.fetchUsers();
  return response;
});


export const getUserDetails = createAsyncThunk('users/getUserDetails', async (id: number) => {
  const response = await UserService.getUser(id);
  return response;
});

export const updateUserDetails = createAsyncThunk('users/updateUserDetails', async ({ id, user }: { id: number, user: Partial<IUser> }) => {
  const response = await UserService.updateUser(id, user);
  return response;
});


const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSnackbarText (state, action: PayloadAction<string>){
      state.snackbarText = action.payload;
    },
    openSnackbar (state) {
      state.snackbar = true;
    },
    closeSnackbar(state) {
      state.snackbar = false;
    },
    openDialog (state) {
        state.dialogOpen = true;
    },
    closeDialog (state) {
      state.dialogOpen = false;
    },
    setSearchKey(state, action: PayloadAction<string>) {
      state.searchKey = action.payload;
      usersSlice.caseReducers.setFilteredUsers(state);
    },
    setTab(state, action: PayloadAction<string>) {
      state.tab = action.payload;
      usersSlice.caseReducers.setFilteredUsers(state);
    },
    toggleRole(state, action: PayloadAction<string>) {
      const role = action.payload;
      if (state.toggledRoles.includes(role)) {
        state.toggledRoles = state.toggledRoles.filter((r) => r !== role);
      } else {
        state.toggledRoles.push(role);
      }
      usersSlice.caseReducers.setFilteredUsers(state);
    },
    resetAllFilters(state) {
      state.tab = 'all';
      state.searchKey = '';
      state.toggledRoles = [];
      usersSlice.caseReducers.setFilteredUsers(state);
    },
    setFilteredUsers(state) {
      state.filteredUsers = state.users.filter((user) => {
        const matchesStatus = state.tab === 'all' || user.status.toLowerCase() === state.tab;
        const matchesSearchKey = user.name.toLowerCase().includes(state.searchKey);
        const matchesRoles = state.toggledRoles.length === 0 || state.toggledRoles.includes(user.role);
        return matchesStatus && matchesSearchKey && matchesRoles;
      });
    },
    // this is for handling the table header checkbox
    toggleHeaderCheckbox(state) {
      if(state.selectedUserIds.length > 0){
        state.selectedUserIds = [];
      }else{
        const filteredUserIds = state.filteredUsers.map((user:IUser) => user.id);
        state.selectedUserIds = filteredUserIds;
      }
      console.log(state.selectedUserIds);
    },

    // this is for handling each user row checkbox
    toggleUserRowCheckbox (state, action: PayloadAction<number>){
      const selectedIndex = state.selectedUserIds.indexOf(action.payload);
      let tempSelectedIds: number[] = [];

      if(selectedIndex === -1){
        tempSelectedIds = tempSelectedIds.concat(state.selectedUserIds, action.payload);
      }
      else if(selectedIndex === 0){
        tempSelectedIds = tempSelectedIds.concat(state.selectedUserIds.slice(1));
      }
      else if(selectedIndex === state.selectedUserIds.length-1){
        tempSelectedIds = tempSelectedIds.concat(state.selectedUserIds.slice(0, -1));
      }
      else if(selectedIndex > 0){
        tempSelectedIds.slice(0, selectedIndex);
        tempSelectedIds.slice(selectedIndex+1);
      }
      state.selectedUserIds = tempSelectedIds;
    },

    //this is for deleting selected users in bulk from table header
    deleteSelectedUsers(state) {
        state.users = state.users.filter((user) => !state.selectedUserIds.includes(user.id));
        state.selectedUserIds = [];
        usersSlice.caseReducers.setFilteredUsers(state);
    },

   //  this is for deleting an individual user
    deleteSelectedUser(state, action:PayloadAction<number>) {
      state.selectedUserIds = state.selectedUserIds.filter((userId) => userId !== action.payload);
      state.users = state.users.filter((user) => user.id !== action.payload);
      usersSlice.caseReducers.setFilteredUsers(state);
    }
     
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
        state.loading = false;
        state.users = action.payload;
        state.roleValues = Array.from(new Set(action.payload.map((user) => user.role)));
        const statusTabs: Record<string, number> = { "All": action.payload.length, "Active": 0, "Banned": 0, "Pending": 0, "Rejected": 0 };
        action.payload.forEach((user) => {
          if (statusTabs[user.status] !== undefined) {
            statusTabs[user.status]++;
          }
        });
        state.statusTabs = statusTabs;
        state.filteredUsers = state.users;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(getUserDetails.pending, (state) => {
        state.userDetailsLoading = true;
        state.userDetailsError = null;
        state.userDetails = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action: PayloadAction<IUser | undefined>) => {
        state.userDetailsLoading = false;
        state.userDetails = action.payload || null;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.userDetailsLoading = false;
        state.userDetailsError = action.error.message || 'Failed to fetch user details';
      })
      .addCase(updateUserDetails.pending, (state) => {
        state.userDetailsLoading = true;
        state.userDetailsError = null;
      })
      .addCase(updateUserDetails.fulfilled, (state, action: PayloadAction<IUser | undefined>) => {
        state.userDetailsLoading = false;
        if (action.payload) {
          const index = state.users.findIndex(user => user.id === action.payload?.id);
          if (index !== -1) {
            state.users = [
              ...state.users.slice(0, index),
              action.payload,
              ...state.users.slice(index + 1),
            ];
            usersSlice.caseReducers.setFilteredUsers(state);
          }
        }
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.userDetailsLoading = false;
        state.userDetailsError = action.error.message || 'Failed to update user details';
      });
  },
  
});

export const setIsFilterOn = (state: UsersState) => {
  return state.searchKey.trim().length > 0 || state.tab !== 'all' || state.toggledRoles.length > 0;
};

export const { setSearchKey, setTab, toggleRole, resetAllFilters, setFilteredUsers,toggleHeaderCheckbox, toggleUserRowCheckbox,
  deleteSelectedUsers,deleteSelectedUser, openDialog, closeDialog, openSnackbar, closeSnackbar, setSnackbarText} = usersSlice.actions;
export default usersSlice.reducer;
