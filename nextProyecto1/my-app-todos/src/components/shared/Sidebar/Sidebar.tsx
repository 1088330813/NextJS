"use client";
// import variables from "@/app/styles/variables.module.scss";
import React, { useState, useEffect } from "react";
import variables from "@/app/styles/variables.module.scss";
import {
  ContainerOutlined,
  DesktopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import Link from "next/link";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "1",
    icon: <PieChartOutlined />,
    label: <Link href={"./"}>Home</Link>,
  },
  {
    key: "2",
    icon: <DesktopOutlined />,
    label: <Link href={"./completados"}>Completados Hoy</Link>,
  },
  {
    key: "3",
    icon: <ContainerOutlined />,
    label: <Link href={"./rangoFechas"}>Historico Fechas</Link>,
  },
];

export const Sidebar = () => {
  const [selectedKey, setSelectedKey] = useState<string>("1");
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    console.log("El valor actualizado de selectedKey es:", selectedKey);
  }, [selectedKey]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key !== selectedKey) {
      setSelectedKey(e.key);
      console.log("este es selectedKey:", selectedKey);
      console.log("este es el e.key:", e.key);
    }
    console.log(selectedKey);
  };

  return (
    <div className={variables.sidebarAnt} style={{ width: 256 }}>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 20 }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        onClick={handleMenuClick}
        selectedKeys={[selectedKey]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};
