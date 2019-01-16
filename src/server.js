import axios from "axios";
import { server } from "./constants";

export default ({path = '', data, callback, method = 'post'}) => {
    return axios[method](`${server}${path}`, data)
        .then(response => {
            if (!!callback) {
                callback(response.data);
            } else {
                console.log('Server response:\n', response.data);
                return response.data;
            }
        })
        .catch(error => {
            console.log('%cError', 'color: red');
            console.log(error.response); // TODO! data leak to console
            console.log(error);
            // console.log(error.response.data.message);
        });
}
