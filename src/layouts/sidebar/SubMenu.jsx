import { useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";

const SubMenu = ({ data }) => {

    const { pathname } = useLocation();
    //console.log("Pathname : ", pathname); // /analytics/realtime

    const [subMenuOpen, setSubMenuOpen] = useState(false);

    return (
        <>
            <li
                className={`link ${pathname.includes(data.name) && "active"}`}
                onClick={() => setSubMenuOpen(!subMenuOpen)}
            >
                {/* Dynamic icons */}
                <data.icon size={23} className="min-w-max" />

                {data.menus ? <p className="capitalize flex-1">{data.name}</p> : <NavLink to={`/${data.name}`} className="capitalize flex-1">{data.name}</NavLink>}
                {data.menus ? <IoIosArrowDown className={`${subMenuOpen && 'rotate-180'} duration-200`} /> : null}
            </li>
            <motion.ul
                animate={
                    subMenuOpen ? {
                        height: 'fit-content'
                    } : {
                        height: 0
                    }
                }
                className="flex flex-col pl-14 text-[0.8rem] font-normal overflow-hidden h-0">
                {
                    data?.menus?.map((menu) => {
                        return (
                            <li key={menu}>
                                {/* /build/auth */}
                                <NavLink
                                    to={`/${data.name}/${menu}`}
                                    className="link !bg-transparent capitalize">
                                    {menu}
                                </NavLink>
                            </li>
                        )
                    })
                }
            </motion.ul>
        </>
    )
}

export default SubMenu;