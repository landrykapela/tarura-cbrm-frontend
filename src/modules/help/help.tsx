'use client';
import { useEffect, useState } from "react";
import { getUserSession, getGeodata,generateHelpTopics } from "../../utils/utils";
// const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false })
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SidebarHelp from "../../components/sidebar_help";
import Header from "../../components/header";

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
    return (<>
         <Header user={userData} active={5} />
        <main className="w-full flex bg-white min-h-screen">
            <div className="md:w-2/12 flex flex-col items-start text-center justify-center">
                <SidebarHelp  user={userData}/>
            </div>
            
                <div className="bg-white w-full flex items-start justify-between md:w-8/12 mx-auto space-y-4 mt-2">
                <div className="bg-white w-full md:w-8/12 mx-auto space-y-4 mt-2 px-2">
                    <p className="text-2xl my-4">{selectedTopic.title}</p>
                    {selectedTopic.content.split("\n").map((paragraph:string)=>{
                        return <p className="text-textDefault">{paragraph}</p>
                    })}
                    
</div>
<div className="hidden md:block bg-slate-300 w-full md:w-3/12 mx-auto space-y-4 mt-2">
<p className="text-2xl">Related Topics</p>
</div>
                </div>


        </main>
    </>);

}
export default Help;