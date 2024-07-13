import AddOrUpdateEmployee from "../components/AddOrUpdateEmployee";
import EmployeeList from "../components/EmployeeList";

export default function Home() {
  return (
    <div className="w-full h-screen overflow-y-auto bg-stone-300 p-10 text-black">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900">Employees</h1>
        <AddOrUpdateEmployee />
      </header>
      <hr className="my-4 border-slate-700 border-2 rounded-md" />
      <main>
        <EmployeeList />
      </main>
    </div>
  );
}
