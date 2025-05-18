import { ISummaryCard } from "../utils/types"



const SummaryCard = (props: ISummaryCard)=>{

    return(<div className={`w-full h-25 md:w-4/12 cursor-pointer flex justify-start items-center shadow-md rounded-md hover:bg-primary bg-accent text-white`}>
        
        <p className="rounded-md w-4/12 bg-yellow-500 h-100 text-center py-4 px-1 font-bold hover:bg-black">{props.value}</p>
        <p className="text-sm text-center ms-4 w-8/12">{props.title}</p>
    </div>)
}

export default SummaryCard;