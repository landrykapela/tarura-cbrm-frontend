'use client';
import { useState, useEffect } from "react";
import { getStoredUserData, clearSession, getQueryString, getUserSession, getGeodata } from "../../utils/utils";
import { ApiClient } from "../../utils/apiclient";
import { IMenuItem } from "../../utils/types";
import SummaryCard from "../../components/summary_card";
import GBRMMap from '../../components/map'
// const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false })
import ReactApexChart from "react-apexcharts";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner";
import Sidebar from "../../components/sidebar";
import { ApexOptions } from "apexcharts";
import groups from "../groups/groups";
import GroupsTable from "../groups/groups_table";

const Reports = (_props: any) => {
    console.log('my location:', window.location.pathname)
    const userData = getUserSession();
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    const groups = getGeodata()
    //   const { showDialog, setShowDialog } = useContext(DialogContext);
    const [user, setUser] = useState<any>(userData)

    const options = {
        chart: {
            id: 'apexchart-example',
            title: {
                text: 'Number of Requests', style: {
                    fontSize: '14px',
                    fontWeight: 'bold',
                    fontFamily: undefined,
                    color: '#263238'
                },

            },
            toolbar: { show: false }

        },

        xaxis: {
            categories: ["Mvomero", "Kilombero", "Pangani", "Korogwe", "Lushoto", "Kongwa", "Rufiji", "Mkuranga"]
        }
    }

    const series = [{
        name: 'Member Registration by Region',
        data: [430, 440, 305, 550, 649, 360, 270, 591].reverse()
    },]

    const options4: ApexOptions = {
        chart: {
            toolbar: { show: false },

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
        labels: ["Dodoma", "Morogoro", "Pwani", "Tanga"],

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
        fill: {
            type: 'gradient'
        },
        legend: {
            show: true,
            position: 'right'
        },
        labels: ["Dodoma", "Morogoro", "Pwani", "Tanga"],


    }
    const options3: ApexOptions = {
        chart: {
            toolbar: { show: false },

        },
        legend: {
            show: true,
            position: 'right'
        },
        labels: ["Male", "Female"],


    }
    const options6: ApexOptions = {
        chart: {
            toolbar: { show: false },

        },
        legend: {
            show: true,
            position: 'right'
        },
        labels: ["Married", "Not Married"],


    }
    const options1: ApexOptions = {
        chart: {
            toolbar: { show: false },

        },
        legend: {
            show: true,
            position: 'right'
        },
        labels: ["Active", "Inactive"],


    }
    //    const series2: ,

    useEffect(() => {
        // loadData()
        // if (userData) getNotifications(userData.id);
        // else {
        //     // const target = `${window.location.pathname}${getQueryString(window.location.href)}`
        //     navigate('/login', { state: { targetPath: target } })
        // }
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
                <Sidebar active={5} user={userData} />
            </div>
            {loading ? <Spinner className="spinner-md mt-6" /> :
                <div className="w-full md:w-9/12 mx-auto space-y-4 mt-2">

                    <div className="flex items-center flex-wrap justify-start md:space-x-1 mt-6 mx-auto">
                        <SummaryCard title="Registered Groups" value={200} bg="accent" color="black-300" />
                        <SummaryCard title="Registered Members" value={1010} bg="blue" color="white-300" />
                        <SummaryCard title="Registered Groups" value={200} bg="accent" color="black-300" />
                        <SummaryCard title="Registered Members" value={1010} bg="blue" color="white-300" />
                    </div>
                    <div className="w-full flex items-start justify-between flex-wrap">
                        <ReactApexChart className="w-full md:w-6/12 border p-2 h-120 md:h-fit" type="line" series={series} options={options} />
                        <ReactApexChart className="w-full md:w-6/12 border p-2 h-120 md:h-fit" type="bar" series={series} options={options} />
                    </div>
                    <div className="w-full flex items-start justify-between flex-wrap">
                        <div className="w-full flex justify-start items-start mt-4">
                            <ReactApexChart className="w-full md:w-4/12 border me-1 h-48" type="radialBar" options={options4} series={[200, 120, 460, 340]} width={200} />
                            <ReactApexChart className="w-full md:w-4/12 border me-1 h-48" type="donut" options={options1} series={[230, 110]} width={250} />
                            <ReactApexChart className="w-full md:w-4/12 border me-1 h-48" type="radialBar" options={options5} series={[65]} width={200} />
                        </div>
                        <div className="w-full flex justify-start items-start mt-4">
                            <ReactApexChart className="w-full md:w-4/12 border  me-1 h-48" type="donut" options={options2} series={[200, 120, 460, 340]} height={180} />
                            <ReactApexChart className="w-full md:w-4/12 border  me-1 h-48" type="pie" options={options3} series={[200, 430]} width={250} />
                            <ReactApexChart className="w-full md:w-4/12 border  me-1 h-48" type="donut" options={options6} series={[198, 360]} height={180} />
                        </div>
                    </div>
                    <p className="text-2xl">Registered Groups</p>
                    <div className="w-full mx-auto h-200 border mt-4">
                        <GroupsTable data={groups} />
                    </div>
                </div>}


        </main>
    </>);

}
export default Reports;