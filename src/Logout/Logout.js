import Cookies from 'js-cookie';
import { UserLogout } from '../utils/serverRequests';

export default function LogOut() {

    function LogOutUser() {
        UserLogout()
        Cookies.remove('jwt');
        Cookies.remove('sessionid');
        window.location.replace('/login');
    }
    LogOutUser();
};