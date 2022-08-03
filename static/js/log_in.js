// 로그인
async function handleSignin() {
  email = document.getElementById("floatingInput").value;
  password = document.getElementById("floatingPassword").value;

  const signinData = {
    email: email,
    password: password,
  };

  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:8000/user/token/",
    data: signinData,
    success: function (response) {
      alert("로그인 성공!");
      localStorage.setItem("access", response["access"]);
      localStorage.setItem("refresh", response["refresh"]);
      location.href = "recommend.html";
    },
    error: function (error) {
      alert(error.responseText);
    },
  });
}

// 회원가입
async function handleSignup() {
  username = document.getElementById("floatingInputNM").value;
  fullname = document.getElementById("floatingInputFM").value;
  email = document.getElementById("floatingInput").value;
  password = document.getElementById("floatingPassword").value;
  password_confirm = document.getElementById("floatingPassword2").value;

  if (password != password_confirm) {
    alert("비밀번호를 확인해주세요!");
    return 0;
  }

  const signupData = {
    email: email,
    username: username,
    fullname: fullname,
    password: password,
  };

  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:8000/user/info/",
    data: JSON.stringify(signupData),
    success: function (response) {
      alert(response.message);
      location.href = "log_in.html";
    },
    error: function (error) {
      alert(error.responseText);
    },
  });
}

// 새로고침 시 실행
$(document).ready(function () {
  let result = localStorage.getItem("access", "");

  console.log(result);
  if (result != null) {
    location.href = "recommend.html";
  }
});
