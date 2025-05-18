
'use client'
import { ChangeEvent, useEffect, useState } from "react";
import { GROUP_HEADINGS } from "../../utils/constants";
import TableHeader from "../../components/table_header";
import { GroupType } from "../../utils/types";
import { Link, useNavigate } from "react-router-dom";
import PageControl from "../../components/page_control";
import { MdUpload, MdUploadFile } from "react-icons/md";


const GroupsTablePreview = (props: any) => {
  const navigate = useNavigate()
  
  const [data, setData] = useState<GroupType[]>(props.data)

  const saveGroups = ()=>{
    props.onSave()
  }
  useEffect(() => {
  }, [])
  return (<>
    <div className="flex justify-between items-center">
      <p className="text-2xl md:w-8/12">Imported Groups (Preview)</p>
      <button className="btn bg-primary text-white md:w-2/12" onClick={saveGroups}>Save</button>
    </div>
    <table className="flex-col items-start justify-start w-full text-left p-2 mx-auto border">
      <TableHeader data={GROUP_HEADINGS} />
      <tbody className="w-full text-sm">
        {data.map((row: GroupType, idx: number) => {
          return (
            <tr key={row.id} className="w-100 flex justify-start text-sm border-b border-b-gray-200 py-1 hover:bg-gray-100 cursor-pointer" onClick={() => { navigate(`/admin/groups/view/${row.id}`, { state: { data: row } }) }}>
              <td className={`border-bottom ps-2 py-2 text-start w-2/12 md:w-1/12`}>{idx + 1}
              </td>
              <td className={`border-bottom ps-2 py-2 text-start w-5/12 md:w-2/12`}>{row.name}
              </td>
              <td className={`border-bottom ps-2 py-2 text-start w-5/12 md:w-2/12`}>{row.region}
              </td>
              <td className={`md:block border-bottom ps-2 py-2 text-start md:w-2/12`}>{row.district}
              </td>
              <td className={`hidden md:block border-bottom ps-2 py-2 text-start md:w-2/12`}>{`${row.ward}`}
              </td>
              <td className={`hidden md:block border-bottom ps-2 py-2 text-start md:w-2/12`}>{row.village}
              </td>
              <td className={`hidden md:block border-bottom ps-2 py-2 text-start md:w-2/12`}>{row.latitude ? `${row.latitude} , ${row.longitude}`:'Not available'}
              </td>
              <td className={`hidden md:block border-bottom ps-2 py-2 text-start md:w-2/12`}>{row.roadCode}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
    </>)

};
export default GroupsTablePreview;
