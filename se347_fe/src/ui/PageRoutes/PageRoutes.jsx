import { Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import Index from "../../Pages/Index";
import Dashboard from "../../Pages/Dashboard";

export default function PageRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Index />}></Route>
        <Route path="/dash-board" element={<Dashboard />}></Route>
      </Route>
    </Routes>
  );
}
