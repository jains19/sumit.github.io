/* <!--Group 10:-->
<!--Name: Sumit Jain (100890788)-->
<!--Name: Yash (100892788)-->
<!--Date of completion: 21-02-2024--> */


const WEATHER_URL = `https://api.open-meteo.com/v1/forecast?latitude=43.89&longitude=-78.86&daily=apparent_temperature_min`;
const BLOG_POST_URL = 'data/blogposts.data.json';
const EVENTS_URL = 'data/events.data.json';
let globalBlogPosts = [];
let globalEvents = [];
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

const PROJECT_TEMPLATE = `<div class="col-lg-4"><div class="card project-card" style="width: 18rem;">
<img class="card-img-top" src="{card_image}" alt="{card_title}">
<div class="card-body">
  <h5 class="card-title">{card_title}</h5>
  <p class="card-text">{card_description}</p>
</div>
</div></div>`;
const teamMembersMoreDetails = {
    "11": "Meet Sumit Jain, our dedicated team member specializing in software development. With a keen eye for detail, Sumit crafts efficient and scalable solutions. His expertise lies in full-stack development, ensuring our projects are not only functional but also deliver an exceptional user experience.",
    "12": "Introducing Yash, a talented team member who specializes in design and user interface. Yash elevates creativity by transforming concepts into breathtakingly beautiful reality. His expertise in UX/UI design guarantees that our products surpass customer expectations.",
};

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

]

$(function () {

    install();

    // Add header
    include('nav.html', $('header'), function () {
        checkLoginStatusAndSetDisplayText();
        // Add new "Careers" link.
        const careersLink = '<li class="nav-item"><a class="nav-link" aria-current="page" href="#">Careers</a></li>';
        $(".top-navbar .navbar-nav").append(careersLink);

        // Change "Blog" link text to "News".
        $(".top-navbar .navbar-nav").find("#blog a").text("News");
    });

    // Add footer
    include('footer.html', $('footer'));


    $("#login-btn").on('click', function (event) {
        event.preventDefault();
        const username = $('#login-username').val();
        const password = $('#login-password').val();
        const userFound = checkCreds(username, password)
        if (userFound) {
            sessionStorage.setItem("isLoggedIn", `${userFound.firstName} ${userFound.lastName}`);
            window.location.href = 'index.html';
        } else {
            sessionStorage.removeItem("isLoggedIn");
            $("#login-status").text("Username and/or password is not valid");
            $('#login-username').val('');
            $('#login-password').val('');
            $("#login-username").focus();
        }
    });

    const checkCreds = (username, password) => {
        const usersString = sessionStorage.getItem("users");
        if (usersString) {
            const users = JSON.parse(usersString);
            return users.find((user) => user.email === username && password === user.password)
        }
        return null;
    };


    $(".team-table td").on("click", function () {
        const idString = $(this).closest("tr").attr("id");
        if (idString) {
            const id = idString.split("-")[1];
            $("#exampleModal").find(".modal-body").text(teamMembersMoreDetails[id]);
            $("#exampleModal").modal('show');
        }
    });
    const myCarousel = document.querySelector('.carousel')
    if (myCarousel) {
        const carousel = new bootstrap.Carousel(myCarousel, {
            interval: 2000,
            wrap: false
        });
    }

    $("#submit-query").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation()
        const username = $("#contact-form-control").find("#username").val();
        const email = $("#contact-form-control").find("#email").val();
        const subject = $("#contact-form-control").find("#subject").val();
        const message = $("#contact-form-control").find("#message").val();
        const phoneNumber = $("#contact-form-control").find("#phoneNumber").val();
        let errorMessage = '';

        if (isEmpty(username)) {
            $("#contact-form-control").find("#username");
            errorMessage += "Username cannot be empty";
        }
        if (isEmpty(email)) {
            $("#contact-form-control").find("#email");
            errorMessage += "<br> Email cannot be empty";
        }
        if (isEmpty(subject)) {
            $("#contact-form-control").find("#subject");
            errorMessage += "<br> Subject cannot be empty";
        }
        if (isEmpty(message)) {
            $("#contact-form-control").find("#message");
            errorMessage += "<br> Message cannot be empty";
        }

        if (isEmpty(phoneNumber)) {
            $("#contact-form-control").find("#phoneNumber");
            errorMessage += "<br> Message cannot be empty";
        }

        checkPhoneNumberFn(phoneNumber, errorMessage);

        if (errorMessage !== '') {
            $("#contact-form-control").addClass('was-validated');
            return;
        } else {
            let countdown = 5;
            let messageString = 'Thank you for contacting us. We have got your query with following information and we will get back to you soon. <br><br>'
            messageString += getMessageItemItem('Username', username);
            messageString += getMessageItemItem('Email', email);
            messageString += getMessageItemItem('Subject', subject);
            messageString += getMessageItemItem('Message', message);
            messageString += getMessageItemItem('Message', phoneNumber);
            messageString += '<div class="countdown">Redirecting in ' + countdown + ' ...</div>'
            $('.modal').modal('show');
            $('.modal').find('.modal-body').html(messageString);
            $("#contact-form-control").removeClass('was-validated');
            $("#contact-form-control").trigger('reset');
            const interval = setInterval(function () {
                $('.modal').find('.modal-body').find('.countdown').html(`Redirecting in ${countdown--} ...`);
                if (countdown <= 0) {
                    clearInterval(interval);
                    window.location = 'index.html';
                }
            }, 1000);
        }
    });

    // Add Project cards.
    const projectsContainer = $(".projects-container");
    if (projectsContainer.length > 0) {
        const projects = myProjects.map((project) => PROJECT_TEMPLATE.replace(/{card_title}/g, project.title)
            .replace('{card_description}', project.description).replace('{card_image}', 'images/' + project.image));
        projectsContainer.find('.container').append($('<div class="row">').html(projects));
    }

    // Get weather info
    $.get({
        url: WEATHER_URL,
        success: function (response) {
            $("#temperature_reading").text(response.daily.apparent_temperature_min[0]);
            $("#temperature_unit").text(response.daily_units.apparent_temperature_min)
        }
    });

    loadBlogPosts();
    loadEvents();

    $(document).on("click", ".logout-link", function (e) {
        e.preventDefault();
        if ($(this).text() === "Logout") {
            sessionStorage.removeItem("isLoggedIn");
        }
        window.location.href = "login.html";
    });

    $(document).on("click", "#button-addon2", function (e) {
        const searchKeyword = $("#search_txt").val();
        if (searchKeyword !== '') {
            window.location.href = `search.html?q=${searchKeyword}`;
        }
    });

    $(document).on("submit", "#searchForm", function (e) {
        e.preventDefault();
        $("#button-addon2").click();
    });

    $(document).on("submit", "#user_registration_form", function (e) {
        e.preventDefault();
        $(this).removeClass("was-validated")
        const values = $(this).serialize();
        if (values.length > 0) {
            const details = values.split("&").reduce((acc, val) => {
                const pair = val.split("=");
                acc[pair[0]] = pair[1];
                return acc;
            }, {});
            const userDetails = {
                firstName: details.firstName,
                lastName: details.lastName,
                password: details.password,
                confirmPassword: details.confirmPassword,
                gender: details.gender,
                email: decodeURIComponent(details.email)
            };
            const isValid = validateRegistration(userDetails);
            $(this).addClass("was-validated");
            if (isValid) {
                saveUser(userDetails);
                window.location.href = "login.html";
            }
        }
    });

    if ($("#rating_control").length > 0) {
        let isClicked = false;
        $("#rating_control .stars_rating").hover(function () {
            const id = $(this).attr("id");
            $(`#rating_control .stars_rating[id^=${id}]`).removeClass("fa-regular").addClass("fa-solid");
            $(".rating_text").text($(this).data("text"));
        }, function () {
            $(".rating_text").text("");
            $(`#rating_control .stars_rating`).removeClass("fa-solid").addClass("fa-regular");
        });
        $(document).on("click", "#rating_control .stars_rating", function () {
            $(`#rating_control .stars_rating`).removeClass("fa-solid").addClass("fa-regular");
            $("#rating_control .stars_rating").off('mouseenter mouseleave');
            const id = $(this).attr("id");
            $(`#rating_control .stars_rating[id^=${id}]`).removeClass("fa-regular").addClass("fa-solid");
            $(".rating_text").text($(this).data("text"));
            $("#rating").prop("value", $(this).data("value"))
        });
    }

});

const resetErrorFields = () => {
    document.getElementById("feedback-name").setCustomValidity("");
    document.getElementById("comments").setCustomValidity("");
    $(".rating_text").text("");
    $("#rating").prop("value", "");
    $(`#rating_control .stars_rating`).removeClass("fa-solid").addClass("fa-regular");
    $("#rating_control .stars_rating").off('mouseenter mouseleave');
};

const validateFeedbackForm = ($feedbackElement) => {
    let isValid = true;
    const servicesLiked = [];
    const values = $feedbackElement.serialize();
    $(".servicesChk:checkbox:checked").each(function (index, element) {
        servicesLiked.push($(element).val());
    });
    const details = values.split("&").reduce((acc, val) => {
        const pair = val.split("=");
        acc[pair[0]] = pair[1];
        return acc;
    }, {});
    details.services_liked = servicesLiked;

    if (isEmpty(details.feedback_name)) {
        document.getElementById("feedback-name").setCustomValidity("invalid");
        isValid = false;
    } else {
        document.getElementById("feedback-name").setCustomValidity("");
    }

    if (isEmpty(details.comments)) {
        document.getElementById("comments").setCustomValidity("invalid");
        isValid = false;
    } else {
        document.getElementById("comments").setCustomValidity("");
    }

    $feedbackElement.addClass("was-validated");


    return isValid;
};

const saveUser = (userDetails) => {
    let usersString = sessionStorage.getItem("users");
    if (!usersString) {
        usersString = JSON.stringify([]);
        sessionStorage.setItem("users", usersString);
    }
    const users = JSON.parse(usersString);
    users.push(userDetails);
    const jsonString = JSON.stringify(users);
    sessionStorage.setItem("users", jsonString);
};

const include = (url, $element, cb) => {
    if ($element.length > 0) {
        $.get({
            url: url,
            success: function (response) {
                $element.html(response);
                if (cb) {
                    cb();
                }
            }
        });
    }
};

const install = () => {
    let usersString = sessionStorage.getItem("users");
    if (!usersString) {
        saveUser({
            firstName: 'Sumit',
            lastName: 'Jain',
            email: 'admin@dc.com',
            password: '987654321',
            gender: 'm'
        });
    }
};

const validateRegistration = (userDetails) => {
    let isValid = true;
    if (isEmpty(userDetails.firstName)) {
        document.getElementById("registerFirstName").setCustomValidity("invalid");
        isValid = false;
    } else {
        document.getElementById("registerFirstName").setCustomValidity("");
    }

    if (isEmpty(userDetails.lastName)) {
        document.getElementById("registerLastName").setCustomValidity("invalid");
        isValid = false;
    } else {
        document.getElementById("registerLastName").setCustomValidity("");
    }

    if (isEmpty(userDetails.email)) {
        document.getElementById("registerEmail").setCustomValidity("invalid");
        isValid = false;
    } else {
        document.getElementById("registerEmail").setCustomValidity("");
        if (hasEmailAlreadyTaken(userDetails.email)) {
            isValid = false;
            document.getElementById("registerEmail").setCustomValidity("invalid");
            $("#registerEmail").next().next().text("Email already taken. Please choose different one.");
        }
    }

    if (isEmpty(userDetails.password)) {
        document.getElementById("registerPassword").setCustomValidity("invalid");
        isValid = false;
    } else {
        document.getElementById("registerPassword").setCustomValidity("");
        if (userDetails.password.length < 8) {
            document.getElementById("registerPassword").setCustomValidity("invalid");
            isValid = false;
        }
    }

    if (isEmpty(userDetails.confirmPassword)) {
        document.getElementById("registerConfirmPassword").setCustomValidity("invalid");
        isValid = false;
        $("#registerConfirmPassword").next().text("");
    } else {
        document.getElementById("registerConfirmPassword").setCustomValidity("");
    }

    if (userDetails.password !== userDetails.confirmPassword || userDetails.confirmPassword === '') {
        isValid = false;
        document.getElementById("registerConfirmPassword").setCustomValidity("invalid");
        $("#registerConfirmPassword").next().text("Confirm Password must be same as Password");
    } else {
        document.getElementById("registerConfirmPassword").setCustomValidity("");
    }

    return isValid;

};

const hasEmailAlreadyTaken = (email) => {
    const usersString = sessionStorage.getItem("users")
    if (usersString) {
        const users = JSON.parse(usersString);
        return users.find((user) => user.email === email) ? true : false
    }
    return false;
};

const getQueryString = (parameter) => {
    if (window.location.search !== '') {
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        return hashes.map(hash => hash.split("=")).find((queryParameterPair) => queryParameterPair[0] === parameter)[1];
    }
    return '';
};

const checkLoginStatusAndSetDisplayText = () => {
    const userLoggedIn = sessionStorage.getItem("isLoggedIn")
    if (userLoggedIn) {
        $("#user-login-status").removeClass("d-none").text(`Hi, ${userLoggedIn}`);
        $(".logout-link").text("Logout");
    } else {
        $("#user-login-status").addClass("d-none");
        $(".logout-link").text("Login");
    }
};

const checkPhoneNumberFn = (phoneNumber, errorMessage) => {
    if (!isValidPhoneNumber(phoneNumber)) {
        document.getElementById("phoneNumber").setCustomValidity("invalid");
        $("#phoneNumber").parent().find(".invalid-feedback").text("Phone number should be of digits");
        errorMessage += "<br> Phone Number cannot have characters";
        return;
    } else {
        $("#contact-form-control").find("#phoneNumber").removeClass('is-invalid');
    }
    if (!has10Characters(phoneNumber)) {
        document.getElementById("phoneNumber").setCustomValidity("invalid");
        $("#phoneNumber").parent().find(".invalid-feedback").text("Number must be of 10 digits");
        errorMessage += "<br> Phone Number must be of 10 digits.";
    } else {
        document.getElementById("phoneNumber").setCustomValidity("");
    }
    return;
}

const doSearchForPostsProjectsBySearchTerm = (searchKeyword) => {
    const searchKeywordRegex = new RegExp(searchKeyword, "i");
    const posts = globalBlogPosts.filter((item) => searchKeywordRegex.test(item.title) || searchKeywordRegex.test(item.content));
    const events = globalEvents.filter((item) => searchKeywordRegex.test(item.title) || searchKeywordRegex.test(item.content));
    let searchData = "";
    if (posts.length > 0) {
        posts.forEach((post) => {
            const postData = POST_TEMPLATE
                .replace('{blog_content}', post.content)
                .replace('{blog_author}', post.source)
                .replace('{type}', 'News')
                .replace('{blog_title}', post.title)
                .replace('{blog_url}', post.url)
            searchData += postData;
        });

    }

    if (events.length > 0) {
        events.forEach((eventItem) => {
            const eventData = EVENTS_TEMPLATE
                .replace('{event_description}', eventItem.description)
                .replace('{event_title}', eventItem.title)
                .replace('{type}', 'Event')
            searchData += eventData;
        });
    }

    if (posts.length !== 0 || events.length !== 0) {
        $("#blog_posts_section_search").html(searchData);
        $("body .element_tag").removeClass('d-none');
    } else {
        $("#blog_posts_section_search").html(`<div class="text-center mb-50">No news/events found for keyword: ${searchKeyword}</div>`);
    }

};

const isValidPhoneNumber = (phoneNumber) => !isNaN(phoneNumber);
const has10Characters = (phoneNumber) => phoneNumber.length === 10;

const loadBlogPosts = () => {
    $.get(BLOG_POST_URL, function (response) {
        globalBlogPosts = response;
        const blogPosts = response.map((article) => POST_TEMPLATE
            .replace('{blog_content}', article.content)
            .replace('{blog_author}', article.source)
            .replace('{blog_title}', article.title)
            .replace('{blog_url}', article.url));

        $("#blog_posts_section").html(blogPosts);
    });
};

const loadEvents = () => {
    $.get(EVENTS_URL, function (response) {
        globalEvents = response;
        const events = response.map((eventItem) => EVENTS_TEMPLATE
            .replace('{event_description}', eventItem.description)
            .replace('{event_title}', eventItem.title)
            .replace('{event_image}', eventItem.image));

        $("#events_section").html(events);
    });
}

const checkPhoneNumber = (value, validator) => {
    return false;
}

const isEmpty = (value) => value === '';
const getMessageItemItem = (label, value) => {
    return `<div class="filled-info"><label>${label}</label>: <span>${value}</span></div>`;
}


const Projects = [
    {
        title: "Community Potluck Picnic",
        image: "event1.jpg",
        description: "Join us on Saturday, March 10th, 2024, at Harmony Park for a delightful community potluck picnic. The festivities kick off at 12:00 PM and continue until 3:00 PM. Bring your favorite dish, and let's create a day filled with delicious food, uplifting music, and heartwarming community bonding. We invite you to share laughter and stories as we gather in the heart of our community for this joyous occasion."
    },
    {
        title: "Artisan Workshop Series: Painting",
        image: "event2.jpeg",
        description: "Discover the joy of painting at our Harmony Hub Art Studio on Wednesday, March 15th, 2024, from 6:30 PM to 8:30 PM. Join local artists for an acrylic painting workshop—perfect for all skill levels. Materials provided. Let your creativity flow!"
    },
    {
        title: "Community Wellness Walk",
        image: "event3.jpeg",
        description: "Embark on a journey to well-being on Saturday, March 24th, 2024, from 9:00 AM to 11:00 AM. Join us for a revitalizing morning walk along Harmony Trails, surrounded by scenic beauty. Bring your family, friends, and furry companions for a shared, healthy experience."
    },
    {
        title: "Community Garden Spring Planting",
        image: "event4.jpeg",
        description: "On Saturday, April 5th, 2024, from 10:00 AM to 12:00 PM, join us at Harmony Hub Community Garden for a hands-on gardening session. Let's cultivate together, planting seeds and nurturing our green space. Bring your gardening gloves and enthusiasm for a blooming community experience."
    },

]

const projectContainer = $(".Events-container");
if (projectContainer.length > 0) {
    const projects = Projects.map((project) => PROJECT_TEMPLATE.replace(/{card_title}/g, project.title)
        .replace('{card_description}', project.description).replace('{card_image}', 'images/' + project.image));
    projectContainer.find('.container').append($('<div class="row">').html(projects));
}
