import TopBanner from "../../../client/components/global/TopBanner";
import useSWR from "swr";
import { ActiveLink } from "../../../client/configs/navs";

const QuestionView = () => {
    return (
      <div>
        <TopBanner links={ActiveLink("Admin")} title='题库管理' />
      </div>
    );
  };
  
  export default QuestionView;