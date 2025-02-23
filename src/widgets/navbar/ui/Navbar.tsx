import { Container, NavList } from "../../styles";
import { Logo } from "../../../shared/ui/Logo";
import { DropdownMenu, LoginButton } from "../../../features";
import { GotoAdminpage } from "../../../features/navbars/GotoAdminpage";

export const Navbar = () => {
  return (
    <Container>
      <Logo />
      <NavList>
        <DropdownMenu
          title="센터 소개"
          items={[{ label: "IR 센터 개요", link: "/ir-overview" }]}
        />
        <DropdownMenu
          title="대학 통계"
          items={[
            { label: "대학 통계 연보", link: "/stats-yearbook" },
            { label: "분석 보고서", link: "/analysis-reports" },
          ]}
        />
        <DropdownMenu
          title="커뮤니티"
          items={[
            { label: "공지사항", link: "/announcement" },
            { label: "문의", link: "/inquiry" },
          ]}
        />
        <GotoAdminpage />
      </NavList>
      <LoginButton />
    </Container>
  );
};
