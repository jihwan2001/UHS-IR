import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles?: string[]; // 예: ["ADMIN", "IR_MANAGER"]
}

export const ProtectedRoute = ({
  children,
  allowedRoles = [],
}: ProtectedRouteProps) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const userRole = userData.role;

  if (!userRole) {
    alert("로그인이 필요합니다.");
    return <Navigate to="/loginPage" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        ❌ 접근 권한이 없습니다.
      </div>
    );
  }

  return children;
};
