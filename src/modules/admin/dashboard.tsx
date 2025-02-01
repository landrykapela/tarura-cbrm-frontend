'use client';
import { useState, useEffect, useRef } from "react";
import { clearSession, getQueryString, getRawGroups, getUserSession } from "../../utils/utils";
import { GroupType, IMenuItem } from "../../utils/types";
import SummaryCard from "../../components/summary_card";
import ReactApexChart from "react-apexcharts";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner";
import Sidebar from "../../components/sidebar";
import { ApexOptions } from "apexcharts";
import ArcGisMap from "../../components/arcgis_map";


const Dashboard = (_props: any) => {
    const mapRef = useRef();
    console.log('my location:', window.location.pathname)
    const userData = getUserSession();
    const target = `${window.location.pathname}${getQueryString(window.location.href)}`
    const navigate = useNavigate()
    const [menuItems, setMenuItems] = useState<IMenuItem[]>([])
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [summary, setSummary] = useState<any>()
    const [groups,setGroups] = useState<GroupType[]>([])


    //   const { showDialog, setShowDialog } = useContext(DialogContext);
    const [user, setUser] = useState<any>(userData)

    const handleSignout = () => {
        clearSession();
    }
    const options = {
        chart: {
            id: 'apexchart-example',

            toolbar: { show: false }
        },
        title: {
            text: 'Registered Groups by District',
        },
        // stroke: {
        //     curve: "smooth",
        //     lineCap: 'butt',
        //     colors: undefined,
        //     width: 2,
        //     dashArray: 0,
        // },
        xaxis: {
            categories: summary && summary?.districts ? summary.districts : []
        }
    }
    const options_ = {
        chart: {
            id: 'apexchart-example',

            toolbar: { show: false }

        },
        title: {
            text: 'Registered Members by District',
        },
        xaxis: {
            categories: summary && summary?.districts ? summary?.districts : []
        }
    }


    const options4: ApexOptions = {
        chart: {
            toolbar: { show: false },
        },
        title: {
            text: "Groups by Regions"
        },
        plotOptions: {
            radialBar: {
                offsetY: 0,
                startAngle: 0,
                endAngle: 270,
                hollow: {
                    margin: 5,
                    size: '30%',
                    background: 'transparent',
                    image: undefined,
                },
                dataLabels: {
                    name: {
                        show: false,
                    },
                    value: {
                        show: false,
                    }
                },
                barLabels: {
                    enabled: true,
                    useSeriesColors: false,
                    offsetX: -8,
                    fontSize: '9px',
                    formatter: function (seriesName, opts) {
                        return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
                    },
                },
            }
        },
        labels: summary && summary?.regions ? summary?.regions : [],

    }
    const options5: ApexOptions = {
        chart: {
            toolbar: { show: false },

        },
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 5,
                    size: '70%',
                    background: 'transparent',
                    image: undefined,
                },
            }
        },
        labels: ["Target"],

    }

    const options2: ApexOptions = {
        chart: {
            toolbar: { show: false },
        },
        title: {
            text: "Group Distribution by Region"
        },
        fill: {
            type: 'gradient'
        },
        legend: {
            show: true,
            position: 'right'
        },
        labels: summary && summary?.regions ? summary?.regions : [],

    }
    const options3: ApexOptions = {
        chart: {
            toolbar: { show: false },
        },
        title:{
            text: "Distribution by Gender"
        },
        legend: {
            show: true,
            position: 'right'
        },
        labels: ["Female","Male"],


    }
    const options6: ApexOptions = {
        chart: {
            toolbar: { show: false },
        },
        title:{
            text: "Group Mapping Along Roads"
        },
        legend: {
            show: true,
            position: 'right'
        },
        labels: ["Unmapped", "Mapped Road"],


    }
    const options1: ApexOptions = {
        chart: {
            toolbar: { show: false },
        },
        title:{
            text: "Distribution by Physical Ability"
        },
        legend: {
            show: true,
            position: 'left'
        },
        labels: ["Disabled", "Abled"],


    }
    //    const series2: ,

    const getGroups = () => {
        const data = getRawGroups();
        console.log("🚀 ~ getGroups ~ data:", data)
        setGroups(data)
        const groupGenders = data.map((g:GroupType)=>{
            return {
                female: g.female_count,male:g.male_count
            }
        })
        const genderDistribution = {female: groupGenders.reduce((a, b: any) => a + b.female, 0),male:groupGenders.reduce((a, b: any) => a + b.male, 0)};
        const districts: string[] = data.map((g: GroupType) => g.district);
        const distinctDistricts = [...new Set(districts)];


        const regions: string[] = data.map((g: any) => g.mkoa);
        const distinctRegions = [...new Set(regions)];

        const result = {
            groupCount: data.length,
            genderRatio: (groupGenders.reduce((a, b: any) => a + b.female, 0) / groupGenders.reduce((a, b: any) => a + b.male, 0)).toFixed(2),
            disabled_count: data.reduce((a,g:any)=>a +g.disabled_count,0) ,
            abled_count: genderDistribution.female + genderDistribution.male,
            groupsByGender:genderDistribution,
            districts: distinctDistricts,
            regions: distinctRegions,
            assigned_road_section: data.filter((g:GroupType)=>g.namba_ya_barabara != null && g.namba_ya_barabara !="").length,
            groupsByRegion: distinctRegions.map((d: string) => {
                return {
                    group: data.filter((g: GroupType) => g.mkoa == d).map((g: GroupType) => Number(g.name_of_group)).length
                }
            }).map((d) => d.group),
            membersByDistrict: [{
                name: "Members by District",
                data: distinctDistricts.map((d: string) => {
                    return {
                        number_of_members: data.filter((g: GroupType) => g.district == d).map((g: GroupType) => Number(g.number_of_group_members)).reduce((a: number, b: number) => a + b, 0)
                    }
                }).map((d) => d.number_of_members)
            }],
            groupsByDistrict: [{
                name: "Groups by District",
                data: distinctDistricts.map((d: string) => {
                    return {
                        group: data.filter((g: GroupType) => g.district == d).map((g: GroupType) => Number(g.name_of_group)).length
                    }
                }).map((d) => d.group)
            }]
        }
        console.log("🚀 ~ getGroups ~ result:", result)
        setSummary(result)
    }


    const loadData = async () => {
        setLoading(true)
        getGroups()
        setTimeout(() => { setLoading(false) }, 5000)
    }
    useEffect(() => {
        loadData()
    }, [])
    return (<>
        <div className="w-full flex justify-end items-center  pe-4">
            <div className=" space-x-2 w-4/12 flex justify-end mt-0 items-center text-primary ">
                {/* <MdPerson className="hover:text-accent text-2xl"/> */}
                <p className="text-end py-4">{userData?.email}</p>

            </div>
        </div>
        <main className="w-full flex bg-white min-h-screen">
            <div className="md:w-2/12 flex flex-col items-start text-center justify-center">
                <Sidebar active={0} user={userData} />
            </div>
            {loading ? <Spinner className="spinner-md mt-6" /> :
                <div className="w-100 md:w-9/12 mx-auto space-y-4 mt-2">

                    {summary && <div className="flex items-center flex-wrap md:justify-between justify-center space-x-4 mt-6 mx-auto">
                        <SummaryCard title="Identified Groups" value={summary?.groupCount} bg="accent" color="black-300" />
                        <SummaryCard title="Covered Road Sections" value={`${(100* summary?.assigned_road_section/summary?.groupCount).toFixed(1)}%`} bg="blue" color="white-300" />
                        <SummaryCard title="Female to Male Ratio" value={summary?.genderRatio} bg="accent" color="black-300" />
                        {/* <SummaryCard title="Registered Members" value={1010} bg="blue" color="white-300" /> */}
                    </div>}
                    <div className="w-full flex items-start justify-between flex-wrap space-x-2">
                        <ReactApexChart className="w-full md:w-5/12 border h-120 md:h-fit" type="bar" series={summary?.groupsByDistrict || []} options={options} />
                        <ReactApexChart className="w-full md:w-5/12 border h-120 md:h-fit" type="bar" series={summary?.membersByDistrict || []} options={options_} />
                    </div>
                    <div className="w-full flex items-start justify-between flex-wrap">
                        <div className="w-full flex justify-start items-start mt-4">
                            <ReactApexChart className="w-full md:w-4/12 border me-1 h-48" type="radialBar" options={options4} series={summary?.groupsByRegion || []} width={200} />
                            <ReactApexChart className="w-full md:w-4/12 border me-1 h-48" type="donut" options={options1} series={[summary?.disabled_count,summary?.abled_count]} width={250} />
                            <ReactApexChart className="w-full md:w-4/12 border me-1 h-48" type="radialBar" options={options5} series={[84]} width={200} />
                        </div>
                        <div className="w-full flex justify-start items-start mt-4">
                            <ReactApexChart className="w-full md:w-4/12 border  me-1 h-48" type="donut" options={options2} series={summary?.groupsByRegion || []} height={180} />
                            <ReactApexChart className="w-full md:w-4/12 border  me-1 h-48" type="pie" options={options3} series={summary && summary?.groupsByGender ? [summary?.groupsByGender.female,summary?.groupsByGender.male] : []} width={250} />
                            <ReactApexChart className="w-full md:w-4/12 border  me-1 h-48" type="donut" options={options6} series={[(summary?.groupCount - summary?.assigned_road_section),summary?.assigned_road_section]} height={180} />
                        </div>
                    </div>
                    <p className="text-2xl my-4">Geographic Distribution of Groups</p>
                    <div className="w-full mx-auto h-200 border mt-4" >
                        <ArcGisMap />
                    </div>
                    {/* <SignoutDialog title="Signout" msg="Are you sure you want to signout? Clicking sign out will end your session" show={showDialog} onCancel={()=>setShowDialog(false)}/> */}
                </div>}


        </main>
    </>);

}
export default Dashboard;