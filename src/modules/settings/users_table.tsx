
'use client'
import React, { useState } from "react";
import PageControl from "../../components/page_control";
import { USERS_HEADINGS} from "../../utils/constants";
import TableHeader from "../../components/table_header";
import { IUserData, Member } from "../../utils/types";
import { useNavigate } from "react-router-dom";
import { getRole } from "../../utils/utils";
import UserView from "./user_view";


const UsersTable = (props: any) => {
 const navigate = useNavigate()
  const tableData = props.data;
  const [data, setData] = useState<IUserData[]>(tableData.data)
   const [filteredData, setFilteredData] = useState<IUserData[]>(tableData.data ? tableData.data :[])
   const [currentPage, setCurrentPage] = useState<number>(tableData?.data.currentPage)
   const [hasNextPage, setHasNextPage] = useState<boolean>(tableData?.data.hasNextPage)
   const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(tableData?.data.hasPreviousPage)
   const [totalPages, setTotalPages] = useState<number>(tableData?.data.totalPages)
   const [user,setUser] = useState<IUserData|null>(null)

   const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {   
      const keyword = e.currentTarget.value;
      const filter = keyword.length > 0 ? keyword.toLowerCase().trim() : null
  
      // if (filter) {
      //   const result = data.filter((d: Member) => d.firstName?.toLowerCase().includes(filter)
      //     || d.lastName?.toLowerCase().includes(filter)
      //     || d.phoneNumber?.toLowerCase().includes(filter)  
      // )
      //   setFilteredData(result)
      // }
      // else setFilteredData(data)
    }

    
  return (
    <>
    {user ? <UserView data={user} onClose={()=>{setUser(null); props.isList(true)}} onFeedback={(msg:string,isError:boolean)=>{props.onFeedback(msg,isError)}}/>:<>
    <table className="flex-col items-start justify-start w-full text-left p-2 mx-auto border">
        <TableHeader data={USERS_HEADINGS} />
        <tbody className="w-full text-sm">
          {filteredData.map((row:IUserData,idx:number) => {
            return (
              <tr key={row.id} className="w-100 flex justify-start text-sm border-b border-b-gray-200 py-1 hover:bg-gray-100 cursor-pointer" onClick={()=>{setUser(row); props.isList(false)}}>
              <td className={`border-bottom ps-2 py-2 text-start w-2/12 md:w-1/12`}>{idx + 1}
                 </td>
                <td className={`border-bottom ps-2 py-2 text-start w-5/12 md:w-2/12`}>{`${row.name}`}
                </td>
                <td className={`border-bottom ps-2 py-2 text-start w-5/12 md:w-2/12`}>{`${getRole(row.role)}`}
                </td>
                <td className={`border-bottom ps-2 py-2 text-start w-5/12 md:w-2/12`}>{row.email}
                </td>
                
              </tr>
            )
          })}
        </tbody>
      </table>
       <PageControl onPageSizeChange={()=>{}} hasNext={hasNextPage} hasPrevious={hasPreviousPage} currentPage={currentPage} totalPages={totalPages} onNext={()=>{}} onPrevious={()=>{}}/>
  </>}

    </>)

};
export default UsersTable;
