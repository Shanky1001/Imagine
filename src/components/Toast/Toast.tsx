import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Toast = () => {
	return (
		<ToastContainer
			position="top-right"
			autoClose={4000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme="colored"
			rtl={false}
		/>
	);
};

export default Toast;
