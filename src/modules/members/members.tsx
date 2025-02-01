import React from "react";
import { generateMembers, getGeodata, getUserSession } from "../../utils/utils";
import Sidebar from "../../components/sidebar";
import MembersTable from "./members_table";

const Members = ()=>{

    const userData = getUserSession()
    const members = generateMembers()
    console.log("🚀 ~ Members ~ members:", members)
    return(<>
    <div className="w-full flex justify-end items-center bg-gray-100 pe-4">
          <div className=" space-x-2 w-4/12 flex justify-end mt-0 items-center text-primary ">
            <p className="text-end py-4">{userData?.email}</p>
           
          </div>
        </div>
    <main className="w-full flex bg-white min-h-full">

      <div className="md:w-2/12 flex flex-col items-start text-center justify-center">
        <Sidebar user={userData} active={2} />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 f
      </div>

      <div className="md:w-9/12 mx-auto space-y-4 mt-2">
        <p className="text-2xl">Registered Members</p>
        <MembersTable data={members}/>
       </div>
       </main>
    </>)
}
export default Members;