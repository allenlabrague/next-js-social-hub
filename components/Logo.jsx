import Image from "next/image";

export const Logo = ({ theme }) => {
  const logoPath =
    theme === "dark" ? "/white-smile-logo.png" : "/smile-logo.png";
  const altText = "smile-logo";

  return <Image src={logoPath} width={50} height={50} alt={altText} />;
};

export const GithubLogo = ({ theme }) => {
  const logoPath =
    theme === "dark" ? "/github-mark-white.svg" : "/github-mark.svg";
  const altText = "github-logo";

  return <Image src={logoPath} width={25} height={25} alt={altText} />;
};
