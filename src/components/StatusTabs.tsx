// src/components/StatusTabs.tsx
import React from 'react';
import { Tabs, Tab, Badge } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { Box } from '@mui/system';
import { setTab } from '../app/features/userSlice';

interface StatusTabsProps {}

const StyledTab = styled(Tab)(({ theme }) => ({
  '&.Mui-selected': {
    color: 'black',
  },
}));

const StyledTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    backgroundColor: 'black',
  },
});

// Custom styled badge component
const getBadgeStyles = (tabName: string) => {
  switch (tabName) {
    case 'All':
      return {
        backgroundColor: 'black',
        color: 'white',
      };
    case 'Active':
      return {
        backgroundColor: '#e0f2f1', // Light green
        color: '#004d40', // Dark green
      };
    case 'Pending':
      return {
        backgroundColor: '#fff3e0', // Light orange
        color: '#e65100', // Dark orange
      };
    case 'Banned':
      return {
        backgroundColor: '#ffebee', // Light red
        color: '#b71c1c', // Dark red
      };
    case 'Rejected':
      return {
        backgroundColor: '#eceff1', // Light gray
        color: '#263238', // Dark gray
      };
    default:
      return {
        backgroundColor: 'black',
        color: 'white',
      };
  }
};

const StatusTabs: React.FC<StatusTabsProps> = () => {
  const dispatch = useDispatch();
  const tab = useSelector((state: RootState) => state.users.tab);
  const statusTabs = useSelector((state: RootState) => state.users.statusTabs);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    dispatch(setTab(newValue));
  };

  return (
    <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'gray' }}>
      <StyledTabs value={tab} onChange={handleTabChange}>
        {Object.entries(statusTabs).map(([key, value]) => {
          const badgeStyles = getBadgeStyles(key);
          const CustomBadge = styled(Badge)(({ theme }) => ({
            '& .MuiBadge-badge': {
              right: 3,
              top: -1,
              padding: '0 8px',
              borderRadius: 4,
              backgroundColor: badgeStyles.backgroundColor,
              color: badgeStyles.color,
            },
          }));
          return (
            <StyledTab
              key={key}
              label={
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  {key}
                  <CustomBadge badgeContent={value} showZero />
                </div>
              }
              value={key.toLowerCase()}
            />
          );
        })}
      </StyledTabs>
    </Box>
  );
};

export default StatusTabs;
