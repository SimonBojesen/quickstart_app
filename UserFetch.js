import jwt_decode from 'jwt-decode';
import { AsyncStorage } from 'react-native';
const URL = "https://simonbojesen.com/jwtbackend";

function handleHttpErrors(res) {
    if (!res.ok) {
        return { status: res.status, fullError: res.json() };
    }
    return res.json();
}

class UserFetch {

    fetchData = async () => {
        const token = await this.getToken();
        console.log("token", token);
        var decoded = jwt_decode(token);
        const options = await this.makeOptions("GET", true); //True add's the token
        return fetch(URL + "/api/info/" + decoded.username, options).then(handleHttpErrors);
    };

    login = async (user, pass) => {
        const options = await this.makeOptions("POST", true, {
            username: user,
            password: pass
        });
        const result = await fetch(URL + "/api/login", options)
            .then(handleHttpErrors);
            console.log("result", result);
        this.setToken(result.token);
        
    };

    setToken = async token => {
        await AsyncStorage.setItem("jwtToken", token);
    };

    getToken = () => {
        return AsyncStorage.getItem("jwtToken");
    };

    loggedIn = () => {
        const loggedIn = this.getToken() != null;
        return loggedIn;
    };

    logout = async () => {
        await AsyncStorage.removeItem("jwtToken");
    };

    async makeOptions(method, addToken, body) {
        var opts = {
            method: method,
            headers: {
                "Content-type": "application/json",
                Accept: "application/json"
            }
        };
        if (addToken && this.loggedIn()) {
            opts.headers["x-access-token"] = await this.getToken();
        }
        if (body) {
            opts.body = JSON.stringify(body);
        }
        return opts;
    }
}
const facade = new UserFetch();
export default facade;