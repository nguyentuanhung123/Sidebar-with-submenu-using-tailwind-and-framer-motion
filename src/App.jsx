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
import SortingTable from "./pages/SortingTable";
import FilteringTable from "./pages/FilteringTable";
import FormatDate from "./pages/FormatDate";
import TestTable from "./pages/TestTable";
import TodoBeginnerWrapper from "./pages/TodoBeginger/TodoBeginnerWrapper.jsx";
import PaginationTable from "./pages/PaginationTable.jsx";
import UpdateTodo from "./pages/UpdateTodo/UpdateTodo.jsx";
import RowSelection from "./pages/RowSelection.jsx";
import ColumnOrder from "./pages/ColumnOrder.jsx";
import ColumnHiding from "./pages/ColumnHiding.jsx";

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
          <Route path="/filteringtable" element={<FilteringTable />} />
          <Route path="/paginationtable" element={<PaginationTable />} />
          <Route path="/rowselection" element={<RowSelection />} />
          <Route path="/columnorder" element={<ColumnOrder />} />
          <Route path="/columnhiding" element={<ColumnHiding />} />
          <Route path="/formatdate" element={<FormatDate />} />
          <Route path="/testtable" element={<TestTable />} />
          <Route path="/todobeginner" element={<TodoBeginnerWrapper />} />
          <Route path="/updatetodo" element={<UpdateTodo />} />
          <Route path="/build/:bID" element={<Build />} />
          <Route path="/analytics/:aID" element={<Analytics />} />
        </Routes>
      </RootLayout>
    </Router>
  );
}

export default App;
