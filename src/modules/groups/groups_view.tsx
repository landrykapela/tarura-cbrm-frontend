import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GroupType } from "../../utils/types";
import { getRatio, getRawGroups, getUserSession } from "../../utils/utils";
import Sidebar from "../../components/sidebar";

const GroupView = ()=>{
    const params = useParams()
    const navigate = useNavigate()
    const location = useLocation();
    const data = location.state?.data;
    const userData = getUserSession();
    const [group,setGroup] = useState<GroupType | null |undefined>(data)

    useEffect(()=>{
        console.log(data)
        if(data == null){
            const gid = Number(params.id);
            if(gid && gid > 0){
              
            const raw = getRawGroups();
            setGroup(raw.find(r=>r.id == gid))  
            }
            else {
                alert("Invalid request")
                navigate(-1)
            }
        }
        
    },[])
    return(<>
          <div className="w-full flex justify-end items-center bg-gray-100 pe-4">
          <div className=" space-x-2 w-4/12 flex justify-end mt-0 items-center text-primary ">
            <p className="text-end py-4">{userData?.email}</p>
           
          </div>
        </div>
    <main className="w-full flex bg-white min-h-full">

      <div className="md:w-2/12 flex flex-col items-start text-center justify-center">
        <Sidebar user={userData} active={1} />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 f
      </div>

      <div className="md:w-9/12 mx-auto space-y-4 mt-2">
        <p className="text-2xl">Group Details</p>
        <div className="md:w-9/12 flex justify-between items-start space-x-4 mx-auto mt-4 p-4 border-t-2 border-gray-200">
            <div className="md:w-4/12">
                <small>Group Name</small>
                <p>{group?.name_of_group}</p>
            </div>
            <div className="md:w-4/12">
                <small>Number of Members</small>
                <p>{group?.number_of_group_members}</p>
            </div>
            <div className="md:w-4/12">
                <small>Gender Ratio (Male to Female)</small>
                <p>{getRatio(group?.male_count!,group?.female_count!)}</p>
            </div>
        </div>
        <div className="md:w-9/12 flex justify-between items-start space-x-4 mx-auto mt-4 p-4 border-t-2 border-gray-200">
            <div className="md:w-4/12">
                <small>Region</small>
                <p>{group?.mkoa}</p>
            </div>
            <div className="md:w-4/12">
                <small>District</small>
                <p>{group?.district}</p>
            </div>
            <div className="md:w-4/12">
                <small>Ward/Village</small>
                <p>{`${group?.kata!}/${group?.kijiji!}`}</p>
            </div>
        </div>
        <div className="md:w-9/12 flex justify-between items-start space-x-4 mx-auto mt-4 p-4 border-t-2 border-gray-200">
            <div className="md:w-4/12">
                <small>TARURA Road Code</small>
                <p>{group?.namba_ya_barabara}</p>
            </div>
            <div className="md:w-4/12">
                <small>Road Length (Km)</small>
                <p>{group?.urefu_wa_barabara}</p>
            </div>
            <div className="md:w-4/12">
                <small>Coordinates</small>
                <p>{`${group?.latitude!}, ${group?.latitude!}`}</p>
            </div>
        </div>
        <div className="md:w-9/12 flex justify-between items-start space-x-4 mx-auto mt-4 p-4 border-gray-200 border-t-2">
            <div className="md:w-4/12">
                <small>Community Group Type </small>
                <p>{group?.reg_type1 ? group.reg_type1 : 'None'}</p>
            </div>
            <div className="md:w-4/12">
                <small>Procurement Registration</small>
                <p>{group?.reg_type2 ? group.reg_type2 : 'None'}</p>
            </div>
            <div className="md:w-4/12">
                <small>Contractor Registration</small>
                <p>{group?.reg_type3 ? group.reg_type3 : 'None'}</p>
            </div>
        </div>
       </div>
       </main>
        
    </>)
}
export default GroupView;