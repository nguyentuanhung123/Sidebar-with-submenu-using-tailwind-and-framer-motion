// * react-router packages
import { NavLink, useLocation } from "react-router-dom";

// other packages
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

// react packages
import { useEffect, useState } from "react";

// * react-icons
import { IoIosArrowBack } from "react-icons/io";
import { SlSettings } from "react-icons/sl";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { HiOutlineDatabase } from "react-icons/hi";
import { TbReportAnalytics } from "react-icons/tb";
import { RiBuilding3Line } from "react-icons/ri";
import { MdMenu } from "react-icons/md";


// componens
import SubMenu from "./SubMenu";

const Sidebar = () => {

    let isTablet = useMediaQuery({ query: "(max-width: 768px)" });
    //console.log("istap: ", isTab); // false if desktop > 768px and true if desktop < 768px

    const { pathname } = useLocation();

    //sidebar open state
    const [isOpen, setIsOpen] = useState(isTablet ? false : true);



    const Sidebar_animation = isTablet
        ? //mobile view
        {
            open: {
                x: 0,
                width: "16rem",
                transition: {
                    damping: 40,
                }
            },
            closed: {
                x: -250,
                width: 0,
                transition: {
                    damping: 40,
                    delay: 0.15
                }
            }
        } : {
            //System view
            open: {
                width: "16rem",
                transition: {
                    damping: 40,
                }
            },
            closed: {
                width: "4rem",
                transition: {
                    damping: 40,
                }
            }
        };

    useEffect(() => {
        if (isTablet) {
            //mobile 
            setIsOpen(false);
        } else {
            //Laptop
            setIsOpen(true);
        }
    }, [isTablet]);

    //pathname change -> close sidebar (only mobile view)
    useEffect(() => {
        isTablet && setIsOpen(false);
    }, [pathname])

    const mainMenusList = [
        {
            name: "all apps",
            path: "/",
            icon: AiOutlineAppstore
        },
        {
            name: "authentication",
            path: "/authentication",
            icon: BsPerson
        },
        {
            name: "storage",
            path: "/storage",
            icon: HiOutlineDatabase
        }
    ]

    const subMenusList = [
        {
            name: "build",
            icon: RiBuilding3Line,
            menus: ["auth", "app settings", "storage", "hosting"],
        },
        {
            name: "signup",
            icon: RiBuilding3Line,
        },
        {
            name: "datatable",
            icon: RiBuilding3Line,
        },
        {
            name: "reacttable",
            icon: RiBuilding3Line,
        },
        {
            name: "sortingtable",
            icon: RiBuilding3Line,
        },
        {
            name: "filteringtable",
            icon: RiBuilding3Line,
        },
        {
            name: "paginationtable",
            icon: RiBuilding3Line,
        },
        {
            name: "formatdate",
            icon: RiBuilding3Line,
        },
        {
            name: "testtable",
            icon: RiBuilding3Line,
        },
        {
            name: "todobeginner",
            icon: RiBuilding3Line,
        },
        {
            name: "updatetodo",
            icon: RiBuilding3Line,
        },
        {
            name: "rowselection",
            icon: RiBuilding3Line,
        },
        {
            name: "columnorder",
            icon: RiBuilding3Line,
        },
        {
            name: "columnhiding",
            icon: RiBuilding3Line,
        },
        {
            name: "stickytable",
            icon: RiBuilding3Line,
        },
        {
            name: "analytics",
            icon: TbReportAnalytics,
            menus: ["dashboard", "realtime", "events"],
        },
    ];

    return (
        <>
            <div
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 max-h-screen z-[998] bg-black/50 
                ${isOpen ? "block" : "hidden"}
                ${isTablet ? "inline-block" : "hidden"}`}>
            </div>
            <motion.div
                variants={Sidebar_animation}
                initial={{ x: isTablet ? -250 : 0 }}
                animate={isOpen ? "open" : "closed"}
                className={`bg-white text-gray shadow-xl z-[999] w-[16rem]
                max-w-[16rem] h-screen overflow-hidden
                ${isTablet ? "fixed" : "relative"}`}>

                {/* Logo */}
                <div className="flex items-center gap-2.5 font-medium border-b py-3 border-slate-300 mx-3">
                    <img
                        src="https://img.icons8.com/color/512/firebase.png"
                        width={45}
                        alt=""
                    />
                    <span className="text-xl whitespace-pre">Fireball</span>
                    {/* whitespace-pre : Giữ nguyên định dạng và xuống dòng khi hết câu */}
                </div>

                {/* Menus */}
                <div className="flex flex-col h-full">
                    {/* first */}
                    <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1 font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100 h-[70%] md:h-[68%]">
                        {
                            mainMenusList?.map((menu, index) => {
                                return (
                                    <li key={menu.name}>
                                        <NavLink to={menu.path} className="link">
                                            <menu.icon size={23} className="min-w-max" />
                                            {/* max-content : nội dung trong thẻ này sẽ được đẩy lên trong 1 dòng -> chữ bị thừa phải kéo màn hình mới thấy */}
                                            <p className="capitalize flex-1">{menu.name}</p>
                                        </NavLink>
                                    </li>
                                )
                            })
                        }

                        {/* with submenu */}
                        {/* mobile view most show submenu */}
                        {
                            (isOpen || isTablet) && (
                                <div className="border-y py-5 border-slate-300">
                                    <small>
                                        Product categories
                                    </small>
                                    {
                                        subMenusList?.map(menu => {
                                            return (
                                                <div key={menu.name} className="flex flex-col gap-1">
                                                    <SubMenu data={menu} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        }

                        <li>
                            <NavLink to="/settings" className="link">
                                <SlSettings size={23} className="min-w-max" />
                                {/* max-content : nội dung trong thẻ này sẽ được đẩy lên trong 1 dòng -> chữ bị thừa phải kéo màn hình mới thấy */}
                                Settings
                            </NavLink>
                        </li>
                    </ul>
                    {/* second */}
                    <div className="">
                        {
                            isOpen && <div className="flex-1 text-sm z-50 max-h-48 my-auto whitespace-pre w-full font-medium">
                                <div className="flex items-center justify-between border-y border-slate-300 p-4">
                                    <div>
                                        <p>Spark</p>
                                        <small>No-cost $0/month</small>
                                    </div>
                                    <p className="text-teal-500 py-500 py-1.5 px-3 text-xs bg-teal-50 rounded-xl">
                                        Upgrade
                                    </p>
                                </div>
                            </div>
                        }
                    </div>
                </div>

                {/* controller button */}
                <motion.div
                    animate={
                        isOpen ? {
                            x: 0,
                            y: 0,
                            rotate: 0
                        } : {
                            x: -10,
                            y: -200,
                            rotate: 180
                        }
                    }
                    transition={{
                        duration: 0,
                    }}
                    onClick={() => setIsOpen(!isOpen)} className="absolute w-fit h-fit z-50 right-2 bottom-5 cursor-pointer md:block hidden">
                    <IoIosArrowBack size={25} />
                </motion.div>
            </motion.div>
            <div className={`m-3 ${isTablet ? "inline-block" : "hidden"}`} onClick={() => setIsOpen(true)}>
                <MdMenu size={25} />
            </div>
        </>
    )
};

export default Sidebar;