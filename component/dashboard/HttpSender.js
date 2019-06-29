import axios from "axios";
const defaultHeaders = {
	"Content-Type": "application/json"
};
var instance = axios.create({
	baseURL: "https://ext-qamobile1-aws1.freecharge.in/",
	timeout: 2000
});
const sendPost = (props) => {
	const headers = {
		...defaultHeaders,
		...props.headers
	};
	instance
		.post(props.url, props.body, {
			headers: headers
		})
		.then(res => {
		    console.log(res);
//			handleResponse(res);
		})
		;
};

const sendGet = (props, handleResponse) => {
	const headers = {
		...defaultHeaders,
		...props.headers
	};
	instance.get(props.url, {
		headers: headers
	}).then(res => {
		handleResponse(res);
	});
};
export default sendPost;


