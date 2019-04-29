import jwt_decode from 'jwt-decode';
import { AsyncStorage } from 'react-native';
const URL = "https://simonbojesen.com/jwtbackend";

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() });
        
        //return { status: res.status, fullError: res.json() };
    }
    return res.json();
}

class UserFetch {

    fetchData = async () => {
        var token = await this.getToken();
        var decoded = jwt_decode(token);
        const options = await this.makeOptions("GET", true); //True add's the token
        console.log("options", options);
        return fetch(URL + "/api/info/" + decoded.username, options).then(handleHttpErrors).catch(
            error => alert(JSON.stringify(error))
        );
    }

    login = (user, pass) => {
        const options = this.makeOptions("POST", true, {
            username: user,
            password: pass
        });
        return fetch(URL + "/api/login", options)
            .then(handleHttpErrors)
            .then(res => {
                console.log("result", res);
                this.setToken(res.token);
            }).catch(
                error => alert(error)
            );
    };

    setToken = token => {
        AsyncStorage.setItem("jwtToken", token);
    };

    getToken = () => {
        return AsyncStorage.getItem("jwtToken");
    };

    loggedIn = () => {
        const loggedIn = this.getToken() != null;
        return loggedIn;
    };

    logout = () => {
        AsyncStorage.removeItem("jwtToken");
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
        console.log(opts);
        return opts;
    }
}
const facade = new UserFetch();
export default facade;