import { useEffect, useState } from "react";
import { getStoredUserData, getUserSession } from "../../utils/utils";
import Sidebar from "../../components/sidebar";
import GroupsTable from "./groups_table";
import Header from "../../components/header";
import { ApiClient } from "../../utils/apiclient";
import Spinner from "../../components/spinner";
import PageControl from "../../components/page_control";
import { IPaginationOptions, RoleEnum } from "../../utils/types";

const Groups = ()=>{
  const session = getUserSession();
  const userData = getStoredUserData();
  const apiClient = new ApiClient(session?.accessToken);
  const [groupData,setGroupData]= useState<any>()
  const [loading,setLoading]= useState<boolean>(false)
  const [pageSize, setPageSize] = useState<number>(20)
  const [currentPage, setCurrentPage] = useState<number>(1)

    const getGroups=async()=>{
      setLoading(true)
      const options: IPaginationOptions ={take: pageSize, page:currentPage}
      const response = await apiClient.getGroups(options);
      setGroupData(response.data.data)
      setLoading(false)
    }

  const handlePageSizeChange = (pageSize:number)=>{
    setPageSize(pageSize)
  }
  const handleNext = ()=>{
    setCurrentPage(currentPage + 1)
  }
  const handlePrevious=()=>{
    setCurrentPage(currentPage - 1)
  }
  const handlePageChange = (page:number)=>{
    setCurrentPage(page)
  }
    useEffect(()=>{
      getGroups()
    },[pageSize, currentPage])
    return(<>
     <Header user={session} active={1}/>
    
    <main className="w-full flex bg-white min-h-full">

      <div className="md:w-2/12 flex flex-col items-start text-center justify-center">
        <Sidebar user={session} active={1} /> 
      </div>

      <div className="md:w-9/12 mx-auto space-y-4 mt-2">
        <p className="text-2xl">Identified Groups</p>
        {loading ? <Spinner className="spinner-md"/> : (groupData ? 
        <>
          <GroupsTable data={groupData} isAdmin={userData?.role === RoleEnum.ADMIN}/>
          <PageControl onPageSizeChange={(pageSize:number)=>{handlePageSizeChange(pageSize)}} hasNext={groupData.hasNext} hasPrevious={groupData.hasPrevious} currentPage={groupData.currentPage} totalPages={groupData.totalPages} onNext={handleNext} onPrevious={handlePrevious} onPageChange={handlePageChange} pageSize={pageSize}/>
        </>: 
        <div className="w-full flex justify-center items-center">
          <p className="text-red-500">No data found</p>
        </div>)
        }
       </div>
       </main>
    </>)
}
export default Groups;
