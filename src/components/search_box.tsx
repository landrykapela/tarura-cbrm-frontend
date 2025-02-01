import { ChangeEvent, useState } from "react";

const SearchBox = (props:any)=>{
    const [search,setSearch] = useState<string>('')

    const handleSearch=(event: ChangeEvent<HTMLInputElement>)=>{
        if(event.currentTarget.value && event.currentTarget.value.length > 0 ){
            const keyword = event.currentTarget.value.toLowerCase();
            setSearch(keyword)
            props.onChange(keyword)
        }
    }
    return (<div className="w-full md:w-6/12 flex space-x-2 my-4 items-center justify-end">
        <input onChange={handleSearch} type="text" placeholder="search" defaultValue={search} className="form-control text-mutedText px-4 py-2 border border-gray-400 focus:border-accent focus:ring-accent"/>
       </div>)
}
export default SearchBox;