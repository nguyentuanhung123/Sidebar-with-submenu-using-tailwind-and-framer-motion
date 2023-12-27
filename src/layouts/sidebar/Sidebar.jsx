import { motion } from "framer-motion";
const Sidebar = () => {
    const Sidebar_animation = {
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
    }
    return (
        <>
            <motion.div
                variants={Sidebar_animation}
                animate={"open"}
                className="bg-white text-gray shadow-xl z-[999]
                max-w-[16rem] h-screen overflow-hidden md:relative fixed ">

            </motion.div>
        </>
    )
};

export default Sidebar;