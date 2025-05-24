import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { cleanDate, getStoredUserData, getUserSession, isValidDateString } from "../../utils/utils";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import { ApiClient } from "../../utils/apiclient";
import Spinner from "../../components/spinner";
import { MdUploadFile } from "react-icons/md";
import Papa from 'papaparse'
import { PapaParseResult, RoleEnum } from "../../utils/types";
import axios from "axios";
import MembersTablePreview from "./members_table_preview";
import { useNavigate } from "react-router-dom";

const MembersImport = () => {
  const FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const session = getUserSession();
  const userData = getStoredUserData();
  const navigate = useNavigate()
  const apiClient = new ApiClient(session?.accessToken);
  const [membersData, setMembersData] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const [selected, setSelected] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const importMembers = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    const csvfile = e.currentTarget.csvfile.files[0]
    Papa.parse(csvfile, {
      header: true, complete: (result: PapaParseResult) => {
        const clean_data = result.data.map((data: any) => {
          return {
            ...data,
            registrationDate: !isValidDateString(data.registrationDate) ? new Date() : cleanDate(data.registrationDate)
          }
        })
        setMembersData(clean_data);
        setIsError(false)
        setError("")
        setLoading(false)
      }
    })

  }
  const saveImportedGroups = async () => {
    setLoading(true)
    try {
      const res = await apiClient.createMembersBulk({ data: membersData });
      setLoading(false)
      setIsError(false);
      setError(res.data.message)
    }
    catch (error) {
      if (axios.isAxiosError(error)) setError(error.response?.data.message);
      else setError('An error occurred, please try again');
      setLoading(false)
      setIsError(true)
    }
  }
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      // setMembersData({data:[]})
      const csvfile = e.currentTarget.files[0];
      if (csvfile.size > FILE_SIZE) {
        setIsError(true);
        setError("File too large");
        return;
      }
      setIsError(false);
      setError("");
      if (e.currentTarget.value) setSelected(true);
      else setSelected(false)
    }
    else {
      setIsError(true);
      setError("No file selected");
      setSelected(false)
      return
    }


  }
  useEffect(() => {
      if(userData?.role !== RoleEnum.ADMIN) navigate('/admin/members')
  }, [])
  return (<>
    <Header user={session} active={2} />

    <main className="w-full flex bg-white min-h-full">

      <div className="md:w-2/12 flex flex-col items-start text-center justify-center">
        <Sidebar user={session} active={2} />
      </div>

      <div className="md:w-9/12 mx-auto space-y-4 mt-2">
        <p className="text-2xl">Import Groups</p>

        {loading ? <Spinner className="spinner-md" /> :
          <form className="w-full md:w-9/12 mb-8" method="post" onSubmit={importMembers}>
            <div className="flex items-center justify-start border-2 border-gray-400 pe-2 md:w-6/12 rounded-md m-4">
              <input accept="text/csv" type="file" id="csvfile" name="csvfile" className="form-control outline-none border-none" placeholder="Enter new password" onChange={handleFileUpload} />
              <MdUploadFile className="cursor-pointer" />

            </div>
            {isError && error ? <small className="text-red-500">{error}</small> : null}

            {selected ? <div className="flex items-center justify-start md:w-6/12 m-4">
              <button type="submit" className={`md:w-4/12 bg-accent p-2 text-center hover:bg-accentDark`}>Import</button>

            </div> : null}
          </form>}
        {loading ? <Spinner className="spinner-md" /> : (membersData ? <MembersTablePreview data={membersData} onSave={saveImportedGroups} /> :
          <div className="w-full flex justify-center items-center">
            <p className="text-accent-500">Please upload a valid CSV file</p>
          </div>)
        }
      </div>
    </main>
  </>)
}
export default MembersImport;
