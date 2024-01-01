import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import AllApps from "./pages/AllApps";
import Analytics from "./pages/Analytics";
import Authentication from "./pages/Authentication";
import Build from "./pages/Build";
import Settings from "./pages/Settings";
import Storage from "./pages/Storage";
import Gacha from "./pages/Gacha";
import SignUp from "./pages/SignUp";
import DataTable from "./pages/DataTable";
import ReactTable from "./pages/ReactTable";
import SortingTable from "./components/SortingTable";

const App = () => {
  return (
    <Router>
      <RootLayout>
        <Routes>
          <Route path="/" element={<AllApps />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/storage" element={<Storage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/datatable" element={<DataTable />} />
          <Route path="/reacttable" element={<ReactTable />} />
          <Route path="/sortingtable" element={<SortingTable />} />
          <Route path="/build/:bID" element={<Build />} />
          <Route path="/analytics/:aID" element={<Analytics />} />
        </Routes>
      </RootLayout>
    </Router>
  );
}

export default App;
