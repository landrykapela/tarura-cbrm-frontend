import { ISummaryCard } from "../utils/types"



const SummaryCard = (props: ISummaryCard)=>{

    return(<div className={`w-4/12 h-25 md:w-3/12 cursor-pointer md:flex justify-start items-center shadow-md rounded-md hover:bg-primary bg-accent text-white`}>
        
        <p className="rounded-md md:text-1xl w-3/12 bg-yellow-500 h-100 text-center py-4 px-2 font-bold hover:bg-black">{props.value}</p>
        <p className="text-sm text-center ms-6">{props.title}</p>
    </div>)
}

export default SummaryCard;