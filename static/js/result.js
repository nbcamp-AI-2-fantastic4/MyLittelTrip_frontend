// 새로고침
$(document).ready(function () {
  result_place_listing();
  result();
});

// 장소 리스팅
function result_place_listing() {
  $("#order_list").empty();

  let output = localStorage.getItem("places_info");
  let place_list = JSON.parse(output);
  for (let i = 0; i < place_list.length; i++) {
    let name = place_list[i]["name"];
    let address = place_list[i]["address"];
    let word = place_list[i]["word"];
    let temp_html = `<tr class="place">
                                <th scope="row">${word}</th>
                                <td>${name}</td>
                                <td>${address}</td>
                            </tr>`;

    $("#order_list").append(temp_html);
  }
}

// 추천 여행일정 리스팅 함수
function result() {
  $("#course_list").empty();
  let output = localStorage.getItem("result");
  let course_list = JSON.parse(output);

  for (let i = 0; i < course_list.length; i++) {
    let start_at = course_list[i]["start_at"];
    let end_at = course_list[i]["end_at"];
    let doing = course_list[i]["doing"];

    let temp_html = `<tr class="place">
                              <th scope="row">${start_at}</th>
                              <td>${end_at}</td>
                              <td>${doing}</td>
                          </tr>`;

    $("#course_list").append(temp_html);
  }
}

// 여행 일정 저장 하기
function result_save() {
  if (JSON.parse(localStorage.getItem("result")) == null) {
    let temp_list = [];
    localStorage.setItem("result", JSON.stringify(temp_list));
  }
  let title = $("#trip_title").val();
  let desc = $("#trip_desc").val();
  let result = JSON.parse(localStorage.getItem("result"));

  let token = localStorage.getItem("access");

  trip_data = {
    title: title,
    content: desc,
    tripcourse: result,
  };
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:8000/trip/",
    headers: {
      Authorization: "Bearer " + token,
    },
    data: JSON.stringify(trip_data),
    success: function (response) {
      alert(response["message"]);
      localStorage.removeItem("places");
      localStorage.removeItem("result");
      localStorage.removeItem("places_info");
      let temp_list = [];
      localStorage.setItem("places", JSON.stringify(temp_list));
      localStorage.setItem("result", JSON.stringify(temp_list));
      localStorage.setItem("places_info", JSON.stringify(temp_list));

      location.href = "recommend.html";
    },
  });
}
