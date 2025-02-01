import { clearSession, getIcon, getMenuItems } from "../utils/utils";
import { IMenuItem } from "../utils/types";
import MenuButton from "./menu_button";
import { Link, useNavigate } from "react-router-dom";
import { LogoImage } from "./image_assets";
import Image from './image'
// import { DialogContext } from "../layout";


const Sidebar = (props: any) => {
    const navigate = useNavigate()
    const menuItems = getMenuItems()
    // const { showDialog, setShowDialog } = useContext(DialogContext);


    const handleMenuButtonClick = (id: number) => {
        const selectedMenuItem = menuItems.find((menuItem: IMenuItem) => menuItem.id == id)
        const path = selectedMenuItem?.text.toLowerCase()
        navigate(`/admin/${path}`)
    }

    return (<div className="hidden md:block md:fixed bottom-0 start-0 bg-slate-100 h-full px-2 w-2/12 border-e-2">
        {props.user ? <>
            <Image src={LogoImage} className="w-6/12 m-2" />
            <nav className="w-full space-y-4 flex flex-col mt-8">
                {menuItems && menuItems.map((menuItem: IMenuItem) => {
                    let newIcon = {
                        id: menuItem.id,
                        text: menuItem.text,
                        icon: getIcon(menuItem.icon),
                    }
                    return newIcon;
                }).map((menuItem: IMenuItem) => {
                    return (
                        <MenuButton
                            key={menuItem.id}
                            id={menuItem.id}
                            icon={menuItem.icon}
                            text={menuItem.text}
                            isActive={props.active}
                            clicked={menuItem.clicked}
                            onButtonClick={(id: number) => {
                                handleMenuButtonClick(id);
                            }}
                        />
                    );
                })}
            </nav>
            <div className="fixed bottom-0 flex justify-between items-center">
                <Link to="/" className="hover:text-primary text-accent text-center me-4" onClick={() => {
                    clearSession();
                    navigate(`/signout`)
                }}>Signout </Link>
                <Link to="/help" className="hover:text-primary text-accent text-center me-4">Help </Link>
            </div>
        </> : null}
    </div>
    )
}

export default Sidebar;