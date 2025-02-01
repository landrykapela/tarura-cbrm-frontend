import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const PageControl = (props:any)=>{
const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
   // alert(e.currentTarget.value)
    props.onPageSizeChange(e.currentTarget.value)
}
    return (<div className="flex justify-between my-4">
    <div className="w-6/12 text-left">
        <span>
            Show
        <select id="pageSize" onChange={(e)=>handleChange(e)} className="mx-1" defaultValue={props.pageSize}>
            <option value={10}>10</option>
            <option  value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
        </select>
        per page
        </span>
    </div>
    <div  className="flex items-center justify-end w-6/12 text-right">
        {props.hasPrevious ? <span className="material-icons" onClick={props.onPrevious}><MdChevronLeft className="cursor-pointer bg-primaryLight hover:bg-primary" /></span>:null}
        <span className="mx-3">Page {props.currentPage} of {props.totalPages}</span>
        {props.hasNext ? <span className="material-icons" onClick={props.onNext}><MdChevronRight className="cursor-pointer bg-primaryLight hover:bg-primary"/></span>:null}
    </div>
    </div>)
}
export default PageControl;