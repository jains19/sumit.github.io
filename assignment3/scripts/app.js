"use strict";
;
const Stats = {
    home: 0,
    events: 0,
    services: 0,
    portfolio: 0,
    blog: 0
};
(function () {
    const myProjects = [
        {
            title: "Culinary Workshop",
            image: "food.jpg",
            description: "Savor the art of cooking at Harmony Hub's Culinary Workshop – where flavors, skills, and community come together deliciously."
        },
        {
            title: "Fitness Trail",
            image: "sport.jpeg",
            description: "Embark on a fitness journey at Harmony Hub's Fitness Trail—an invigorating outdoor space for health enthusiasts to thrive and connect."
        },
        {
            title: "Meditation Trail",
            image: "meditation.jpg",
            description: "Discover serenity at Harmony Hub's meditation Trail – a tranquil sanctuary for inner peace and mindfulness. Join us in calm reflection."
        },
        {
            title: "Book Exchange Program",
            image: "library.jpg",
            description: "Harmony Hub's Book Exchange: Share the joy of reading! Swap, borrow, and discover new stories in our community hub"
        },
        {
            title: "Community Recycling Program",
            image: "project.jpg",
            description: "Harmony Hub's Community Recycling Program: Join us in creating a sustainable future through collective recycling efforts. Together, we make a positive impact!"
        },
    ];
    function AddLinkEvents(link) {
        let linkQuery = $(`a.link[data=${link}]`);
        linkQuery.off("click");
        linkQuery.off("mouseover");
        linkQuery.off("mouseout");
        linkQuery.css("text-decoration", "underline");
        linkQuery.css("color", "blue");
        linkQuery.on("click", function () {
            LoadLink(`${link}`);
        });
        linkQuery.on("mouseover", function () {
            $(this).css("cursor", "pointer");
            $(this).css("font-weight", "bold");
        });
        linkQuery.on("mouseout", function () {
            $(this).css("font-weight", "normal");
        });
    }
    function AddNavigationEvents() {
        let navLinks = $("ul>li>a");
        navLinks.off("click");
        navLinks.off("mouseover");
        navLinks.on("click", function () {
            LoadLink($(this).attr("data"));
        });
        navLinks.on("mouseover", function () {
            $(this).css("cursor", "pointer");
        });
    }
    function LoadLink(link, data = "") {
        router.ActiveLink = link;
        if (Stats[link]) {
            Stats[link] = Stats[link] + 1;
        }
        else {
            Stats[link] = 1;
        }
        AuthGuard();
        router.LinkData = data;
        history.pushState({}, "", router.ActiveLink);
        document.title = capitalizeFirstLetter(router.ActiveLink);
        $("ul>li>a").each(function () {
            $(this).removeClass("active");
        });
        $(`li>a:contains(${document.title})`).addClass("active");
        LoadContent();
    }
    function AuthGuard() {
        let protected_routes = ["contact-list", "new-event", "stats"];
        if (protected_routes.indexOf(router.ActiveLink) > -1) {
            if (!sessionStorage.getItem("user")) {
                router.ActiveLink = "login";
            }
        }
    }
    function CheckLogin() {
        if (sessionStorage.getItem("user")) {
            $("#login").html(` <a id="logout" class="nav-link" href="#">
                                                        <i class="fas fa-sign-out-alt"></i> Logout</a>`);
            const user = sessionStorage.getItem("user");
            $(".nav-login-user").html("<p>Hi, " + user + "</p>").removeClass("d-none");
        }
        $("#logout").on("click", function () {
            sessionStorage.clear();
            $(".nav-login-user").addClass("d-none");
            $("#login").html(`<a class="nav-link" data="login">
                                <i class="fas fa-sign-in-alt"></i> Login</a>`);
            AddNavigationEvents();
            LoadLink("login");
        });
    }
    function ContactFormValidation() {
        ValidateField("#fullName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/, "Please enter a valid first and lastname.");
        ValidateField("#contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/, "Please enter a valid phone contact number.");
        ValidateField("#emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid email address");
    }
    function ValidateField(input_field_id, regular_expression, error_message) {
        let messageArea = $("#messageArea").hide();
        $(input_field_id).on("blur", function () {
            let inputFieldText = $(this).val();
            if (!regular_expression.test(inputFieldText)) {
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            else {
                messageArea.removeAttr("class").hide();
            }
        });
    }
    function AddContact(fullName, contactNumber, emailAddress) {
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if (contact.serialize()) {
            let key = contact.fullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }
    function DisplayHomePage() {
        console.log("Called DisplayHomePage()");
        $("#AboutUsBtn").on("click", () => {
            LoadLink("about");
        });
    }
    function DisplayProductsPage() {
        console.log("Called DisplayProductPage()");
    }
    function DisplayAboutUsPage() {
        console.log("Called DisplayAboutUsPage()");
    }
    function DisplayServicesPage() {
        console.log("Called DisplayServicesPage()");
    }
    function DisplayContactUsPage() {
        console.log("Called DisplayContactUsPage()");
        $("a[data='contact-list']").off("click");
        $("a[data='contact-list']").on("click", function () {
            LoadLink("contact-list");
        });
        ContactFormValidation();
        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");
        sendButton.addEventListener("click", function () {
            if (subscribeCheckbox.checked) {
                let fullName = document.forms[0].fullName.value;
                let contactNumber = document.forms[0].contactNumber.value;
                let emailAddress = document.forms[0].emailAddress.value;
                AddContact(fullName, contactNumber, emailAddress);
            }
        });
    }
    function DisplayContactListPage() {
        console.log("Called DisplayContactList Page() ...");
        if (localStorage.length > 0) {
            let contactList = document.getElementById("contactList");
            let data = "";
            let keys = Object.keys(localStorage);
            let index = 1;
            for (const key of keys) {
                let contactData = localStorage.getItem(key);
                let contact = new core.Contact();
                contact.deserialize(contactData);
                data += `<tr><th scope="row" class="text-center">${index}</th>
                             <td>${contact.fullName}</td>
                             <td>${contact.contactNumber}</td>
                             <td>${contact.emailAddress}</td>
                             <!-- Week 4-2-->
                             <td class="text-center">
                                <button value="${key}" class="btn btn-primary btn-sm edit">
                                    <i class="fas fa-edit fa-sm"> Edit</i>
                                </button>                          
                             </td>
                             <td class="text-center">
                                <button value="${key}" class="btn btn-danger btn-sm delete">
                                    <i class="fas fa-trash-alt fa-sm"> Delete</i>
                                </button>                          
                             </td>                         
                         </tr>`;
                index++;
            }
            contactList.innerHTML = data;
        }
        $("#addButton").on("click", () => {
            LoadLink("edit", "add");
        });
        $("button.delete").on("click", function () {
            if (confirm("Delete contact, are you sure?")) {
                localStorage.removeItem($(this).val());
            }
            LoadLink("contact-list");
        });
        $("button.edit").on("click", function () {
            LoadLink("edit", $(this).val());
        });
    }
    function DisplayEditPage() {
        console.log("Called DisplayEditPage()");
        ContactFormValidation();
        let page = router.LinkData;
        switch (page) {
            case "add":
                $("main>h1").text("Add Contact");
                $("#editButton").html(`<i class="fas fa-plus-circle fa-sm"> Add`);
                $("#editButton").on("click", (event) => {
                    event.preventDefault();
                    let fullName = document.forms[0].fullName.value;
                    let contactNumber = document.forms[0].contactNumber.value;
                    let emailAddress = document.forms[0].emailAddress.value;
                    AddContact(fullName, contactNumber, emailAddress);
                    LoadLink("contact-list");
                });
                $("#cancelButton").on("click", () => {
                    LoadLink("contact-list");
                });
                break;
            default:
                {
                    let contact = new core.Contact();
                    contact.deserialize(localStorage.getItem(page));
                    $("#fullName").val(contact.fullName);
                    $("#contactNumber").val(contact.contactNumber);
                    $("#emailAddress").val(contact.emailAddress);
                    $("#editButton").on("click", (event) => {
                        event.preventDefault();
                        contact.fullName = $("#fullName").val();
                        contact.contactNumber = $("#contactNumber").val();
                        contact.emailAddress = $("#emailAddress").val();
                        localStorage.setItem(page, contact.serialize());
                        LoadLink("contact-list");
                    });
                    $("#cancelButton").on("click", () => {
                        LoadLink("contact-list");
                    });
                }
                break;
        }
    }
    function DisplayLoginPage() {
        console.log("Called DisplayLoginPage()");
        let messageArea = $("messageArea");
        messageArea.hide();
        AddLinkEvents("register");
        $("#loginButton").on("click", function () {
            let success = false;
            let newUser = new core.User();
            $.get("./data/users.json", function (data) {
                for (const user of data.users) {
                    let username = document.forms[0].username.value;
                    let password = document.forms[0].password.value;
                    console.log(data.user);
                    if (username === user.Username && password === user.Password) {
                        newUser.fromJSON(new core.User(user.DisplayName, user.EmailAddress, user.Username, user.Password));
                        success = true;
                        break;
                    }
                }
                if (success) {
                    sessionStorage.setItem("user", newUser.serialize());
                    messageArea.removeAttr("class").hide();
                    LoadLink("contact-list");
                }
                else {
                    $("#username").trigger("focus").trigger("select");
                    messageArea
                        .addClass("alert alert-danger")
                        .text("Error: Invalid Login Credentials")
                        .show();
                }
            });
        });
        $("#cancelButton").on("click", function () {
            document.forms[0].reset();
            LoadLink("home");
        });
    }
    function DisplayRegisterPage() {
        console.log("Called DisplayRegisterPage()");
        AddLinkEvents("login");
    }
    function Display404Page() {
        console.log("Display404Page() called ...");
    }
    function DisplayPortfolioPage() {
        const PROJECT_TEMPLATE = `<div class="col-lg-4"><div class="card project-card" style="width: 18rem;">
            <img class="card-img-top" src="{card_image}" alt="{card_title}">
            <div class="card-body">
            <h5 class="card-title">{card_title}</h5>
            <p class="card-text">{card_description}</p>
            </div>
            </div></div>`;
        const projectsContainer = $(".projects-container");
        console.log(projectsContainer.length);
        const projects = myProjects.map((project) => PROJECT_TEMPLATE.replace(/{card_title}/g, project.title)
            .replace('{card_description}', project.description).replace('{card_image}', 'images/' + project.image));
        projectsContainer.find('.container').append($('<div class="row">').html(projects.join("")));
    }
    function DisplayBlogPage() {
        const BLOG_POST_URL = 'data/blogposts.data.json';
        const POST_TEMPLATE = `<article class="blog-article">
            <span class="d-none position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary element_tag">
                {type}
            </span>
        <h3>{blog_title}</h3>
        <p>{blog_content}
            <div>
                <div class="more-link">
                    <a href="{blog_url}">More...</a>
                </div>
                <div class="blog-publisher">- {blog_author}</div>
            </div>
        </p>
        </article>`;
        $.get(BLOG_POST_URL, function (response) {
            const blogPosts = response.map((article) => POST_TEMPLATE
                .replace('{blog_content}', article.content)
                .replace('{blog_author}', article.source)
                .replace('{blog_title}', article.title)
                .replace('{blog_url}', article.url));
            $("#blog_posts_section").html(blogPosts);
            console.log("Called DisplayBlogPage()");
        });
    }
    function DisplayEventsPage() {
        const EVENTS_URL = 'data/events.data.json';
        const EVENTS_TEMPLATE = `<article class="blog-article">
            <span class="d-none position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger element_tag">
            {type}
            </span>
            <h3>{event_title}</h3>
            <p>{event_description}
                <div>
                    <div class="more-link">
                        <a href="{event_description}"></a>
                    </div>
                </div>
            </p>
            </article>`;
        $.get(EVENTS_URL, function (response) {
            let eventsString = sessionStorage.getItem("events");
            let events = [];
            if (!eventsString) {
                events = response;
                sessionStorage.setItem("events", JSON.stringify(events));
            }
            else {
                events = JSON.parse(eventsString);
            }
            const eventsHtml = events.map((eventItem) => EVENTS_TEMPLATE
                .replace('{event_description}', eventItem.description)
                .replace('{event_title}', eventItem.title)
                .replace('{type}', 'Event'));
            $(".Events-container").html(eventsHtml);
            console.log("Called DisplayEventsPage()");
        });
    }
    function DisplayNewEventPage() {
        $('#createEventButton').off("click");
        $("#createEventButton").on("click", function () {
            const { errors, data } = validateNewEvent();
            if (errors.length === 0) {
                let eventsString = sessionStorage.getItem("events");
                let events = [];
                if (!eventsString) {
                    sessionStorage.setItem("events", JSON.stringify([{ title: data.eventName, description: data.eventDescription }]));
                }
                else {
                    events = JSON.parse(eventsString);
                    events.push({
                        title: data.eventName,
                        description: data.eventDescription
                    });
                    sessionStorage.setItem("events", JSON.stringify(events));
                }
                LoadLink("events");
            }
        });
    }
    function DisplayStatsPage() {
        const svg = d3.select("svg"), margin = { top: 20, right: 20, bottom: 50, left: 40 }, width = +svg.attr("width") - margin.left - margin.right, height = +svg.attr("height") - margin.top - margin.bottom;
        const x = d3.scaleBand().rangeRound([0, width]).padding(0.1), y = d3.scaleLinear().rangeRound([height, 0]);
        const g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        const data = Object.entries(Stats).map((entry) => {
            const name = entry[0];
            const count = entry[1];
            return {
                page: name,
                frequency: count
            };
        });
        x.domain(data.map(function (d) { return d.page; }));
        y.domain([0, d3.max(data, function (d) { return d.frequency; })]);
        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
        const yScaleTicks = y.ticks().filter(Number.isInteger);
        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y).tickValues(yScaleTicks).tickFormat(d3.format("d")));
        svg
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -150)
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("No. of visits");
        svg
            .append("text")
            .attr("x", 320)
            .attr("y", 385)
            .attr("text-anchor", "end")
            .text("Page");
        g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) { return x(d.page); })
            .attr("y", function (d) { console.log(y(d.frequency)); return y(d.frequency); })
            .attr("width", x.bandwidth())
            .attr("height", function (d) { return height - y(d.frequency); });
    }
    function ActiveLinkCallback() {
        switch (router.ActiveLink) {
            case "home": return DisplayHomePage;
            case "about": return DisplayAboutUsPage;
            case "services": return DisplayServicesPage;
            case "contact": return DisplayContactUsPage;
            case "contact-list": return DisplayContactListPage;
            case "products": return DisplayProductsPage;
            case "portfolio": return DisplayPortfolioPage;
            case "new-event": return DisplayNewEventPage;
            case "register": return DisplayRegisterPage;
            case "login": return DisplayLoginPage;
            case "blog": return DisplayBlogPage;
            case "edit": return DisplayEditPage;
            case "404": return Display404Page;
            case "events": return DisplayEventsPage;
            case "stats": return DisplayStatsPage;
            default:
                console.error("ERROR: callback does not exist: " + router.ActiveLink);
                return new Function();
        }
    }
    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    function LoadHeader() {
        $.get("./views/components/header.html", function (html_data) {
            $("header").html(html_data);
            document.title = capitalizeFirstLetter(router.ActiveLink);
            $(`li>a:contains(${document.title})`).addClass("active").attr("aria-current", "page");
            AddNavigationEvents();
            CheckLogin();
        });
    }
    function LoadContent() {
        let page_name = router.ActiveLink;
        let callback = ActiveLinkCallback();
        $.get(`./views/content/${page_name}.html`, function (html_data) {
            $("main").html(html_data);
            CheckLogin();
            callback();
        });
    }
    function LoadFooter() {
        $.get("./views/components/footer.html", function (html_data) {
            $("footer").html(html_data);
            AddNavigationEvents();
        });
    }
    function Start() {
        console.log("App Started");
        LoadHeader();
        LoadLink("home");
        LoadFooter();
    }
    window.addEventListener("load", Start);
})();
function validateNewEvent() {
    const eventName = $(".newEventFormContainer #eventName").val();
    const eventDate = $(".newEventFormContainer #eventDate").val();
    const eventTime = $(".newEventFormContainer #eventTime").val();
    const eventDescription = $(".newEventFormContainer #eventDescription").val();
    const errors = [];
    if (eventName === '') {
        errors.push('Event Name cannot be empty.');
    }
    if (eventDate === '') {
        errors.push('Event Date cannot be empty.');
    }
    if (eventTime === '') {
        errors.push('Event Time cannot be empty.');
    }
    if (eventDescription === '') {
        errors.push('Event Description cannot be empty.');
    }
    $("#newEventForm").addClass("was-validated");
    return { errors, data: { eventName, eventDate, eventTime, eventDescription } };
}
//# sourceMappingURL=app.js.map