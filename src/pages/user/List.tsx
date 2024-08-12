import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import FilterTags from "../../components/FilterTags";
import StatusTabs from "../../components/StatusTabs";
import UserFilters from "../../components/UserFilters";
import UserTable from "../../components/UserTable";
import { useEffect } from "react";
import { fetchUsers } from "../../app/features/userSlice";
import Loading from "../../components/Loading";
import CustomSnackbar from "../../components/CustomSnackbar";

const UserListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.users.loading);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <CustomSnackbar />
      <StatusTabs />
      <UserFilters />
      <FilterTags />
      <UserTable />
    </>
  );
};

export default UserListPage;
