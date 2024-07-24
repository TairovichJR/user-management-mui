// src/components/UserTabs.tsx
import React from 'react';
import { Tabs, Tab, Badge } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useUsers } from '../context/UsersContext';

interface UserTabsProps {
}

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

const UserTabs: React.FC<UserTabsProps> = () => {

  const { tabs, tab, setTab } = useUsers();

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <Tabs value={tab} onChange={handleTabChange}>
      {tabs.map((tabObj) => {
        
        const badgeStyles = getBadgeStyles(tabObj.tabName);
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
          <Tab
            key={tabObj.tabName}
            label={
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                {tabObj.tabName}
                <CustomBadge badgeContent={tabObj.count} showZero/>
              </div>
            }
            value={tabObj.tabName.toLowerCase()}
          />
        );
      })}
    </Tabs>
  );
};

export default UserTabs;
