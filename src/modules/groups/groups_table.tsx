
'use client'
import { ChangeEvent, useEffect, useState } from "react";
import { GROUP_HEADINGS } from "../../utils/constants";
import TableHeader from "../../components/table_header";
import { GroupType } from "../../utils/types";
import { Link, useNavigate } from "react-router-dom";
import { MdUpload } from "react-icons/md";


const GroupsTable = (props: any) => {
  const navigate = useNavigate()
  const [data, setData] = useState<GroupType[]>(props.data.data)
  const [filteredData, setFilteredData] = useState<GroupType[]>(props.data.data)

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const keyword = e.currentTarget.value;
    const filter = keyword.length > 0 ? keyword.toLowerCase().trim() : null

    if (filter) {
      const result = props.data.filter((d: GroupType) => d.name?.toLowerCase().includes(filter)
        || d.region?.toLowerCase().includes(filter)
        || d.district?.toLowerCase().includes(filter)
        || d.ward?.toLowerCase().includes(filter)
        || d.village?.toLowerCase().includes(filter)
      )
      setFilteredData(result)
    }
    else setFilteredData(props.data)

  }
  useEffect(() => {
    setData(props.data.data)
    setFilteredData(props.data.data)
  }, [data])
  return (<>
    <div className="md:flex w-full mx-auto justify-between items-center">
      <input type="text" name=" " id="search" onChange={handleFilter} className="form-control w-8/12" placeholder="search groups" />
      {props.isAdmin ? <div className="flex justify-start md:justify-end md:text-end items-center md:w-4/12 "><MdUpload className="text-accent hover:text-primary"/><Link to="/admin/groups/import" className="text-accent hover:text-primary"> Import CSV</Link></div>:null}
    </div>
    <table className="flex-col items-start justify-start w-full text-left p-2 mx-auto border">
      <TableHeader data={GROUP_HEADINGS} />
      <tbody className="w-full text-sm">
        {filteredData.map((row: GroupType, idx: number) => {
          return (
            <tr key={row.id} className="w-100 flex justify-start text-sm border-b border-b-gray-200 py-1 hover:bg-gray-100 cursor-pointer" onClick={() => { navigate(`/admin/groups/view/${row.id}`, { state: { data: row } }) }}>
              <td className={`border-bottom ps-2 py-2 text-start w-2/12 md:w-1/12`}>{idx + 1}
              </td>
              <td className={`border-bottom ps-2 py-2 text-start w-5/12 md:w-2/12`}>{row.name}
              </td>
              <td className={`border-bottom ps-2 py-2 text-start w-5/12 md:w-2/12`}>{row.latitude ? `${row.latitude} , ${row.longitude}`:'Unknown'}
              </td>
              <td className={`md:block border-bottom ps-2 py-2 text-start md:w-2/12`}>{row.village}
              </td>
              <td className={`hidden md:block border-bottom ps-2 py-2 text-start md:w-2/12`}>{`${row.ward}`}
              </td>
              <td className={`hidden md:block border-bottom ps-2 py-2 text-start md:w-2/12`}>{row.district}
              </td>
              <td className={`hidden md:block border-bottom ps-2 py-2 text-start md:w-2/12`}>{row.region}
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
export default GroupsTable;
