import { createContext, useEffect, useState } from "react";
import "./App.css";
import PageRoutes from "./ui/PageRoutes/PageRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import tokenHelper from "./helper/tokenHelper";
import { useGetMyFullProfile } from "./api/data_hooks/userProfileHook";
import LoadingOverlay from "./ui/LoadingOverlay";

export const AppContext = createContext();

function App() {
  const token = tokenHelper.getToken() ?? "";
  const [isLogin, setIsLogin] = useState(token.length > 0);
  const getFullProfile = useGetMyFullProfile(isLogin);

  return (
    <AppContext.Provider
      value={{
        currentUserProfile: isLogin
          ? getFullProfile.isSuccess
            ? getFullProfile.data
            : null
          : null,
        setIsLogin: setIsLogin,
      }}
    >
      {getFullProfile.isLoading && <LoadingOverlay />}
      <ToastContainer />
      <PageRoutes />
    </AppContext.Provider>
  );
}

export default App;
