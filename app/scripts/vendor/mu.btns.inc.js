! function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.async = true;
        js.src = "https://a248.e.akamai.net/secure.meetupstatic.com/s/script/2012676015776998360572/api/mu.btns.js";
        fjs.parentNode.insertBefore(js, fjs);
    }
}(document, "script", "mu-bootjs");