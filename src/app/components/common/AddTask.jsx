import { Button, DatePicker, Input, Modal, Select } from "antd";
import { useState } from "react";
import Swal from "sweetalert2";

const { Option } = Select;

const AddTask = ({ visible, onClose }) => {
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const [taskName, setTaskName] = useState("");
  const [assignee, setAssignee] = useState("");
  const [member, setMember] = useState(1);
  const [status, setStatus] = useState("active");
  const [priority, setPriority] = useState("Low");
  const [deadline, setDeadline] = useState(null);

  const handleSave = () => {
    const newTask = {
      name: taskName,
      assignee: assignee.split(",").map((item) => item.trim()),
      member,
      status,
      priority,
      deadline: deadline ? deadline.format("YYYY-MM-DD HH:mm") : null,
    };

    if (newTask.name && newTask.assignee.length > 0 && newTask.deadline) {
      Swal.fire({
        title: "Are you sure you want to add this task?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Add!",
        cancelButtonText: "No, Cancel",
        reverseButtons: true,
      });
      onClose();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all the required fields!",
      });
    }
  };

  return (
    <Modal title="Add Task" visible={visible} onCancel={onClose} footer={null}>
      <div className="flex flex-col space-y-4">
        <Select
          defaultValue="active"
          value={status}
          onChange={(value) => setStatus(value)}
          placeholder="Status"
        >
          <Option value="active">Active</Option>
          <Option value="finished">Finished</Option>
        </Select>
        <Input
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Task Name"
        />

        <Select
          showSearch
          mode="multiple"
          placeholder="Select a Assignee"
          optionFilterProp="children"
          filterOption={filterOption}
          options={[
            {
              value: "Mahmudul Hasan Bhuia",
              label: "Mahmudul Hasan Bhuia",
            },
            {
              value: "jhankar mahbub",
              label: "Jhankar Mahbub",
            },
            {
              value: "golam dostogir",
              label: "Golam Dostogir",
            },
            {
              value: "sabbir hossen",
              label: "Sabbir Hossen",
            },
            {
              vlaue: "abdul rehman",
              label: "Abdul Rehman",
            },
          ]}
        />
        <Select
          value={priority}
          onChange={(value) => setPriority(value)}
          placeholder="Priority"
        >
          <Option value="Low">Low</Option>
          <Option value="Medium">Medium</Option>
          <Option value="High">High</Option>
        </Select>
        <DatePicker
          value={deadline}
          onChange={(date) => setDeadline(date)}
          placeholder="Deadline"
          showTime
          format="YYYY-MM-DD HH:mm"
        />
      </div>
      <Button type="primary" onClick={handleSave} style={{ marginTop: "10px" }}>
        Save
      </Button>
    </Modal>
  );
};

export default AddTask;
