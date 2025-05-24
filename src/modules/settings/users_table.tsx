
'use client'
import { useState } from "react";
import PageControl from "../../components/page_control";
import { USERS_HEADINGS } from "../../utils/constants";
import TableHeader from "../../components/table_header";
import { IUserData } from "../../utils/types";
import { getRole } from "../../utils/utils";
import UserView from "./user_view";


const UsersTable = (props: any) => {
  const tableData = props.data;
  const [filteredData, setFilteredData] = useState<IUserData[]>(tableData.data ? tableData.data : [])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [hasNextPage, setHasNextPage] = useState<boolean>(tableData?.data.hasNextPage)
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(tableData?.data.hasPreviousPage)
  const [user, setUser] = useState<IUserData | null>(null)
  const [pageSize, setPageSize] = useState<number>(20)


  const handlePageSizeChange = (pageSize: number) => {
    setPageSize(pageSize)
  }
  const handleNext = () => {
    setCurrentPage(currentPage + 1)
  }
  const handlePrevious = () => {
    setCurrentPage(currentPage - 1)
  }
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  return (
    <>
      {user ? <UserView data={user} onClose={() => { setUser(null); props.isList(true) }} onFeedback={(msg: string, isError: boolean) => { props.onFeedback(msg, isError) }} /> : <>
        <table className="flex-col items-start justify-start w-11/12 text-left p-2 mx-auto border">
          <TableHeader data={USERS_HEADINGS} />
          <tbody className="w-full text-sm">
            {filteredData.map((row: IUserData, idx: number) => {
              return (
                <tr key={row.id} className="w-100 flex justify-start text-sm border-b border-b-gray-200 py-1 hover:bg-gray-100 cursor-pointer" onClick={() => { setUser(row); props.isList(false) }}>
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
        <PageControl onPageSizeChange={(pageSize: number) => { handlePageSizeChange(pageSize) }} currentPage={currentPage} totalPages={tableData.totalPages} onNext={handleNext} onPrevious={handlePrevious} onPageChange={handlePageChange} pageSize={pageSize} hasNext={hasNextPage} hasPrevious={hasPreviousPage}/>
      </>}

    </>)

};
export default UsersTable;
