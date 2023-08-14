import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const User = () => {
  const { data: session } = useSession();

  return (
    <main>
      <h3>Authorize User Homepage</h3>

      <div>
        <h5>HI {session?.user?.name}</h5>
        <h5>Your email is : {session?.user?.email}</h5>
      </div>

      <button
        onClick={() => signOut()}
        className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
      >
        Log Out
      </button>

      <div>
        <Link href="/profile">Profile page</Link>
      </div>
    </main>
  );
};

export default User;
