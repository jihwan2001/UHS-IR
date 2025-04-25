import { UserPermission } from "../../../widgets/userManagement/UserPermission";
import { FormContainer, FormWrapper } from "../styles";

export const UserPermissionPage = () => {
  return (
    <>
      <FormContainer>
        <FormWrapper>
          <UserPermission />
        </FormWrapper>
      </FormContainer>
    </>
  );
};
