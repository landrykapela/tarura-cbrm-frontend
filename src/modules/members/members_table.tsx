
'use client'
import React, { useEffect, useState } from "react";
import { ApiClient } from "../../utils/apiclient";
import PageControl from "../../components/page_control";
import SearchBox from "../../components/search_box";
import { MEMBERS_HEADINGS} from "../../utils/constants";
import TableHeader from "../../components/table_header";
import { Member, User } from "../../utils/types";
import { useNavigate } from "react-router-dom";
import { dateFormat } from "../../utils/utils";


const MembersTable = (props: any) => {
 console.log("🚀 ~ MembersTable ~ props:", props.data)
 const navigate = useNavigate()
  return (
    
      <table className="w-full text-left p-2 mx-auto border">
        <TableHeader data={MEMBERS_HEADINGS} />
        <tbody className="w-full text-sm">
          {props.data.map((row:Member,idx:number) => {
            return (
              <tr key={row.id} className="border-b border-b-gray-200 py-8 hover:bg-gray-100 cursor-pointer" onClick={()=>{navigate(`/members/view/${row.id}`,{state:{data:row}})}}>
                 <td className="border-bottom px-1 py-2">{idx + 1}
                 </td>
                <td className="border-bottom px-1 py-2">{row.name}
                </td>
                <td className="border-bottom px-1 py-2">{row.group}
                </td>
                <td className="border-bottom px-1 py-2">{`${row.phone}`}
                </td>
                <td className="border-bottom px-1 py-2">{`${row.gender}`}
                </td>
                <td className="border-bottom px-1 py-2">{row.status}
                </td>
                <td className="border-bottom px-1 py-2">{dateFormat((new Date()).getTime()/1000)}
                </td>
                <td className="border-bottom px-1 py-2">{row.region}
                </td>
                <td className="border-bottom px-1 py-2">{`${row.district}`}
                </td>
                
                
              </tr>
            )
          })}
        </tbody>
      </table>
      )

};
export default MembersTable;
