/*
 * mantel.js
 * A singleton object credentials interface
 */
var Mantel = (function () {
    "use strict";
    var COOKIE_USERID, COOKIE_SECRET, username, secret;
    COOKIE_USERID = 'brickoven_user_id';
    COOKIE_SECRET = 'brickoven_secret';

    return {
        /**
         * Get a stored cookie by name
         */
        getCookie: function (name) {
            var nameEq, ca, i, c;
            nameEq = name + "=";
            ca = document.cookie.split(';');
            for (i = 0; i < ca.length; i += 1) {
                c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(nameEq) === 0) {
                    return c.substring(nameEq.length, c.length);
                }
            }
            return null;
        },
        /**
         * Store a cookie
         */
        setCookie: function (name, value, days) {
            var expires, date;
            if (days) {
                date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toGMTString();
            } else {
                expires = "";
            }
            if (document.cookie = name + "=" + value + expires + "; path=/") {
                return true;
            } else {
                return false;
            }
        },
        getUserid: function () {
            return username;
        },
        getSignature: function () {
            var epoch, sigComponents;
            epoch = parseInt(Date.now() / 1000, 10);
            sigComponents = username + secret + epoch;
            return String(CryptoJS.SHA256(sigComponents));
        },
        setCredentials: function (user, sec) {
            username = user;
            secret = sec;
        },
        setStoredCredentials: function (callback) {
            if (!this.getCookie(COOKIE_SECRET) ||
                !this.getCookie(COOKIE_USERID)) {
                return false;
            }
            this.setCredentials(
                this.getCookie(COOKIE_USERID),
                this.getCookie(COOKIE_SECRET)
            );
            return true;
        },
        storeCredentials: function (username, secret) {
            if (this.setCookie(COOKIE_USERID, username, 30) &&
                this.setCookie(COOKIE_SECRET, secret, 30)) {
                return true;
            } else {
                return false;
            }
        }
    }
}());