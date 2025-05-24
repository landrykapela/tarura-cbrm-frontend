import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GroupType } from "../../utils/types";
import { getRatio, getRawGroups, getUserSession } from "../../utils/utils";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import { MdArrowBack } from "react-icons/md";
import MembersTable from "../members/members_table";

const GroupView = () => {
    const params = useParams()
    const navigate = useNavigate()
    const location = useLocation();
    const data = location.state?.data;
    const userData = getUserSession();
    const [group, setGroup] = useState<GroupType | null | undefined>(data)

    useEffect(() => {
        console.log(data)
        if (data == null) {
            const gid = params.id;
                const raw = getRawGroups();
                setGroup(raw.find(r => r.id == gid))
           
        }

    }, [])
    return (<>
        <Header user={userData} active={1} />

        <main className="w-full flex bg-white min-h-full">

            <div className="md:w-2/12 flex flex-col items-start text-center justify-center">
                <Sidebar user={userData} active={1} />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
            </div>

            <div className="md:w-9/12 mx-auto space-y-4 mt-2 border-2 p-4">
                <MdArrowBack className="cursor-pointer text-accent" onClick={() => { navigate(-1) }} />
                <p className="text-2xl text-center py-6 mt-8">Group Details</p>
                <div className="w-full md:w-9/12 md:flex justify-between items-start md:space-x-4 mx-auto mt-4 p-4 border-t-2 border-gray-200">
                    <div className="md:w-4/12 w-full">
                        <label>Group Name</label>
                        <p>{group?.name}</p>
                    </div>
                    <div className="md:w-4/12 w-full">
                        <label>Number of Members</label>
                        <p>{group?.membersCount}</p>
                    </div>
                    <div className="md:w-4/12 w-full">
                        <label>Gender Ratio (Male to Female)</label>
                        <p>{getRatio(group?.malesCount!, group?.femalesCount!)}</p>
                    </div>
                </div>
                <div className="w-full md:w-9/12 md:flex justify-between items-start md:space-x-4 mx-auto mt-4 p-4 border-t-2 border-gray-200">
                    <div className="md:w-4/12 w-full">
                        <label>Region</label>
                        <p>{group?.region}</p>
                    </div>
                    <div className="md:w-4/12 w-full">
                        <label>District</label>
                        <p>{group?.district}</p>
                    </div>
                    <div className="md:w-4/12 w-full">
                        <label>Ward/Village</label>
                        <p>{`${group?.ward!}/${group?.village!}`}</p>
                    </div>
                </div>
                <div className="w-full md:w-9/12 md:flex justify-between items-start md:space-x-4 mx-auto mt-4 p-4 border-t-2 border-gray-200">
                    <div className="md:w-4/12 w-full">
                        <label>TARURA Road Code</label>
                        <p>{group?.roadCode ? group?.roadCode : 'None'}</p>
                    </div>
                    <div className="md:w-4/12 w-full">
                        <label>Road Length (Km)</label>
                        <p>{group?.roadLength ? group?.roadLength : 'None'}</p>
                    </div>
                    <div className="md:w-4/12 w-full">
                        <label>Coordinates</label>
                        <p>{`${group?.latitude!}, ${group?.latitude!}`}</p>
                    </div>
                </div>
                <div className="w-full md:w-9/12 md:flex justify-between items-start md:space-x-4 mx-auto mt-4 p-4 border-gray-200 border-t-2">
                    <div className="md:w-4/12 w-full">
                        <label>Group Chairman</label>
                        <p>{`${group?.chairmanName} | ${group?.chairmanPhone}`}</p>
                    </div>
                    <div className="md:w-4/12 w-full">
                        <label>Group Secretary</label>
                        <p>{`${group?.secretaryName} | ${group?.secretaryPhone}`}</p>
                    </div>
                    <div className="md:w-4/12 w-full">
                        <label>Group Treasurer</label>
                        <p>{`${group?.treasurerName} | ${group?.treasurerPhone}`}</p>
                    </div>
                </div>
                {group?.members && group?.members.length > 0 ?
                    <div className="md:w-9/12 mx-auto space-y-4 mt-2">
                        <p className="text-2xl text-center py-6 mt-8">Group Members</p>
                        <MembersTable data={group.members.map((m=>{return {... m, group: group}}))} embedded={true}/>
                    </div> : null
                }

            </div>
        </main>

    </>)
}
export default GroupView;
