import { Button, Input, Modal, Select, DatePicker } from "antd";
import { useState } from "react";

const { Option } = Select;

const EditTask = ({ visible, onClose, record }) => {
  const [editedName, setEditedName] = useState(record ? record.name : "");
  const [editedAssignee, setEditedAssignee] = useState(
    record ? record.assignee.join(", ") : ""
  );
  const [editedMember, setEditedMember] = useState(record ? record.member : "");
  const [editedStatus, setEditedStatus] = useState(record ? record.status : "");
  const [editedPriority, setEditedPriority] = useState(
    record ? record.priority : ""
  );
  const [editedDeadline, setEditedDeadline] = useState(
    record ? record.deadline : null
  );

  console.log("Edited Record:", record);
  const handleSave = () => {
    console.log("Edited Task Data:", {
      name: editedName,
      assignee: editedAssignee.split(",").map((item) => item.trim()),
      member: editedMember,
      status: editedStatus,
      priority: editedPriority,
      deadline: editedDeadline,
    });

    onClose();
  };

  return (
    <Modal
      title="Edit Task"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <div className="flex flex-col space-y-4">
        <div className="flex items-center gap-3 md:gap-5 lg:gap-6">
          <Select className="w-1/2"
            defaultValue="active"
            value={editedStatus}
            onChange={(value) => setEditedStatus(value)}
            placeholder="Status"
          >
            <Option value="active">Active</Option>
            <Option value="finished">Finished</Option>
          </Select>
          <Input
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            placeholder="Name"
          />
        </div>
        {/* Input field for Assignee */}
        <Input
          value={editedAssignee}
          onChange={(e) => setEditedAssignee(e.target.value)}
          placeholder="Assignee"
        />
        <div className="flex items-center gap-3 md:gap-5 lg:gap-6">
          {/* Input field for Member */}
          <Input
            type="number"
            value={editedMember}
            onChange={(e) => setEditedMember(e.target.value)}
            placeholder="Member"
            min={1}
            max={10}
          />
          {/* Input field for Priority */}
          <Select
            value={editedPriority}
            onChange={(value) => setEditedPriority(value)}
            placeholder="Priority"
          >
            <Option value="Low">Low</Option>
            <Option value="Medium">Medium</Option>
            <Option value="High">High</Option>
          </Select>
        </div>
        {/* Input field for Deadline */}
        <DatePicker
          value={editedDeadline ? moment(editedDeadline) : null}
          onChange={(date) => setEditedDeadline(date)}
          placeholder="Deadline"
          showTime
          format="YYYY-MM-DD HH:mm"
        />
      </div>
      {/* Save button */}
      <Button type="primary" onClick={handleSave} style={{ marginTop: "10px" }}>
        Save
      </Button>
    </Modal>
  );
};

export default EditTask;
