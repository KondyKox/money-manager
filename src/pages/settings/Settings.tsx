import AccountPanel from "./panels/AccountPanel";
import DangerPanel from "./panels/DangerPanel";

const Settings = () => {
  return (
    <section className="flex flex-col justify-center items-stretch px-4 gap-8 w-full md:w-1/2 lg:w-1/3">
      <AccountPanel />

      <DangerPanel />
    </section>
  );
};

export default Settings;
