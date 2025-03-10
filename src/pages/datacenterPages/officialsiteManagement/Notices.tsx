import { useParams } from "react-router-dom";
import { NoticesMain } from "../../../widgets";
import { NoticesAddPage } from "./NoticesAddPage";
import { NoticesDetailPage } from "./NoticesDetailPage";

export const Notices = () => {
  const { id, subId } = useParams<{ id: string; subId?: string }>(); // `subId`는 `add` 경로를 위한 것

  return (
    <>
      {id === "13" && subId === "add" ? <NoticesAddPage /> : <NoticesMain />}
      {/* {subId === "detail" ? <NoticesDetailPage /> : <NoticesMain />}
      {swi} */}
    </>
  );
};
