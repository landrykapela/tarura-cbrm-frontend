import { useNavigate, Link } from "react-router-dom"
import { IMenuItem } from "../utils/types"
import { getMenuItems, getIcon, clearSession, generateHelpTopics } from "../utils/utils"
import MenuButton from "./menu_button"

const HelpMenu = (props: any) => {
    const navigate = useNavigate()
        const topics = generateHelpTopics()
        console.log("🚀 ~ HelpMenu ~ topics:", topics)

    return (<div className="block fixed top-12 mt-2 start-0 bg-accent h-full px-2 w-full md:hidden z-50">
        {props.user ? <>
            <nav className="w-full space-y-4 flex flex-col items-start mt-8">
                {topics && topics.map((topic: any) => {
                    return (
                        <span className="hover:text-accent cursor-pointer text-white"
                            key={topic.id} onClick={()=>{navigate(`/help/${topic.title}`,{state:{topic:topic}});props.onNavigate()}} 
                        >{topic.title}</span>
                    );
                })}
            </nav>
            <div className="fixed bottom-0 flex justify-between items-center">
                <Link to="/" className="hover:text-primary text-white text-center me-4" onClick={() => {
                    clearSession();
                    navigate(`/signout`)
                }}>Signout </Link>
                <Link to="/admin/dashboard" className="hover:text-primary text-white text-center me-4">Home </Link>
            </div>
        </> : null}
    </div>
    )
}

export default HelpMenu;