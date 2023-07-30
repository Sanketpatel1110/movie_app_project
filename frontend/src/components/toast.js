import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function toastNotification(msg, id, iserror) {
  if(iserror === true) {
    const notify = (message, id) => toast.error(message, {toastId: id});
    notify(msg, id)
  }
  else {
    const notify = (message, id) => toast.success(message, {toastId: id});
    notify(msg, id)

  }
}

export default toastNotification