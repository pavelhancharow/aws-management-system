import FadeLoader from "react-spinners/FadeLoader";
import { globalColors } from '../../../styles';

interface ISpinner {
  isLoading: boolean;
}

const Spinner = ({ isLoading }: ISpinner) => {
  return (
    <FadeLoader
      color={globalColors.olympicBlue}
      loading={isLoading}
    />
  );
};

export default Spinner;
