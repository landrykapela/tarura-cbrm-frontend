import { useState } from "react"
import { MdClose, MdMenu } from "react-icons/md"
import Topbar from "./topbar"
import HelpMenu from "./help_menu"

const Header = (props:any)=>{
    const [showMenu,setShowMenu] = useState<boolean>(false)
    const handleMenu =()=>{
        setShowMenu(!showMenu)
    }

    return (<div className="z-50 sticky top-0 md:static bg-white mt-0 mt-md-2 w-full flex justify-end items-center pe-4">
        <div className="space-x-2 w-4/12 flex justify-end mt-0 items-center text-primary">
            <p className="hidden md:block text-end py-4">{props.user?.email}</p>
            {showMenu ? <MdClose className="mt-8 text-2xl md:hidden text-accentDark" onClick={handleMenu}/> :<MdMenu className="mt-8 text-2xl md:hidden text-accentDark" onClick={handleMenu}/>}
        </div>
        {showMenu ? (props.active === 5 ? <HelpMenu   active={props.active} user={props.user} onNavigate={handleMenu}/>: <Topbar  active={props.active} user={props.user}/>):null}
    </div>)
}
export default Header