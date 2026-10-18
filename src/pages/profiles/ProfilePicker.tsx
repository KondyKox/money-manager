import { useEffect, useState } from "react";
import ProfileIcon from "../../components/ui/ProfileIcon";
import type { Profile } from "../../types/Profile";
import { getProfiles } from "../../services/profiles/getProfiles";
import { ChartColumn } from "lucide-react";
import CategoryOverviewChart from "./charts/CategoryOverviewChart";
import CollapsablePanel from "../../components/ui/CollapsablePanel";
import { useNavigate } from "react-router-dom";
import Skeleton from "../../components/ui/Skeleton";
import SavingsOverviewChart from "./charts/SavingsOverviewChart";
import CreateProfileModal from "./modals/CreateProfileModal";
import { MAX_PROFILES } from "../../constants/maxProfiles";
import { useProfile } from "../../hooks/useProfile";
import { useToast } from "../../hooks/useToast";

const ProfilePicker = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toISOString().slice(0, 7),
  );
  const navigate = useNavigate();
  const { selectProfile } = useProfile();
  const { showToast } = useToast();

  const canAddProfile = profiles.length < MAX_PROFILES;

  const handleProfilesSelect = (profileId: string) => {
    selectProfile(profileId);
    navigate("/dashboard");
  };

  const createNewProfile = (newProfile: Profile) => {
    setProfiles((prev) => [...prev, newProfile]);
    setIsModalOpen(false);
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
      try {
        const data = await getProfiles();
        setProfiles(data ?? []);
      } catch (error) {
        console.error("Error loading profiles:", error);
        showToast(
          error instanceof Error ? error.message : "Błąd pobierania profili",
          "error",
        );
      } finally {
        setIsLoading(false);
      }
    };
    loadProfiles();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center flex justify-center items-stretch flex-col w-full px-4 py-8 md:py-12 md:w-2/3 lg:w-1/2">
        <div className="mt-5">
          <Skeleton className="h-6 w-40 mx-auto mb-4" />
          <div className="border-t-2 py-4 grid grid-cols-2 gap-2">
            <Skeleton className="h-16 rounded-2xl" />
            <Skeleton className="h-16 rounded-2xl" />
            <Skeleton className="h-16 rounded-2xl col-span-2 justify-self-center w-[calc(50%-0.25rem)]" />
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
      <section className="text-center flex justify-center items-stretch flex-col w-full px-4 py-8 md:py-12 md:w-2/3 lg:w-1/2">
        <div className="mt-5">
          <h3 className="italic text-3xl pb-4">Wybierz swój profil</h3>
          <div className="border-t-2 py-4 grid grid-cols-2 gap-2">
            {profiles.map((profile) => (
              <ProfileIcon
                key={profile.id}
                profile={profile}
                onClick={() => handleProfilesSelect(profile.id)}
              />
            ))}
            {canAddProfile && (
              <ProfileIcon onClick={() => setIsModalOpen(true)} />
            )}
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

            <div className="flex flex-col gap-8 pb-4">
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
              <SavingsOverviewChart
                profiles={profiles}
                title="Oszczędności w czasie"
              />
            </div>
          </CollapsablePanel>
        </div>
      </section>

      {canAddProfile && isModalOpen && (
        <CreateProfileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={createNewProfile}
        />
      )}
    </>
  );
};

export default ProfilePicker;
