import { UserLogout } from "../utils/serverRequests";
import Cookies from 'js-cookie';

export default function LogOut() {

    function LogOutUser() {
        Cookies.remove('jwt');
        Cookies.remove('sessionid');
        window.location.replace('/login');
    }
    LogOutUser();
};