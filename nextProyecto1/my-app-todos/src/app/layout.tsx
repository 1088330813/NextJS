"use client";
import React from "react";
import { Flex, Layout } from "antd";
import { Sidebar } from "../components/shared/Sidebar";
import "./globals.css";

const { Header, Footer, Sider, Content } = Layout;

const primaryColor = "#244186";
const secondaryColor = "#131524";

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: primaryColor,
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 1500,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: secondaryColor,
};

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "100%",

  color: "#fff",
  backgroundColor: primaryColor,
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: primaryColor,
};

const layoutStyle = {
  borderRadius: 10,
  overflow: "hidden",
  width: "calc(100% - 8px)",
  maxWidth: "calc(100% - 8px)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Flex gap="middle" wrap>
          <Layout style={layoutStyle}>
            <Header style={headerStyle}>
              <h1>Gestiona Tus Tareas Diarias</h1>
            </Header>
            <Layout>
              <Sider width="20%" style={siderStyle}>
                <Sidebar />
              </Sider>
              <Content style={contentStyle}>{children}</Content>
            </Layout>
            <Footer style={footerStyle}>
              Todos los Derechos Reservados a @JorgitoElCurioso
            </Footer>
          </Layout>
        </Flex>
      </body>
    </html>
  );
}
