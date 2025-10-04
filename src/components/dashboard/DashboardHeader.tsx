interface DashboardHeaderProps {
  userName?: string;
  userTitle?: string;
  userCompany?: string;
  userLocation?: string;
}

export default function DashboardHeader({
  userName = "Alberto",
  userTitle = "HGV Class1 - E/D",
  userCompany = "Niolax Group",
  userLocation = "CA",
}: DashboardHeaderProps) {
  const date = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year:"numeric"
  });

  return (
    <div className="flex items-center gap-4 mb-6 md:flex-row flex-col">
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-foreground">
          Good Morning {userName}!
        </h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
          <span>{userTitle}</span>
          <span className="text-muted-foreground">•</span>
          <span>{userCompany}</span>
          <span className="text-muted-foreground">•</span>
          <span>{userLocation}</span>
        </div>
      </div>
      <div className="text-right text-sm text-muted-foreground">
        <div className="text-foreground">{date}</div>
        <div className="flex items-center gap-4 mt-1">
          <span className="text-foreground">29°</span>
          <span className="text-muted-foreground">H:30° L:13°</span>
        </div>
      </div>
    </div>
  );
}
