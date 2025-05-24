import { useEffect, useState } from "react";
import { getStoredUserData, getUserSession } from "../../utils/utils";
import Sidebar from "../../components/sidebar";
import MembersTable from "./members_table";
import { ApiClient } from "../../utils/apiclient";
import Spinner from "../../components/spinner";
import Header from "../../components/header";
import axios from "axios";
import PageControl from "../../components/page_control";
import { RoleEnum } from "../../utils/types";

const Members = () => {
  const session = getUserSession();
  const userData = getStoredUserData();
  const apiClient = new ApiClient(session?.accessToken);
  const [memberData, setMemberData] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const [feedback,setFeedback] = useState<string>("")
  const [pageSize,setPageSize] = useState<number>(20);
  const [currentPage,setCurrentPage] = useState<number>(1)


  const getMembersData = async () => {
    setLoading(true)
    try{
      const options = {take: pageSize,page:currentPage}
      const response = await apiClient.getMembers(options);
      setMemberData(response.data.data)
      setLoading(false)
    }
    catch(error){
      if(axios.isAxiosError(error)) setFeedback(error.response?.data.message);
      else setFeedback('An error occurred, please try again');
    }
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
  useEffect(() => {
    getMembersData()
  },[pageSize, currentPage])
  return (<>
    <Header user={session} active={2} />
    <main className="w-full flex bg-white min-h-full">

      <div className="md:w-2/12 flex flex-col items-start text-center justify-center">
        <Sidebar user={session} active={2} /> 
      </div>

      <div className="md:w-9/12 mx-auto space-y-4 mt-2">
        <p className="text-2xl">Registered Members</p>
        {loading ? <Spinner className="spinner-md"/> : (memberData ? <>
        <MembersTable data={memberData} onPageSizeChange={(page:number)=>handlePageSizeChange(page)} onPageChange={(page:number)=>{setCurrentPage(page)}} currentPage={currentPage} pageSize={pageSize} isAdmin={userData?.role === RoleEnum.ADMIN}/>
        <PageControl onPageSizeChange={(pageSize:number)=>{handlePageSizeChange(pageSize)}} hasNext={memberData.hasNext} hasPrevious={memberData.hasPrevious} currentPage={currentPage} totalPages={memberData.totalPages} onNext={handleNext} onPrevious={handlePrevious} onPageChange={handlePageChange} pageSize={pageSize}/></>
        : 
        <div className="w-full flex justify-center items-center">
          <p className="text-red-500">{feedback}</p>
        </div>)
        }
       </div>
       </main>
  </>)
}
export default Members;
