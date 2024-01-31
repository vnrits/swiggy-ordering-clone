import {
    Divider,
    Flex,
    IconButton,
    Image,
    Menu,
    MenuButton,
    Text,
    useTheme,
    useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { PiMagicWand } from "react-icons/pi";
import { PiStethoscopeFill } from "react-icons/pi";
import { BiLogOut, BiArrowBack, BiLineChart, BiCheckShield } from "react-icons/bi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BsBriefcase, BsChatSquareHeart } from "react-icons/bs";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { SidebarMainItems } from "../constants/SidebarItems";
import { magic } from "../utils/magic";
import { UserContext } from "../utils/userContext";
import Cookies from "js-cookie";
// import Logo from "../assets/Logo.png";

const iconComponentsMenuItems = {
    MdOutlineSpaceDashboard,
    PiStethoscopeFill,
    BsBriefcase,
    PiMagicWand,
    BiLineChart,
    BsChatSquareHeart,
    BiCheckShield
}

const Sidebar = () => {
    const toast = useToast()
    const [navSize, setNavSize] = useState("large");
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useContext(UserContext);

    const handleLogoutBtn = () => {
        magic.user.logout().then(() => {
            toast({
                title: "Logged out successfully",
                variant: "left-accent",
                position: "top",
                isClosable: true,
                duration: 2000,
                status: "error",
            });

            setUser({ user: null })
            Cookies.remove("token")
            Cookies.remove("admin")
            navigate("/")
        })
    }

    return (
        <Flex
            pos="sticky"
            p={4}
            h="100vh"
            w={navSize === "small" ? "5rem" : "17rem"}
            flexDir="column"
            justifyContent="space-between"
            // bgGradient="linear(to-b, #3ce2ad6e, #0078aa78)"
            bg="#330000"
            transition={navSize === "small" ? "none" : "all 0.2s ease-in"}
        >

            <Flex flexDir="column" alignItems="center">
                <Flex flexDir="row" alignItems="center" as="nav" w="100%">
                    <Flex alignItems="center" h={12}>
                        {navSize === "small" ? (
                            <Image src="./Logo.png" alt="Dermify.AI logo" />
                        ) : (
                            <Flex alignItems="center" gap="1rem" width="100%" >
                                <Image src="./Logo.png" alt="Dermify.AI logo" w="30%" />
                                <Text fontSize="1.5rem" fontWeight="bold" color="#fff" w="70%">TastyHub</Text>
                            </Flex>
                        )}
                    </Flex>

                    <IconButton
                        transition={navSize === "small" ? "none" : "all 0.2s ease-in"}
                        transform={
                            navSize === "small"
                                ? "translateX(2.7rem)"
                                : "translateX(12.7rem)"
                        }
                        pos="absolute"
                        background="#f2f2f4"
                        borderRadius="20px"
                        mt={5}
                        _hover={{ background: "#c8c8c8" }}
                        icon={
                            navSize === "small" ? <IoIosArrowForward /> : <IoIosArrowBack />
                        }
                        onClick={() => {
                            navSize === "small" ? setNavSize("large") : setNavSize("small");
                        }}
                    />
                </Flex>

                {/* ------------------  Menu Items  ------------------- */}
                <Flex
                    flexDir="column"
                    alignItems="flex-start"
                    mt={30}
                    w={navSize === "small" ? "100%" : "13rem"}
                >
                    {SidebarMainItems.map((item, index) => {
                        const IconComponent = iconComponentsMenuItems[item.icon];
                        const isActive = location.pathname === item.path

                        return (
                            <NavLink
                                to={item?.path}
                                style={{
                                    width: "100%",
                                    backgroundColor: `${isActive ? "#fff" : "transparent"}`,
                                    borderRadius: "10px",
                                }}
                                key={index}
                            >
                                <Flex alignItems={navSize === "small" ? "center" : "flex-start"} borderRadius="20px">

                                    <Menu placement="right">
                                        <Text
                                            padding="0.4rem 1rem"
                                            borderRadius="10px"
                                            _hover={{
                                                textDecor: "none",
                                                backgroundColor: "#fff",
                                                color: "#333",
                                            }}
                                            w={navSize === "large" && "100%"}
                                            shadow={`${isActive ? "sm" : "transparent"}`}
                                            color={`${isActive ? "#333" : "#fff"}`}
                                        >
                                            <MenuButton>
                                                <Flex align="center">
                                                    <IconComponent
                                                        style={{
                                                            fontSize: "1.4rem",
                                                        }} />
                                                    <Text
                                                        fontSize="14px"
                                                        ml={5}
                                                        display={navSize === "small" ? "none" : "flex"}
                                                    >
                                                        {item?.title}
                                                    </Text>
                                                </Flex>
                                            </MenuButton>
                                        </Text>

                                    </Menu>

                                </Flex>

                            </NavLink>
                        )
                    })}
                </Flex>
                {/* ------------------  Menu Items  ------------------- */}
            </Flex>

            <Flex
                flexDir="column"
                alignItems="flex-start"
                mt={30}
                w={navSize === "small" ? "100%" : "13rem"}
            >
                <Divider display={navSize === "small" ? "none" : "flex"} mb={4} />

                <NavLink
                    to="/"
                    style={{
                        width: "100%",
                        borderRadius: "10px"
                    }}
                >
                    <Flex alignItems={navSize === "small" ? "center" : "flex-start"} color="#fff">
                        <Menu placement="right">
                            <Text
                                padding="0.4rem 1rem"
                                borderRadius="10px"
                                _hover={{
                                    textDecor: "none",
                                    backgroundColor: "#fff",
                                    shadow: "sm",
                                    color: "#333"
                                }}
                                w={navSize === "large" && "100%"}
                            >
                                <MenuButton>
                                    <Flex align="center">
                                        <BiArrowBack fontSize="1.4rem" />
                                        <Text
                                            fontSize="14px"
                                            ml={5}
                                            display={navSize === "small" ? "none" : "flex"}
                                        >
                                            Home
                                        </Text>
                                    </Flex>
                                </MenuButton>
                            </Text>
                        </Menu>
                    </Flex>
                </NavLink>
                <button
                    onClick={() => handleLogoutBtn()}
                    style={{
                        width: "100%",
                        textAlign: "left",
                    }}
                >
                    <Flex alignItems={navSize === "small" ? "center" : "flex-start"} color="#fff">
                        <Menu placement="right">
                            <Text
                                padding="0.4rem 1rem"
                                borderRadius="10px"
                                _hover={{
                                    textDecor: "none",
                                    backgroundColor: "#fff",
                                    shadow: "sm",
                                    color: "#333"
                                }}
                                w={navSize === "large" && "100%"}
                            >
                                <MenuButton>
                                    <Flex align="center" >
                                        <BiLogOut fontSize="1.4rem" />
                                        <Text
                                            fontSize="14px"
                                            ml={5}
                                            display={navSize === "small" ? "none" : "flex"}
                                        >
                                            Logout
                                        </Text>
                                    </Flex>
                                </MenuButton>
                            </Text>
                        </Menu>
                    </Flex>
                </button>
            </Flex>



        </Flex>
    )
}

export default Sidebar
