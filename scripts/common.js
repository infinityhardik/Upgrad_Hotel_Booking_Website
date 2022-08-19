var removeLoader = () => {
    document.getElementById('preload-container').style.display = 'none';
    document.getElementById('main').style.display = 'block';
}

function header() {
    var str = `<a href="index.html" target="_self">
    <img src="assests/images/logo.png" alt="logo" height="60px" width="60px">
    </a>
    <button class="btn btn-light btn-sm" data-toggle="modal" data-target="#login-modal">LOGIN</button>`;
    document.querySelector("header").innerHTML += str;
}

function footer() {
    var str = `<div class="btn btn-info btn-sm" data-toggle="modal" data-target="#contact-modal">Contact Us</div>

    <div id="social_media">
        <a href="https://www.facebook.com" target="_blank"><img src="assests/images/facebook.png"
                alt="facebook logo" height="20px" width="22px"></a>
        <a href="https://www.instagram.com" target="_blank"><img src="assests/images/instagram.png"
                alt="instagram logo" height="20px" width="22px"></a>
        <a href="https://www.twitter.com" target="_blank"><img src="assests/images/twitter.png"
                alt="twitter logo" height="20px" width="22px"></a>
    </div>

    <div>&copy; 2020 ROOM SEARCH PVT. LTD.</div>`;

    document.querySelector("footer").innerHTML += str;
}

function modal() {
    var str =
        `<!-- Login Modal -->
    <div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="example-modal-label" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="example-modal-label">Please Login</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="d-flex justify-content-center align-items-center container ">
                            <div class="form-group">
                                <div class="row g-3 align-items-center">
                                    <div class="col-auto">
                                        <label for="email" class="col-form-label">Username:</label>
                                    </div>
                                    <div class="col-auto">
                                        <input type="text" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter Username" autocomplete="on" required>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center align-items-center container ">
                            <div class="form-group">
                                <div class="row g-3 align-items-center">
                                    <div class="col-auto">
                                        <label for="password" class="col-form-label">Password:</label>
                                    </div>
                                    <div class="col-auto">
                                        <input type="password" class="form-control" id="password" placeholder="Enter Password" required>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <div class="col-md-12 text-center">
                        <button type="submit" class="btn btn-primary" onclick="login(email,password)">Login</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Contact Us Modal-->
    <div class="modal fade" id="contact-modal" tabindex="-1" role="dialog" aria-labelledby="example-modal-label" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="example-modal-label">Get in touch</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div>Thank you for reaching out!!!</div>
                    <div>Please enter your e-mail and we will get back to you.</div>
                    <br>
                    <form>
                        <div class="form-group">
                            <div class="row g-3 align-items-center">
                                <div class="col-auto">
                                    <label for="user-email" class="col-form-label">Email:</label>
                                </div>
                                <div class="col-auto">
                                    <input type="text" class="form-control" id="user-email" aria-describedby="emailHelp" placeholder="Enter your email id" autocomplete="on" required>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    </div>`;
    document.querySelector("body").innerHTML += str;
}


function login(email, password) {
    // console.log(email.value, password.value);
    var status = document.querySelector("header button");

    if (email.value === 'admin' && password.value === "admin") {
        sessionStorage.setItem('user', email.value);
        sessionStorage.setItem('pass', password.value);
        alert("Successfully Logged in !");
        status.innerHTML = "LOGOUT";
        status.setAttribute("onclick", "logout()");
    }
}

function logout() {
    var status = document.querySelector("header button");
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('pass');

    status.innerHTML = "LOGIN";
    status.removeAttribute("onclick");
}


header();
footer();
modal();