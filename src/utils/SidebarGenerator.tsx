import Link from "next/link";
type SidebarItem = {
  label: string;
  path: string;
  icon?: React.ReactNode;
};
export const sidebarGenerator = (items: SidebarItem[], pathname: string) => {
  
  return items?.map((item) => (
    <li
      key={item.label}
      className={
        pathname == item.path ? "activeDashboard" : "inactiveDashboard"
      }
    >
      <Link href={item.path} className="flex justify-start items-center gap-2">
        {item?.icon}
        {item.label}
      </Link>
    </li>
  ));
};
