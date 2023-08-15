export const NavLinks = [
  {
    href: "/",
    key: "home",
    text: "Home",
    image: "/house.svg",
    alt: "house-icon",
  },
  {
    href: "/",
    key: "profile",
    text: "Profile",
    image: "/profile.svg",
    alt: "profile-icon",
  },
  {
    href: "/settings",
    key: "settings",
    text: "Settings",
    image: "/settings.svg",
    alt: "settings-icon",
  },
  {
    href: "/",
    key: "create-post",
    text: "Create Post",
    image: "/create-post.svg",
    alt: "create-post-icon",
  },
];

export const variants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirections: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirections: 1,
    },
  },
};

export const itemVariants = {
  closed: {
    opacity: 0,
    x: 0,
  },
  open: {
    opacity: 1,
    x: 1,
  },
};
