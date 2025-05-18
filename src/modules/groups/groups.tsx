import { useEffect, useState } from "react";
import { getUserSession } from "../../utils/utils";
import Sidebar from "../../components/sidebar";
import GroupsTable from "./groups_table";
import Header from "../../components/header";
import { ApiClient } from "../../utils/apiclient";
import Spinner from "../../components/spinner";

const Groups = ()=>{
  const userData = getUserSession()
  const apiClient = new ApiClient(userData?.accessToken);
  const [groupData,setGroupData]= useState<any>()
  const [loading,setLoading]= useState<boolean>(false)

    const getGroups=async()=>{
      setLoading(true)
      const response = await apiClient.getGroups();
      setGroupData(response.data.data)
      setLoading(false)
    }
    useEffect(()=>{
      getGroups()
    },[])
    return(<>
     <Header user={userData} active={1}/>
    
    <main className="w-full flex bg-white min-h-full">

      <div className="md:w-2/12 flex flex-col items-start text-center justify-center">
        <Sidebar user={userData} active={1} /> 
      </div>

      <div className="md:w-9/12 mx-auto space-y-4 mt-2">
        <p className="text-2xl">Identified Groups</p>
        {loading ? <Spinner className="spinner-md"/> : (groupData ? <GroupsTable data={groupData}/>: 
        <div className="w-full flex justify-center items-center">
          <p className="text-red-500">No data found</p>
        </div>)
        }
       </div>
       </main>
    </>)
}
export default Groups;