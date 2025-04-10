import { UserLogout } from "../utils/serverRequests";

export default function LogOut() {

    function LogOutUser() {
        UserLogout();
        window.location.replace('/login');
    }
    LogOutUser();
};