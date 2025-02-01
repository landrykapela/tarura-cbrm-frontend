'use client';
import { useEffect, useState } from "react";
import { getUserSession, getGeodata,generateHelpTopics } from "../../utils/utils";
// const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false })
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SidebarHelp from "../../components/sidebar_help";

const Help = (_props: any) => {
    const userData = getUserSession();
    const topics = generateHelpTopics();
    const bundle = useLocation()
    const params = useParams();
   const [slug,setSlug] = useState<string>("getting started")
    
   useEffect(()=>{
    if(params && Object.keys(params).includes('title')) {
        const title = params.title;
        setSlug(title ? title.toLowerCase():'getting started')
    }
   },[])
    const selectedTopic = bundle.state && bundle.state.topic ? bundle.state.topic : topics.find((t:any)=>t.title.toLowerCase()==slug)
    console.log("🚀 ~ Help ~ selectedTopic:", selectedTopic)
    return (<>
        <div className="w-full flex justify-end items-center  pe-4">
            <div className=" space-x-2 w-4/12 flex justify-end mt-0 items-center text-primary ">
                {/* <MdPerson className="hover:text-accent text-2xl"/> */}
                <p className="text-end py-4">{userData?.email}</p>

            </div>
        </div>
        <main className="w-full flex bg-white min-h-screen">
            <div className="md:w-2/12 flex flex-col items-start text-center justify-center">
                <SidebarHelp  user={userData}/>
            </div>
            
                <div className="bg-white w-full flex items-start justify-between md:w-8/12 mx-auto space-y-4 mt-2">
                <div className="bg-white w-full md:w-8/12 mx-auto space-y-4 mt-2">
                    <p className="text-2xl my-4">{selectedTopic.title}</p>
                    {selectedTopic.content.split("\n").map((paragraph:string)=>{
                        return <p className="text-textDefault">{paragraph}</p>
                    })}
                    
</div>
<div className="bg-slate-300 w-full md:w-3/12 mx-auto space-y-4 mt-2">
<p className="text-2xl">Related Topics</p>
</div>
                </div>


        </main>
    </>);

}
export default Help;