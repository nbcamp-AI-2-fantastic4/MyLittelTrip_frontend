// 로그아웃 기능
function logout() {
  alert("로그아웃 완료");
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");
  location.href = "log_in.html";
}

// 현재 로그인한 유저 정보 받아오기
async function user_info() {
  let token = localStorage.getItem("access");

  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:8000/user/info/",
    headers: { Authorization: "Bearer " + token },
    data: {},
    success: function (response) {
      $("#user_name").text(response["fullname"]);
      $("#user_email").text(response["email"]);
    },
    error: function (error) {
      $("#user_name").text = "";
      $("#user_email").text = "";
      alert("로그인을 해주세요");
      logout();
    },
  });
}

// 페이지별 새로고침 시 실행
$(document).ready(function () {
  user_info();
});
