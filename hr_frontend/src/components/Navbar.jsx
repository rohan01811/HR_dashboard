import { Bell, Menu, Search, User } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar({ onMenu }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("hrUser"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("hrUser");
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
        
        {/* MENU BUTTON */}
        <button
          type="button"
          onClick={onMenu}
          className="inline-flex rounded-xl p-2 text-slate-300 hover:bg-slate-800 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* SEARCH */}
        <div className="relative hidden max-w-xl flex-1 sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="search"
            placeholder="Search jobs, candidates, interviews…"
            className="w-full rounded-2xl border border-slate-700 bg-slate-900 py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/25"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                toast.success("Search is frontend-only");
              }
            }}
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="ml-auto flex items-center gap-2">
          
          {/* NOTIFICATION */}
          <button
            onClick={() => toast("No new notifications", { icon: "🔔" })}
            className="relative rounded-2xl p-2.5 text-slate-300 hover:bg-slate-800"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-slate-950" />
          </button>

          {/* PROFILE BUTTON */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900 px-2 py-1.5 hover:border-indigo-500/40"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-slate-600 to-slate-800">
                <User className="h-4 w-4 text-slate-200" />
              </span>

              <span className="hidden text-left text-sm font-medium text-slate-200 sm:block">
                {user ? user.name : "Guest"}
                <span className="block text-xs font-normal text-slate-500">
                  {user ? "HR Panel" : "Not Logged In"}
                </span>
              </span>
            </button>

            {/* DROPDOWN */}
            {open && (
              <div className="absolute right-0 mt-2 w-44 rounded-xl bg-slate-900 border border-slate-700 shadow-lg">
                
                {!user ? (
                  <>
                    <button
                      onClick={() => navigate("/login")}
                      className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded-t-xl"
                    >
                      Login
                    </button>

                    <button
                      onClick={() => navigate("/signup")}
                      className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded-b-xl"
                    >
                      Signup
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => navigate("/home")}
                      className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
                    >
                      Dashboard
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-800 rounded-b-xl"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE SEARCH */}
      <div className="border-t border-slate-800 px-4 pb-3 sm:hidden sm:px-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="search"
            placeholder="Search…"
            className="w-full rounded-2xl border border-slate-700 bg-slate-900 py-2 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/25"
          />
        </div>
      </div>
    </header>
  );
}