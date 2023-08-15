import Link from "next/link";
import Navbar from "./Navbar";

const User = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3>Home</h3>
        <Navbar />
      </div>

      <div>
        <Link href="/profile">Profile page</Link>
      </div>
    </div>
  );
};

export default User;
