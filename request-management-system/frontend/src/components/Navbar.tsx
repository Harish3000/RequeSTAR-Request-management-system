import React, { useState } from "react";
import { Menu, Dropdown } from "antd";
import {
  DownOutlined,
  DashboardOutlined,
  MailOutlined,
  MessageOutlined,
  BarChartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

const Navbar: React.FC = () => {
  const [selected, setSelected] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = ({ key }: { key: string }) => {
    setSelected(key);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="Help">Help</Menu.Item>
      <Menu.Item key="Settings">Settings</Menu.Item>
      <Menu.Item key="FAQ">FAQ</Menu.Item>
    </Menu>
  );

  const navItems = [
    {
      key: "Dashboard",
      label: "Dashboard",
      icon: <DashboardOutlined />,
      path: "/",
    },
    {
      key: "Requests",
      label: "Requests",
      icon: <MailOutlined />,
      path: "/requests",
    },
    {
      key: "Feedbacks",
      label: "Feedbacks",
      icon: <MessageOutlined />,
      path: "/feedbacks",
    },
    {
      key: "Reports",
      label: "Reports",
      icon: <BarChartOutlined />,
      path: "/reports",
    },
    {
      key: "Settings",
      label: "Settings",
      icon: <SettingOutlined />,
      dropdown: true,
    },
  ];

  return (
    <nav className="bg-[#830823] text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Dashboard</div>

        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            ☰
          </button>
        </div>

        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li
                key={item.key}
                className={`cursor-pointer flex items-center ${
                  selected === item.key ? "bg-white text-black p-1 rounded" : ""
                }`}
              >
                {item.dropdown ? (
                  <Dropdown overlay={menu} trigger={["click"]}>
                    <span className="flex items-center">
                      {item.icon}
                      <span className="ml-2">{item.label}</span>
                      <DownOutlined className="ml-1" />
                    </span>
                  </Dropdown>
                ) : (
                  <NavLink
                    to={item.path!}
                    className={({ isActive }) =>
                      `flex items-center ${
                        isActive ? "bg-white text-black p-1 rounded" : ""
                      }`
                    }
                    onClick={() => setSelected(item.key)}
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden lg:flex">
          <UserButton />
        </div>
        {/* Mobile Navigation */}
        {showMenu && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-[#830823] text-white p-4 z-10">
            <ul className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <li
                  key={item.key}
                  className={`cursor-pointer ${
                    selected === item.key
                      ? "bg-white text-black p-1 rounded"
                      : ""
                  }`}
                >
                  {item.dropdown ? (
                    <Dropdown overlay={menu} trigger={["click"]}>
                      <span className="flex items-center">
                        {item.icon}
                        <span className="ml-2">{item.label}</span>
                        <DownOutlined className="ml-1" />
                      </span>
                    </Dropdown>
                  ) : (
                    <NavLink
                      to={item.path!}
                      className={({ isActive }) =>
                        `flex items-center ${
                          isActive ? "bg-white text-black p-1 rounded" : ""
                        }`
                      }
                      onClick={() => {
                        setSelected(item.key);
                        setShowMenu(false);
                      }}
                    >
                      {item.icon}
                      <span className="ml-2">{item.label}</span>
                    </NavLink>
                  )}
                </li>
              ))}
              <li>
                <UserButton />
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
