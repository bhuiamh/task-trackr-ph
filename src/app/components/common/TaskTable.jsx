import {SyncOutlined, CheckCircleOutlined, SearchOutlined } from "@ant-design/icons";

import { Button, Input, Space, Table } from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import EditTask from "./EditTask";

const data = [
  {
    key: "1",
    name: "John Brown",
    assignee: ["John Brown"],
    member: 32,
    status: "active",
    priority: "High",
    deadline: "28 May 2023, 4:00",
  },
  {
    key: "2",
    name: "Joe Black",
    assignee: ["Joe Black"],
    member: 42,
    status: "active",
    priority: "Medium",
    deadline: "28 May 2023, 3:00",
  },
  {
    key: "3",
    name: "Jim Green",
    assignee: ["Jim Green"],
    member: 32,
    status: "active",
    priority: "Low",
    deadline: "28 May 2023, 5:00",
  },
  {
    key: "4",
    name: "Jim Red",
    assignee: ["Jim Red"],
    member: 32,
    status: "active",
    priority: "High",
    deadline: "25 May 2023, 4:00",
  },
  {
    key: "5",
    name: "John Brown",
    assignee: ["John Brown"],
    member: 32,
    status: "active",
    priority: "Medium",
    deadline: "24 May 2023, 4:00",
  },
  {
    key: "6",
    name: "Joe Black",
    assignee: ["Joe Black"],
    member: 42,
    status: "active",
    priority: "Low",
    deadline: "23 May 2023, 4:00",
  },
  {
    key: "7",
    name: "Jim Green",
    assignee: ["Jim Green"],
    member: 32,
    status: "finished",
    priority: "High",
    deadline: "22 May 2023, 4:00",
  },
  {
    key: "8",
    name: "Jim Red",
    assignee: ["Jim Red", "Jim Bed"],
    member: 32,
    status: "active",
    priority: "Low",
    deadline: "21 May 2023, 4:00",
  },
];

const TaskTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedRow, setEditedRow] = useState(null); // Added state for edited row

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = () => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: () => <SearchOutlined style={{ color: "#1677ff" }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      sortDirections: ["descend", "ascend"],
      render: (status) => {
        // Define icons based on status
        const statusIcons = {
          active: <SyncOutlined style={{ color: "blue" }} />,
          finished: <CheckCircleOutlined style={{ color: "green" }} />,
        };

        // Render the corresponding icon based on status
        return statusIcons[status] || status;
      },
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      sorter: (a, b) => {
        const priorityOrder = ["High", "Medium", "Low"]; // Define the priority order

        // Get the index of each item's priority in the priorityOrder array
        const priorityIndexA = priorityOrder.indexOf(a.priority);
        const priorityIndexB = priorityOrder.indexOf(b.priority);

        // Compare the priority indexes to determine the sorting order
        return priorityIndexA - priorityIndexB;
      },
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Assignee",
      dataIndex: "assignee",
      key: "assignee",
      render: (assignee) => (
        <>
          {assignee.map((name, index) => (
            <span key={index}>
              {name}
              {index !== name.length - 1 && ", "}
            </span>
          ))}
        </>
      ),
      ...getColumnSearchProps(["assignee"]),
    },
    {
      title: "Member",
      dataIndex: "member",
      key: "member",
      sorter: (a, b) => a.member - b.member,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "deadline",
      sorter: (a, b) => new Date(a.deadline) - new Date(b.deadline),
      sortDirections: ["ascend", "descend"],
    },
    {
        title: "Action",
        key: "action",
        render: (text, record) => {
          // Conditionally render the "Edit" button based on the status
          if (record.status === "finished") {
            return (
              <Button onClick={() => handleDelete(record)}>Delete</Button>
            );
          } else {
            return (
              <Space size="middle">
                <Button onClick={() => handleEdit(record)}>Edit</Button>
                <Button onClick={() => handleDelete(record)}>Delete</Button>
              </Space>
            );
          }
        },
      },
  ];
  const handleEdit = (record) => {
    setEditedRow(record);
    setEditModalVisible(true);
  };

  const handleDelete = (record) => {
    console.log("Delete", record);
  };

  return (
    <div>
      <Table columns={columns} dataSource={data} />
      <EditTask
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        record={editedRow}
      />
    </div>
  );
};

export default TaskTable;
