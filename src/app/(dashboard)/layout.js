import Layout from "@/layout/Layout";
// import "@/assets/scss/app.css"
import "../../assets/scss/app.scss"
export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout flex">
      <main className="flex-1 bg-gray-100">
        <Layout>{children}</Layout>
      </main>
    </div>
  );
}
