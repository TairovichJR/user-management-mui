// src/context/UsersContext.ts
import { ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { createContext } from "react";
import { ITab, IUser } from "../model";
import UserService from "../hooks/UserService";

interface UsersProviderProps {
  children: ReactNode;
}

interface UsersContextProps {
  filteredUsers: IUser[];
  setSearchKey: (value: string) => void;
  searchKey: string;
  tabs: ITab[];
  setTab: (value: string) => void;
  tab: string;
  addRoles: (role: string) => void;
  roles: string[];
  allUserRoles: string[];
  setRoles: (roles: string[]) => void;
  resetAllFilters: () => void;
  isFilterOn: boolean;
  createUser: (user: IUser) => Promise<IUser>;
  updateUser: (id: number, user: Partial<IUser>) => Promise<IUser | undefined>;
  deleteUser: (id: number) => Promise<boolean>;
}

const UsersContext = createContext<UsersContextProps | undefined>(undefined);

const tabs_array = ['Active', 'Pending', 'Banned', 'Rejected'];

export const UsersProvider = ({ children }: UsersProviderProps) => {
  const [searchKey, setSearchKey] = useState('');
  const [users, setUsers] = useState<IUser[]>([]);
  const [tab, setTab] = useState('all');
  const [allUserRoles, setAllUserRoles] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await UserService.fetchUsers();
        setUsers(data);
        setAllUserRoles(Array.from(new Set(data.map((user) => user.role))));
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addRoles = (role: string) => {
    setRoles((prev) => {
      if (prev.includes(role)) {
        return prev.filter((r) => r !== role); // Remove role if it already exists
      } else {
        return [...prev, role]; // Add role if it doesn't exist
      }
    });
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesStatus = tab === 'all' || user.status.toLowerCase() === tab;
      const matchesSearchKey = user.name.toLowerCase().includes(searchKey);
      const matchesRoles = roles.length === 0 || roles.includes(user.role);
      return matchesStatus && matchesSearchKey && matchesRoles;
    });
  }, [searchKey, users, tab, roles]);

  const tabs = useMemo<ITab[]>(() => {
    const result = tabs_array.map((t) => {
      return {
        tabName: t,
        count: users.filter((user) => user.status === t).length,
      };
    });
    result.unshift({ tabName: 'All', count: users.length });
    return result;
  }, [users]);

  const resetAllFilters = () => {
    setTab('all');
    setSearchKey('');
    setRoles([]);
  }

  const isFilterOn = tab !== 'all' || roles.length > 0 || searchKey.trim().length > 0;

  const createUser = async (user: IUser) => {
    return await UserService.createUser(user);
  };

  const updateUser = async (id: number, user: Partial<IUser>) => {
    return await UserService.updateUser(id, user);
  };

  const deleteUser = async (id: number) => {
    return await UserService.deleteUser(id);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <UsersContext.Provider value={{
      setSearchKey, filteredUsers, tabs, tab, setTab,
      roles, allUserRoles, addRoles, searchKey, setRoles, resetAllFilters, isFilterOn,
      createUser, updateUser, deleteUser
    }}>
      {children}
    </UsersContext.Provider>
  );
}

export const useUsers = (): UsersContextProps => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error('useUsers must be used within a UsersProvider');
  }
  return context;
}
