
'use client'
import React, { useState } from "react";
import PageControl from "../../components/page_control";
import { MEMBERS_HEADINGS} from "../../utils/constants";
import TableHeader from "../../components/table_header";
import { Member } from "../../utils/types";
import { useNavigate } from "react-router-dom";


const MembersTable = (props: any) => {
 const navigate = useNavigate()
  const tableData = Array.isArray(props.data) ? props.data : props.data.data
  const [data, setData] = useState<Member[]>(tableData)
   const [filteredData, setFilteredData] = useState<Member[]>(tableData)
   const [currentPage, setCurrentPage] = useState<number>(props.embedded ? 1: props.data.currentPage)
   const [hasNextPage, setHasNextPage] = useState<boolean>(props.embedded ? false: props.data.hasNextPage)
   const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(props.embedded ? false: props.data.hasPreviousPage)
   const [totalPages, setTotalPages] = useState<number>(props.embedded ? 1: props.data.totalPages)

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
    {props.embedded ? null : <div className="w-11/12 mx-auto">
      <input type="text" name="search" id="search" onChange={handleFilter} className="form-control" placeholder="search groups" />
    </div>}
    <table className="flex-col items-start justify-start w-full text-left p-2 mx-auto border">
        <TableHeader data={MEMBERS_HEADINGS} />
        <tbody className="w-full text-sm">
          {filteredData.map((row:Member,idx:number) => {
            return (
              <tr key={row.id} className="w-100 flex justify-start text-sm border-b border-b-gray-200 py-1 hover:bg-gray-100 cursor-pointer" onClick={() => { navigate(`/admin/groups/view/${row.id}`, { state: { data: row } }) }}>
              <td className={`border-bottom ps-2 py-2 text-start w-2/12 md:w-1/12`}>{idx + 1}
                 </td>
                <td className={`border-bottom ps-2 py-2 text-start w-5/12 md:w-2/12`}>{`${row.firstName} ${row.lastName}`}
                </td>
                <td className={`border-bottom ps-2 py-2 text-start w-5/12 md:w-2/12`}>{row.group?.name}
                </td>
                <td className={`border-bottom ps-2 py-2 text-start w-5/12 md:w-2/12`}>{`${row.phoneNumber}`}
                </td>
                <td className={`border-bottom ps-2 py-2 text-start w-5/12 md:w-2/12 hidden md:inline`}>{`${row.gender}`}
                </td>
                <td className={`border-bottom ps-2 py-2 text-start w-5/12 md:w-2/12 hidden md:inline`}>{row.role}
                </td>
                <td className={`border-bottom ps-2 py-2 text-start w-5/12 md:w-2/12 hidden md:inline`}>{row.region}
                </td>
                <td className={`border-bottom ps-2 py-2 text-start w-5/12 md:w-2/12 hidden md:inline`}>{`${row.district}`}
                </td>
                <td className={`border-bottom ps-2 py-2 text-start w-5/12 md:w-2/12 hidden md:inline`}>{row.ward}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {props.embedded ? null : <PageControl onPageSizeChange={()=>{}} hasNext={hasNextPage} hasPrevious={hasPreviousPage} currentPage={currentPage} totalPages={totalPages} onNext={()=>{}} onPrevious={()=>{}}/>}
  </>
      )

};
export default MembersTable;
