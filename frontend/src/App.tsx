import { useState } from "react";
import { ConfigProvider, Layout, Menu, theme } from "antd";
import { BookOutlined, HistoryOutlined } from "@ant-design/icons";
import zhTW from "antd/locale/zh_TW";
import CreatePage from "./pages/CreatePage";
import HistoryPage from "./pages/HistoryPage";

const { Header, Content } = Layout;

function App() {
  const [page, setPage] = useState<"create" | "history">("create");

  return (
    <ConfigProvider locale={zhTW} theme={{ algorithm: theme.defaultAlgorithm }}>
      <Layout style={{ minHeight: "100vh" }}>
        <Header style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: 600,
              marginRight: 32,
              whiteSpace: "nowrap",
            }}
          >
            English Vocab Tool
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[page]}
            onClick={({ key }) => setPage(key as "create" | "history")}
            items={[
              { key: "create", icon: <BookOutlined />, label: "新增單字" },
              { key: "history", icon: <HistoryOutlined />, label: "歷史紀錄" },
            ]}
            style={{ flex: 1 }}
          />
        </Header>
        <Content style={{ background: "#f5f5f5" }}>
          {page === "create" ? <CreatePage /> : <HistoryPage />}
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
