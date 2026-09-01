import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import ProfileIcon from "../components/ui/ProfileIcon";
import type { Profile } from "../types/Profile";
import { getProfiles } from "../utils/getProfiles";
import { ChartColumn } from "lucide-react";
import CategoryOverviewChart from "../components/ui/CategoryOverviewChart";
import CollapsablePanel from "../components/ui/CollapsablePanel";
import { useNavigate } from "react-router-dom";
import Skeleton from "../components/ui/Skeleton";

const ProfilePicker = ({
  setSelectedProfileId,
}: {
  setSelectedProfileId: Dispatch<SetStateAction<string | null>>;
}) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toISOString().slice(0, 7),
  );
  const navigate = useNavigate();

  const handleProfilesSelect = (profileId: string) => {
    setSelectedProfileId(profileId);
    navigate("/dashboard");
  };

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
    return (
      <div className="text-center flex justify-center items-stretch flex-col w-full px-4 py-8 md:py-12 md:w-2/3 lg:w-1/2">
        <div className="mt5">
          <Skeleton className="h-6 w-40 mx-auto mb-4" />
          <div className="border-t-2 py-4 flex justify-center items-stretch gap-2">
            <Skeleton className="h-16 w-16 rounded-full" />
            <Skeleton className="h-16 w-16 rounded-full" />
            <Skeleton className="h-16 w-16 rounded-full" />
          </div>
        </div>
        <div className="mt-8">
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="text-center flex justify-center items-stretch flex-col w-full px-4 py-8 md:py-12 md:w-2/3 lg:w-1/2">
        <div className="mt-5">
          <h3 className="italic text-3xl pb-4">Wybierz swój profil</h3>
          <div className="border-t-2 py-4 flex justify-center items-stretch gap-2">
            {profiles.map((profile) => (
              <ProfileIcon
                key={profile.id}
                profile={profile}
                onClick={() => handleProfilesSelect(profile.id)}
              />
            ))}
          </div>
        </div>

        <div className="mt-8">
          <CollapsablePanel
            header={"Statystyki"}
            icon=<ChartColumn />
            colorClass="bg-white/10 text-current"
          >
            <div className="flex justify-center items-center mb-4 pb-4 border-b-2">
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
    </>
  );
};

export default ProfilePicker;
