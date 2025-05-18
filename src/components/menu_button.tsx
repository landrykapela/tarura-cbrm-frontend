

export default function MenuButton(props: any) {
    const active = props.isActive === props.id ? "bg-accent text-white":""
    const handleClick = ()=>{
        props.onButtonClick(props.id)
    }
    return (
        <button
            id={props.id}
            className={
                `flex space-x-2 items-center justify-start uppercase text-sm lg:text-md text-start px-3 py-2 text-gray-900 cursor:pointer hover:bg-accent ${active}`
            }
            onClick={handleClick}
        ><props.icon className='me-4 hidden lg:block'/>  {props.text}
        </button>
    );
}