import TopBanner from "../../../client/components/global/TopBanner";
import { ActiveLink } from "../../../client/configs/navs";

const UsersView = () => {
  return (
    <div>
      <TopBanner links={ActiveLink("Admin")} title='用户管理' />
      <div className='container mx-auto'>
        <h1>草</h1>
      </div>
    </div>
  );
};

export default UsersView;
