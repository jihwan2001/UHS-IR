import { createGlobalStyle } from "styled-components";
import "pretendard/dist/web/static/pretendard.css";
import { AutoLogoutManager } from "./features/auth/AutoLogoutManager";
import { RouterMain } from "./RouterMain";
import { useRecoilValue } from "recoil";
import { authState } from "./authAtom";
import { useAuthCheck } from "./features/auth/hooks/useAuthCheck";
import { Loading } from "./loading";

const GlobalStlye = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
*{
  box-sizing: border-box;
}
body{
  /* font-family:'Source Sans Pro', sans-serif; */
  font-family: 'Pretendard', sans-serif;
  /* width: 1200px; 고정된 너비 설정 */
  margin: 0 auto; /* 가운데 정렬 */
  overflow-x: hidden; /* 가로 스크롤 방지 */
  /* height:1024px; */
}
a{
  text-decoration:none;
  color:inherit;
}
`;

function App() {
  useAuthCheck(); // 앱 로드 시 로그인 상태 확인
  const { isAuthenticated, authLoading } = useRecoilValue(authState);

  if (authLoading) return <Loading />; // ✅ 로딩 중이면 스피너만 보여줌

  return (
    <>
      <GlobalStlye />
      {isAuthenticated && <AutoLogoutManager />}
      <RouterMain />
    </>
  );
}

export default App;
