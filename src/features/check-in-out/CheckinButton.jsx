import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

function CheckinButton({ bookingId }) {
  const navigate = useNavigate();
  return (
    <Button
      size="small"
      variation="primary"
      onClick={() => navigate(`/checkin/${bookingId}`)}
    >
      Check in
    </Button>
  );
}

export default CheckinButton;
