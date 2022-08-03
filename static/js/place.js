$(document).ready(function () {
    showPlaces();
  });
  
  function show_list(all_list) {
    $("#result-box").empty();
    for (let i = 0; i < all_list.length; i++) {
      let places_img = all_list[i]["image"];
      let places_name = all_list[i]["name"];
      let places_placetype = all_list[i]["placetype"]["typename"];
      let places_rating = all_list[i]["rating"];
      let temp_html = `<div class="place_box">                         
                          <!--장소 이미지 넣는 곳-->
                          <div class="place_img_box">
                              <img src="http://127.0.0.1:8000${places_img}"
                                  class="information" id="places_img">
                          </div>
                          <div class="place_info_box">
                              <div class="place_info_list">
                                  <li><span>Name : </span>  ${places_name}</li>
                                  <li><span >rating : </span >   ${places_rating}</li>
                                  <li><span >placetype : </span >   ${places_placetype}</li>
                              </div>
                          </div>
                      </div>`;
      $("#result-box").append(temp_html);
    }
  }
  
  function showPlaces() {
    $.ajax({
      type: "GET",
      url: "http://127.0.0.1:8000/place/",
      data: {},
      success: function (response) {
        all_list = response;
        show_list(all_list);
      },
    });
  }
  


  // Place 저장 place_add.html
async function savePlace() {
  let user = localStorage.getItem("user");

  const data = {
    user: user,
  };

  $.ajax({
    type: "POST",
    url: "${backend_base_url}/place/detail/",
    data: JSON.stringify(data),
    success: function (response) {
      alert(response["message"]);
      console.log(response["message"]);
      location.reload();
    },
    error: function (error) {
      alert(error.responseText);
      console.log(error.responseText);
    },
  });
}

//   async function show_by_brand(barnd_name) {
//     $.ajax({
//       type: "GET",
//       url: "http://127.0.0.1:8000/place/brand/",
//       data: {
//         brand: barnd_name,
//       },
//       success: function (response) {
//         show_list(response);
//       },
//     });
//   }
  
//   async function show_by_color(color_name) {
//     $.ajax({
//       type: "GET",
//       url: "http://127.0.0.1:8000/place/color/",
//       data: {
//         color: color_name,
//       },
//       success: function (response) {
//         show_list(response);
//       },
//     });
//   }
  
//   async function show_by_height(height_name) {
//     $.ajax({
//       type: "GET",
//       url: "http://127.0.0.1:8000/place/height/",
//       data: {
//         height: height_name,
//       },
//       success: function (response) {
//         show_list(response);
//       },
//     });
//   }
  

// Place 상세 조회
async function showComment(place_id) {
  $.ajax({
    type: "GET",
    url: `${backend_base_url}/detail/${place_id}/`,
    data: {},
    success: function (response) {
      $("#comment_img").empty();
      $("#comment").empty();
      $("#comment_btn").attr("value", history_id);

      let history_info = response["result_history"];
      let comment_info = response["result_comment"];
      console.log(comment_info);

      let image_one = history_info["image"]["image_one"];
      let image_two = history_info["image"]["image_two"];
      let image_result = history_info["image"]["image_result"];

      let temp_html_img = `<div class="modal_body" >
                            <div class="img_used">
                                <div class="img_first">
                                    <img src="${backend_base_url}${image_one}" style="width:250px; height:200px;"/>
                                </div>
                                <div class="img_second">
                                    <img src="${backend_base_url}${image_two}" style="width:250px; height:200px;"/>
                                </div>
                            </div>  
                            <div class="img_result">
                                <img src="${backend_base_url}${image_result}" style="width:300px; height:200px;"/>
                            </div>
                        </div>`;
      $("#comment_img").append(temp_html_img);

      for (let i = 0; i < comment_info.length; i++) {
        let username = comment_info[i]["user"];
        let content = comment_info[i]["content"];

        let temp_html = `
                                ${username} : ${content}
                                <hr>
                                `;
        $("#comment").append(temp_html);
      }
    },
  });
}