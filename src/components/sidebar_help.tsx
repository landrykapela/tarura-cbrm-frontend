import { clearSession, generateHelpTopics, getIcon, getMenuItems } from "../utils/utils";
import { IMenuItem } from "../utils/types";
import MenuButton from "./menu_button";
import { Link, useNavigate } from "react-router-dom";
import { LogoImage } from "./image_assets";
import Image from './image'
// import { DialogContext } from "../layout";


const SidebarHelp = (props: any) => {
    const navigate = useNavigate()
    const topics = generateHelpTopics()

    
    return (<div className="hidden md:block md:fixed bottom-0 start-0 bg-slate-100 h-full px-6 w-2/12 border-e-2">
        {props.user ? <>
            <Image src={LogoImage} className="w-6/12 m-2 cursor-pointer"  />
            <nav className="w-full space-y-4 flex flex-col items-start mt-8">
                {topics && topics.map((topic: any) => {
                    return (
                        <Link className="hover:text-accent cursor-pointer"
                            key={topic.id} to={`/help/${topic.title}`} state={{topic:topic}}
                        >{topic.title}</Link>
                    );
                })}
            </nav>
            <div className="fixed bottom-0 flex justify-between items-center">
                <Link to="/" className="hover:text-primary text-accent text-center me-4" onClick={() => {
                    clearSession();
                    navigate(`/signout`)
                }}>Signout </Link>
                <Link to="/help" className="hover:text-primary text-accent text-center me-4" state={{topic:topics[0]}}>Help </Link>
            </div>
        </> : null}
    </div>
    )
}

export default SidebarHelp;