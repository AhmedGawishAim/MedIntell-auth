import Layout from "@/layout/Layout";

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout flex">
      <aside className="w-[250px] bg-gray-900 text-white">Sidebar</aside>
      <main className="flex-1 bg-gray-100">

        {/* <Layout> */}
        {children}

        {/* </Layout> */}
        </main>
    </div>
  );
}
