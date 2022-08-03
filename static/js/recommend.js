// 새로고침
$(document).ready(function () {
  $("#order_table").show();
  $("#route_table").hide();
  place_listing();
});

// 장소 리스팅
function place_listing() {
  $("#route_table").hide();
  $("#order_table").show();
  $("#order_list").empty();

  let output = localStorage.getItem("places");
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

// 장소 추가
function parsing() {
  let place_word = $("#name_box").val();

  if (JSON.parse(localStorage.getItem("places")) == null) {
    let temp_list = [];
    localStorage.setItem("places", JSON.stringify(temp_list));
  }

  const place_data = {
    type: 0,
    word: place_word,
  };

  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:8000/recommend/",
    data: JSON.stringify(place_data),
    success: function (response) {
      let place = response;
      let place_list = JSON.parse(localStorage.getItem("places"));

      place_list.push(place);
      localStorage.setItem("places", JSON.stringify(place_list));

      window.location.reload();
    },
  });
}

// 여행일정 추천
function recommend() {
  if (JSON.parse(localStorage.getItem("result")) == null) {
    let temp_list = [];
    localStorage.setItem("result", JSON.stringify(temp_list));
  }

  let places = JSON.parse(localStorage.getItem("places"));
  let place_info = [];
  for (let i = 0; i < places.length; i++) {
    place_info.push(places[i]["word"]);
  }
  place_info = {
    places: place_info,
  };
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:8000/recommend/schedule/",
    data: JSON.stringify(place_info),
    success: function (response) {
      console.log(response);
      localStorage.setItem("result", JSON.stringify(response["result"]));
      localStorage.setItem(
        "places_info",
        JSON.stringify(response["places_info"])
      );
      location.href = "result.html";
    },
  });
}

// 여행 장소 초기화
function delete_all() {
  localStorage.removeItem("places");
  let temp_list = [];
  localStorage.setItem("places", JSON.stringify(temp_list));
  window.location.reload();
}
