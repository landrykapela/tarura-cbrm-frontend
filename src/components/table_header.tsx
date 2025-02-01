

export default function TableHeader(props: any) {
  const headings: any[] = props.data || [];
  return (<thead className="w-full border bg-slate-100 px-2 text-sm font-bold">
    <tr className="w-full flex-auto items-start justify-evenly space-x-2">
      {headings.map((col) => {
        return (<td key={col} className="uppercase px-2">{col}</td>)
      })}
    </tr></thead>)
}