

export default function TableHeader(props: any) {
  const headings: any[] = props.data || [];
  return (<thead className="w-full border bg-slate-100 px-2 text-sm font-bold">
    
    <tr className="flex items-start justify-evenly space-x-2 w-100 bg-green-400 md:hidden">
      {headings.slice(0,4).map((col,idx) => {
        return (<td key={col} className={`uppercase text-sm text-blue-600  ${idx === 0 ? 'w-2/12': 'w-5/12'}`}>{col}</td>)
      })}
    </tr>
    <tr className="hidden md:w-100 md:flex items-start justify-start">
      {headings.map((col,idx) => {
        return (<td key={col} className={`ps-2 uppercase text-green-700 text-start ${idx === 0 ? 'w-1/12': 'w-2/12'}`}>{col}</td>)
      })}
    </tr>
    </thead>)
}