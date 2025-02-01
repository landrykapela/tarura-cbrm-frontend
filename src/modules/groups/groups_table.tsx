
'use client'
import { ChangeEvent, useEffect, useState } from "react";
import { GROUP_HEADINGS } from "../../utils/constants";
import TableHeader from "../../components/table_header";
import { GroupType } from "../../utils/types";
import { useNavigate } from "react-router-dom";


const GroupsTable = (props: any) => {
  const navigate = useNavigate()
  const [data, setData] = useState<GroupType[]>([])
  const [filteredData, setFilteredData] = useState<GroupType[]>([])

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const keyword = e.currentTarget.value;
    const filter = keyword.length > 0 ? keyword.toLowerCase().trim() : null

    if (filter) {
      const result = props.data.filter((d: GroupType) => d.name_of_group?.toLowerCase().includes(filter)
        || d.mkoa?.toLowerCase().includes(filter)
        || d.district?.toLowerCase().includes(filter)
        || d.kata?.toLowerCase().includes(filter)
        || d.kijiji?.toLowerCase().includes(filter)
      )
      setFilteredData(result)
    }
    else setFilteredData(props.data)

  }
  useEffect(() => {
    setData(props.data)
    setFilteredData(props.data)
  }, [data])
  return (<>
    <div className="w-full mx-auto">
      <input type="text" name="search" id="search" onChange={handleFilter} className="form-control" placeholder="search groups" />
    </div>
    <table className="w-full text-left p-2 mx-auto border">
      <TableHeader data={GROUP_HEADINGS} />
      <tbody className="w-full text-sm">
        {filteredData.map((row: GroupType, idx: number) => {
          return (
            <tr key={row.id} className="border-b border-b-gray-200 py-8 hover:bg-gray-100 cursor-pointer" onClick={() => { navigate(`/admin/groups/view/${row.id}`, { state: { data: row } }) }}>
              <td className="border-bottom px-1 py-2">{idx + 1}
              </td>
              <td className="border-bottom px-1 py-2">{row.name_of_group}
              </td>
              <td className="border-bottom px-1 py-2">{row.mkoa}
              </td>
              <td className="border-bottom px-1 py-2">{row.district}
              </td>
              <td className="border-bottom px-1 py-2">{`${row.kata}`}
              </td>
              <td className="border-bottom px-1 py-2">{row.kijiji}
              </td>
              <td className="border-bottom px-1 py-2">{`${row.latitude},${row.longitude}`}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </>)

};
export default GroupsTable;
