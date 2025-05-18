import React, { useEffect, useState } from "react";
import { getUserSession } from "../../utils/utils";
import Sidebar from "../../components/sidebar";
import MembersTable from "./members_table";
import { ApiClient } from "../../utils/apiclient";
import Spinner from "../../components/spinner";
import Header from "../../components/header";
import axios from "axios";

const Members = () => {
  const userData = getUserSession()
  const apiClient = new ApiClient(userData?.accessToken);
  const [memberData, setMemberData] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const [feedback,setFeedback] = useState<string>("")

  const getMembersData = async () => {
    setLoading(true)
    try{
      const response = await apiClient.getMembers();
      setMemberData(response.data.data)
      setLoading(false)
    }
    catch(error){
      if(axios.isAxiosError(error)) setFeedback(error.response?.data.message);
      else setFeedback('An error occurred, please try again');
    }
    setLoading(false)
    
  }
  useEffect(() => {
    getMembersData()
  },[])
  return (<>
    <Header user={userData} active={2} />
    <main className="w-full flex bg-white min-h-full">

      <div className="md:w-2/12 flex flex-col items-start text-center justify-center">
        <Sidebar user={userData} active={2} /> 
      </div>

      <div className="md:w-9/12 mx-auto space-y-4 mt-2">
        <p className="text-2xl">Registered Members</p>
        {loading ? <Spinner className="spinner-md"/> : (memberData ? <MembersTable data={memberData}/>: 
        <div className="w-full flex justify-center items-center">
          <p className="text-red-500">{feedback}</p>
        </div>)
        }
       </div>
       </main>
  </>)
}
export default Members;