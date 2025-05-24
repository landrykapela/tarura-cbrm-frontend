
'use client'
import React, { useState } from "react";
import { MEMBERS_HEADINGS} from "../../utils/constants";
import TableHeader from "../../components/table_header";
import { Member } from "../../utils/types";
import { MdUpload } from "react-icons/md";
import { Link } from "react-router-dom";


const MembersTable = (props: any) => {
  const tableData = Array.isArray(props.data) ? props.data : props.data.data
  const [data, setData] = useState<Member[]>(tableData)
   const [filteredData, setFilteredData] = useState<Member[]>(tableData)

   const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {   
      const keyword = e.currentTarget.value;
      const filter = keyword.length > 0 ? keyword.toLowerCase().trim() : null
  
      if (filter) {
        const result = data.filter((d: Member) => d.firstName?.toLowerCase().includes(filter)
          || d.lastName?.toLowerCase().includes(filter)
          || d.phoneNumber?.toLowerCase().includes(filter)   
          || d.role?.toLocaleLowerCase().includes(filter)
          || d.gender?.toLocaleLowerCase().includes(filter)
          || d.district?.toLocaleLowerCase().includes(filter)
      )
        setFilteredData(result)
      }
      else setFilteredData(data)
    }
  
  return (
    <>
    {props.embedded ? null : <div className="md:flex w-full mx-auto justify-between items-center">
          <input type="text" name="" id="search" onChange={handleFilter} className="form-control w-8/12" placeholder="search members" />
          {props.isAdmin ? <div className="flex justify-start md:justify-end md:text-end items-center md:w-4/12 "><MdUpload className="text-accent hover:text-primary"/><Link to="/admin/members/import" className="text-accent hover:text-primary"> Import CSV</Link></div>:null}
        </div>}
    <table className="flex-col items-start justify-start w-full text-left p-2 mx-auto border">
        <TableHeader data={MEMBERS_HEADINGS} />
        <tbody className="w-full text-sm">
          {filteredData.map((row:Member,idx:number) => {
            return (
              <tr key={row.id} className="w-100 flex justify-start text-sm border-b border-b-gray-200 py-1 hover:bg-gray-100 cursor-pointer">
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
      
  </>
      )

};
export default MembersTable;
