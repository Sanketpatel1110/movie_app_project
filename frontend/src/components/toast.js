import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function toastNotification(msg, id) {
  const notify = (message, id) => toast.success(message, {toastId: id});
  notify(msg, id)
}

export default toastNotification