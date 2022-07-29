// 로그아웃 기능
async function logout() {
  $.ajax({
    type: "DELETE",
    url: "http://127.0.0.1:8000/user/logout/",
    data: {},
    success: function (response) {
      alert(response.message);
      localStorage.removeItem("user");
      localStorage.removeItem("email");
      localStorage.removeItem("fullname");
      location.href = "log_in.html";
    },
    error: function (error) {
      alert(error.responseText);
    },
  });
}

// 현재 로그인한 유저 정보 받아오기
async function user_info() {
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:8000/user/info/",
    data: {},
    success: function (response) {
      console.log(response);
    },
    error: function (error) {
      alert(error.responseText);
      location.href = "log_in.html";
    },
  });
}

// 페이지별 새로고침 시 실행
$(document).ready(function () {
  // if (localStorage.getItem("user", "")) {
  //   $("#user_name").text(localStorage.getItem("fullname"));
  //   $("#user_email").text(localStorage.getItem("email"));
  // } else {
  //   location.href = "log_in.html";
  // }
});
