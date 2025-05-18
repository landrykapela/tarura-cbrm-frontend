import { clearSession, getIcon, getMenuItems } from "../utils/utils";
import { IMenuItem } from "../utils/types";
import MenuButton from "./menu_button";
import { Link, useNavigate } from "react-router-dom";
// import { DialogContext } from "../layout";


const Topbar = (props: any) => {
    const navigate = useNavigate()
    const menuItems = getMenuItems()

    const handleMenuButtonClick = (id: number) => {
        const selectedMenuItem = menuItems.find((menuItem: IMenuItem) => menuItem.id === id)
        const path = selectedMenuItem?.text.toLowerCase()
        navigate(`/admin/${path}`)
    }

    return (<div className="block fixed top-12 mt-2 start-0 bg-accent h-full px-2 w-full md:hidden z-50">
        {props.user ? <>
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
            <div className="fixed bottom-0 flex justify-between items-center p-6">
                <Link to="/" className="hover:text-primary text-white text-center me-4" onClick={() => {
                    clearSession();
                    navigate(`/signout`)
                }}>Signout </Link>
                <Link to="/help" className="hover:text-primary text-white text-center me-4">Help </Link>
            </div>
        </> : null}
    </div>
    )
}

export default Topbar;