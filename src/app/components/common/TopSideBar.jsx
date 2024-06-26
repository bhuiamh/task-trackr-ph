
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import AddTask from "./AddTask";
import CommonButton from "./CommonButton";
import InputField from "./InputField";

const TopSideBar = () => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  return (
    <div className="w-full h-16 lg:h-20 border lg:border-2 rounded-lg border-primary flex items-center justify-between gap-3 md:gap-6 lg:gap-10 px-4 md:px-6 lg:px-10">
      <div className="w-32">
        <h1 className="text-xs md:text-sm lg:text-base font-extrabold text-primary block">
          TaskTrackr
        </h1>
      </div>
      <div>
        <CommonButton onClick={() => setEditModalVisible(true)}>
          CREATE <IoMdAdd />
        </CommonButton>
      </div>

      <InputField
        type="text"
        name="search"
        id="search"
        placeholder="Filter and Search"
      />
      <div>
        <CommonButton>
          <IoSettingsOutline />
        </CommonButton>
      </div>

      <AddTask
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
      />
    </div>
  );
};

export default TopSideBar;
