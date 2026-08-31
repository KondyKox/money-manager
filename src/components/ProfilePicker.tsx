import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import ProfileIcon from "./ui/ProfileIcon";
import type { Profile } from "../types/Profile";
import { getProfiles } from "../utils/getProfiles";
import { ChartColumn, Palette } from "lucide-react";
import ColorPicker from "./modal/colorPicker-modal";
import type { Color } from "../types/Color";
import CategoryOverviewChart from "./ui/CategoryOverviewChart";
import CollapsablePanel from "./ui/CollapsablePanel";

const ProfilePicker = ({
  setSelectedProfileId,
  onChangeColor,
}: {
  setSelectedProfileId: Dispatch<SetStateAction<string | null>>;
  onChangeColor: (newColor: Color) => void;
}) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toISOString().slice(0, 7),
  );

  const availableMonths = Array.from(
    new Set(
      profiles.flatMap((p) => [
        ...p.expenses.map((e) => e.date.slice(0, 7)),
        ...p.incomes.map((i) => i.date.slice(0, 7)),
      ]),
    ),
  )
    .sort()
    .reverse();

  useEffect(() => {
    const loadProfiles = async () => {
      const data = await getProfiles();
      setProfiles(data ?? []);
      setIsLoading(false);
    };
    loadProfiles();
  }, []);

  if (isLoading) {
    return <div className="text-center p-6">Ładowanie...</div>;
  }

  return (
    <>
      <div className="text-center flex justify-center items-stretch flex-col w-full px-4 py-8 md:py-12 md:w-2/3 lg:w-1/2">
        <h1 className="text-5xl font-bold">Siema mordo!</h1>

        <div className="mt-5">
          <h3 className="italic text-xl pb-2">Wybierz swój profil</h3>
          <div className="border-t-2 py-4 flex justify-center items-stretch gap-2">
            {profiles.map((profile) => (
              <ProfileIcon
                key={profile.id}
                profile={profile}
                onClick={() => setSelectedProfileId(profile.id)}
              />
            ))}
          </div>
          <div className="mt-4 flex justify-center items-center">
            <button
              className="btn-secondary border-2 flex justify-center items-center gap-2 group"
              onClick={() => setIsModalOpen(true)}
            >
              <Palette
                size={24}
                className="iconBtn group-hover:text-pink-400"
              />
              Zmiana koloru
            </button>
          </div>
        </div>

        <div className="mt-8">
          <CollapsablePanel
            header={"Statystyki"}
            icon=<ChartColumn />
            colorClass="bg-white/10 text-current border-2"
          >
            <div className="flex justify-center items-center mb-4">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="select"
              >
                {availableMonths.length === 0 ? (
                  <option value="">
                    {new Date().toLocaleDateString("pl-PL", {
                      month: "long",
                      year: "numeric",
                    })}
                  </option>
                ) : (
                  availableMonths.map((month) => (
                    <option key={month} value={month}>
                      {new Date(month + "-01").toLocaleDateString("pl-PL", {
                        month: "long",
                        year: "numeric",
                      })}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div className="flex flex-col gap-8">
              <CategoryOverviewChart
                profiles={profiles}
                kind="expenses"
                title="Wydatki wg kategorii"
                selectedMonth={selectedMonth}
              />
              <CategoryOverviewChart
                profiles={profiles}
                kind="incomes"
                title="Przychody wg kategorii"
                selectedMonth={selectedMonth}
              />
            </div>
          </CollapsablePanel>
        </div>
      </div>

      {isModalOpen && (
        <ColorPicker
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onChangeColor={onChangeColor}
        />
      )}
    </>
  );
};

export default ProfilePicker;
