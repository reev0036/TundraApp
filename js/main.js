//UNFINISHED

let dlProfiles = [];
const KEY = "reev0036";
let imageURL = "http://griffis.edumedia.ca/mad9022/tundra/profiles/";

let app = {
    init: function () {

        //let target = document.querySelectorAll("#fav, #home, .card, .list");
        //let tiny = new t$(target);

        //tiny.addEventListener(t$.EventTypes.TAP, favTab);

        document.getElementById("fav_btn").addEventListener("click", favTab);
        document.getElementById("home_btn").addEventListener("click", homeTab);

        function favTab(ev) {
            document.getElementById("cards_page").classList.remove("active");
            document.getElementById("home_btn").classList.remove("current");
            document.getElementById("fav_list").classList.add("active");
            document.getElementById("fav_btn").classList.add("current");
        }

        function homeTab(ev) {
            document.getElementById("cards_page").classList.add("active");
            document.getElementById("home_btn").classList.add("current");
            document.getElementById("fav_list").classList.remove("active");
            document.getElementById("fav_btn").classList.remove("current");
        }

        app.fetch();
    },

    //removeChild(); setTimeout; querySelectorAll.card


    fetch: function () {
        let baseURL = "http://griffis.edumedia.ca/mad9022/tundra/get.profiles.php";
        fetch(baseURL)
            .then(response => response.json())
            .then(data => {
                //let dlProfiles = sessionStorage.setItem(KEY, JSON.stringify(data));
                //console.log(data.profiles);
                app.displayProfiles(data.profiles);
            })
            .catch(err => {
                console.log(err);
            });
    },

    displayProfiles: function (profiles) {
        let section = document.querySelector("#cards_home");
        let tiny = new t$(section);
        let df = document.createDocumentFragment();
        section.innerHTML = "";

        profiles.forEach(function (profile) {
            let div = document.createElement("div");

            div.setAttribute("data-id", profile.id);
            div.setAttribute("data-first", profile.first);
            div.setAttribute("data-last", profile.last);
            div.setAttribute("data-avatar", profile.avatar);

            div.classList.add("card");
            div.classList.add("fixed");

            //div.addEventListener("click", app.favProfile);
            //tiny.addEventListener(t$.EventTypes.SWIPELEFT, app.rejectProfile);

            //IMAGE
            let img = document.createElement("img");
            img.src = imageURL + profile.avatar;
            div.appendChild(img);

            //NAME
            let first = document.createElement("h3");
            first.textContent = profile.first + " ";
            first.style.display = "inline";
            div.appendChild(first);

            //DISTANCE
            let distance = document.createElement("p");
            distance.textContent = "Distance: " + profile.distance;
            div.appendChild(distance);


            //GENDER
            let gender = document.createElement("p");
            gender.textContent = "Gender: " + profile.gender;
            div.appendChild(gender);



            //ACCEPT

            let acc = document.createElement("p");
            acc.addEventListener("click", app.favProfile);
            acc.classList.add("icon", "thumb-down");
            acc.style.float = "left";
            div.appendChild(acc);

            //REJECT
            let reject = document.createElement("div");
            reject.addEventListener("click", app.rejectProfile);
            reject.classList.add("icon", "thumb-up");
            reject.style.float = "right";
            div.appendChild(reject);


            df.appendChild(div);
        });

        section.appendChild(df);

    },

    rejectProfile: function (ev) {
        var list = document.getElementById("cards_home")
        var card = ev.currentTarget.parentNode;
        card.classList.add("dot");
        setTimeout(function () {
            list.removeChild(card);
        }, 500);

        if (document.querySelectorAll(".card").length < 4) {
            app.fetch();
        }

        //card.parentNode.removeChild(card);
    },

    favProfile: function (ev) {

        var list = document.getElementById("cards_home")
        var card = ev.currentTarget.parentNode;
        card.classList.add("dot");

        setTimeout(function () {
            list.removeChild(card);
        }, 500);

        if (document.querySelectorAll(".card").length < 4) {
            app.fetch();
        }


        let first = card.getAttribute("data-first");
        let last = card.getAttribute("data-last");
        let avatar = card.getAttribute("data-avatar");

        let ul = document.querySelector(".list-view");

        let li = document.createElement("li");
        li.classList.add("list-item");
        
        let img = document.createElement("img");
        img.classList.add("avatar");
        img.src = imageURL + avatar;
        
        let p = document.createElement("p");
        p.textContent = first;
        
        li.appendChild(img);
        li.appendChild(p);

        ul.appendChild(li);

        if (first && last && avatar) {
            data = {
                first,
                last,
                avatar
            };
            dlProfiles.push(data);
            sessionStorage.setItem(KEY, JSON.stringify(dlProfiles));
        }

    },

    deleteProfile: function () {


    }
}

document.addEventListener("DOMContentLoaded", app.init);