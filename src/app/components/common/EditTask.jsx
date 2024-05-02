import { Button, DatePicker, Input, Modal, Select } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const { Option } = Select;

const EditTask = ({ visible, onClose, record }) => {
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

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
    record ? moment(record.deadline) : null
  );

  console.log("Edited Record:", record);

  const handleSave = async () => {
    const confirmation = await Swal.fire({
      title: "Are you sure you want to edit this task?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Edit!",
      cancelButtonText: "No, Cancel",
      reverseButtons: true,
    });

    if (confirmation.isConfirmed) {
      Swal.fire({
        icon: "success",
        title: "Task Edited Successfully!",
        text: `Task "${editedName}" has been updated.`,
        showConfirmButton: false,
        timer: 1500,
      });

      onClose();
    } else if (confirmation.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        icon: "info",
        title: "Edit Cancelled",
        text: "Task editing has been cancelled.",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  useEffect(() => {
    setEditedName(record ? record.name : "");
    setEditedAssignee(record ? record.assignee.join(", ") : "");
    setEditedMember(record ? record.member : "");
    setEditedStatus(record ? record.status : "");
    setEditedPriority(record ? record.priority : "");
    setEditedDeadline(record ? moment(record.deadline) : null);
  }, [record]);

  return (
    <Modal title="Edit Task" visible={visible} onCancel={onClose} footer={null}>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center gap-3 md:gap-5 lg:gap-6">
          <Select
            className="w-1/2"
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
            className="w-1/2"
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
