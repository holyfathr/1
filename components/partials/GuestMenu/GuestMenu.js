import Menu from "components/partials/Menu";
import { useTranslation } from "next-i18next";

const GuestMenu = () => {
  const { t } = useTranslation("header");

  return (
    <Menu>
      <Menu.Link href="/search/">Поиск</Menu.Link>
      <Menu.Link href="/faq/">FAQ</Menu.Link>
      <Menu.Link href="/login/">Войти</Menu.Link>
    </Menu>
  );
};

export default GuestMenu;
