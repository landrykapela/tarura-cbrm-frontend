import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./modules/home/login";
import Dashboard from "./modules/admin/dashboard";
import Groups from "./modules/groups/groups";
import Members from "./modules/members/members";
import Reports from "./modules/settings/settings";
import Help from "./modules/help/help";
import GroupView from "./modules/groups/groups_view";
import Settings from "./modules/settings/settings";
import GroupsImport from "./modules/groups/groups_import";

const MainRoutes = ()=>{

    return (
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/signout" element={<LoginPage />}/>
        <Route path="/admin" element={<Dashboard />}/>
        <Route path="/help" element={<Help />}/>
        <Route path="/help/:title" element={<Help />}/>
        <Route path="/admin/dashboard" element={<Dashboard />}/>
        <Route path="/admin/reports" element={<Reports />}/>
        <Route path="/admin/groups" element={<Groups />}/>
        <Route path="/admin/groups/import" element={<GroupsImport />}/>
        <Route path="/admin/groups/view/:id" element={<GroupView />}/>
        <Route path="/admin/members" element={<Members />}/>
        <Route path="/admin/settings" element={<Settings />} />
        </Routes>
        </BrowserRouter>
    )
}
export default MainRoutes;