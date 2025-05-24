
'use client'
import { useEffect, useState } from "react";
import { MEMBERS_HEADINGS } from "../../utils/constants";
import TableHeader from "../../components/table_header";
import { Member } from "../../utils/types";

const MembersTablePreview = (props: any) => {
 
  const [data, setData] = useState<Member[]>(props.data)

  const saveMembers = ()=>{
    props.onSave()
  }
  useEffect(() => {
  }, [])
  return (<>
    <div className="flex-col justify-center md:flex md:justify-between items-center mx-2">
      <p className="text-2xl md:w-8/12 text-center">Imported Members (Preview)</p>
      <button className="btn bg-primary text-white md:w-2/12 w-10/12 mx-auto " onClick={saveMembers}>Save</button>
    </div>
    <table className="flex-col items-start justify-start w-full text-left p-2 mx-auto border">
      <TableHeader data={MEMBERS_HEADINGS} />
      <tbody className="w-full text-sm">
        {data.map((row: Member, idx: number) => {
          return (
            <tr key={row.id} className="w-100 flex justify-start text-sm border-b border-b-gray-200 py-1 hover:bg-gray-100 cursor-pointer">
              <td className={`border-bottom ps-2 py-2 text-start w-2/12 md:w-1/12`}>{idx + 1}
                 </td>
                <td className={`border-bottom ps-2 py-2 text-start w-5/12 md:w-2/12`}>{`${row.firstName} ${row.lastName}`}
                </td>
                <td className={`border-bottom ps-2 py-2 text-start w-5/12 md:w-2/12`}>{row.group_name}
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
    </>)

};
export default MembersTablePreview;
