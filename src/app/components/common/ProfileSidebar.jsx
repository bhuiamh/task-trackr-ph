import Image from "next/image";
import CommonButton from "./CommonButton";

const ProfileSidebar = () => {
  return (
    <div className="z-50 w-60 lg:w-80 rounded-t-none lg:rounded-t-lg rounded-lg shadow-lg bg-white">
      <div className="flex gap-4 lg:gap-6 items-end mx-auto border-b border-dsPrimary justify-center p-4 bg-slate-300  rounded-t-none lg:rounded-t-lg">
        <Image
          height={200}
          width={200}
          className="h-10 w-10 lg:h-16 lg:w-16 bg-cover border border-dsPrimary rounded-full "
          src="/profile.png"
          alt="Profile Photo"
        />
        <div>
          <h1 className="text-sm lg:text-base font-bold text-dsPrimary">
            Mahmudul Hasan Bhuia
          </h1>
          <h1 className=" text-sm lg:text-base">+8801819831933</h1>
        </div>
      </div>
      <div className="">
        <CommonButton>My Profile</CommonButton>
      </div>
    </div>
  );
};

export default ProfileSidebar;
