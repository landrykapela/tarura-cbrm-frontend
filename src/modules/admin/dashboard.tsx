'use client';
import { useState, useEffect } from "react";
import { getUserSession } from "../../utils/utils";
import { IReportSummary } from "../../utils/types";
import SummaryCard from "../../components/summary_card";
import ReactApexChart from "react-apexcharts";
import Spinner from "../../components/spinner";
import Sidebar from "../../components/sidebar";
import { ApexOptions } from "apexcharts";
import { MdFileDownload } from "react-icons/md";
import Header from "../../components/header";
import { ApiClient } from "../../utils/apiclient";


const Dashboard = (_props: any) => {
    const userData = getUserSession();
    const apiClient = new ApiClient(userData?.accessToken);
    const [loading, setLoading] = useState<boolean>(false)
    const [summary, setSummary] = useState<IReportSummary>()
    const [groupBarChartSeries,setGroupBarChartSeries] = useState<any>([{
        data: []
    }])
    const [memberBarChartSeries,setMemberBarChartSeries] = useState<any>([{
        data: []
    }])

    const options = {
        chart: {
            id: 'apexchart-example',

            toolbar: { show: false }
        },
        title: {
            text: 'Registered Groups by District',
        },
        xaxis: {
            categories: summary && summary?.groupsByDistrict ? summary?.groupsByDistrict.map((g) => g.district) : []
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
            categories: summary && summary?.membersByDistrict ? summary?.membersByDistrict.map((g) => g.district) : []
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
        title: {
            text: "Road Code Coverage"
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
        title: {
            text: "Distribution by Gender"
        },
        legend: {
            show: true,
            position: 'right'
        },
        labels: ["Female", "Male"],


    }
    const options6: ApexOptions = {
        chart: {
            toolbar: { show: false },
        },
        title: {
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
        title: {
            text: "Distribution by Physical Ability"
        },
        legend: {
            show: true,
            position: 'left'
        },
        labels: ["Disabled", "Abled"],


    }
   
    const getGroupReports = async () => {
        const report = await apiClient.getGroupReports()
        const summary: IReportSummary = report.data.data;
        setSummary(summary);
        setGroupBarChartSeries([{
            name: "Groups",
            data: summary?.groupsByDistrict.map((g) => g.district_count) || []
        }])
        setMemberBarChartSeries([{
            name: "Members",
            data: summary?.membersByDistrict.map((g) => g.district_count) || []
        }])
    }

    const loadData = async () => {
        setLoading(true)
        await getGroupReports()
        setLoading(false)
    }
    useEffect(() => {
        loadData()
    }, [])

    return (<>
        <Header user={userData} active={0} />
        <main className="w-full flex bg-white min-h-screen justify-center items-center">

            <div className="md:w-2/12 flex flex-col items-start text-center justify-center">
                <Sidebar active={0} user={userData} />
            </div>
            {loading ? <Spinner className="spinner-xl" />:
                <div className="w-full md:w-9/12 mx-auto space-y-4 mt-2">

                    {summary && <div className="w-10/12 mx-auto flex-col space-y-4 items-center justify-start mt-6 md:hidden">

                        <SummaryCard title="Covered Road Sections" value={`${(100 * summary?.groupsWithRoadCode / summary?.totalGroups).toFixed(1)}%`} bg="blue" color="white-300" />
                        <SummaryCard title="Female to Male Ratio" value={summary?.femaleMaleRatio} bg="accent" color="black-300" />
                        <SummaryCard title="Identified Groups" value={summary?.totalGroups} bg="accent" color="black-300" />

                    </div>}
                    {summary && <div className="hidden md:flex items-center justify-start space-x-2">

                        <SummaryCard title="Covered Road Sections" value={`${(100 * summary?.groupsWithRoadCode / summary?.totalGroups).toFixed(1)}%`} bg="blue" color="white-300" />
                        <SummaryCard title="Female to Male Ratio" value={summary?.femaleMaleRatio} bg="accent" color="black-300" />
                        <SummaryCard title="Identified Groups" value={summary?.totalGroups} bg="accent" color="black-300" />

                    </div>}
                    <div className="w-full flex items-start justify-between flex-wrap space-x-2">
                        <ReactApexChart className="w-full md:w-5/12 border" type="bar" series={groupBarChartSeries} options={options} />
                        <ReactApexChart className="w-full md:w-5/12 border h-full md:h-fit" type="bar" series={memberBarChartSeries} options={options_} />
                    </div>
                    <div className="w-full md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 pb-6">
                        <ReactApexChart className="w-full border h-48 mx-auto mt-2" type="radialBar" options={options4} series={summary?.groupsByRegion.map((g)=>g.region_count) || []} width={200} />
                        <ReactApexChart className="w-full border h-48 mx-auto mt-2" type="donut" options={options1} series={[summary?.disabled!, summary?.abled!]} width={250} />
                        <ReactApexChart className="w-full border h-48 mx-auto mt-2" type="radialBar" options={options5} series={[Number((100 * summary?.groupsWithRoadCode! / summary?.totalGroups!).toFixed(1))]} width={200} />
                       
                        <ReactApexChart className="w-full border h-48 mx-auto mt-2" type="donut" options={options2} series={summary?.groupsByRegion.map((g)=>g.region_count) || []} height={180} />
                        <ReactApexChart className="w-full border h-48 mx-auto mt-2" type="pie" options={options3} series={summary && summary?.males && summary?.females ? [summary?.females, summary?.males] : []} width={250} />
                        <ReactApexChart className="w-full border h-48 mx-auto mt-2" type="donut" options={options6} series={[(summary?.totalGroups! - summary?.groupsWithRoadCode!), summary?.groupsWithRoadCode!]} height={180} />
                        
                    </div>
                    <h1 className="text-2xl my-8 pt-8">Download Data Maps</h1>
                        <a className="flex justify-start items-center" download href={`/tarura_data.zip`}><span className="mx-6 text-accent cursor-pointer items-center justify-between">Download</span> <MdFileDownload className="text-accent cursor-pointer"/></a> 
                        
                </div>}


        </main>
    </>);

}
export default Dashboard; 
