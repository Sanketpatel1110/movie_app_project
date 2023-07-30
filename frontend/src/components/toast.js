import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function toastNotification(msg) {
  const notify = message => toast(message);
  notify(msg)
}

export default toastNotification