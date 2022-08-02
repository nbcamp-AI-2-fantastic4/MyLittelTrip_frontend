const backend_base_url = "http://127.0.0.1:8000";
const frontend_base_url = "http://127.0.0.1:5500";

$(document).ready(function () {
    showReview();
  });


// Review 조회
async function showReview() {
    $.ajax({
      type: "GET",
      url: `${backend_base_url}/review/`,
      data: {},
      success: function (response) {
        let review_list = response["review_list"];
        let temp_html_2 = "";
        for (let i = 0; i < review_list.length; i++) {
          let review_id = review_list[i]["id"];
          let review_img = review_list[i]["images"]["image"];
          let username = review_list[i]["user"];
          let title = review_list[i]["title"];
          let content = review_list[i]["content"];
          let created_at = review_list[i]["created_at"];
          let likes = review_list[i]["likes"];
  
          let temp_html = `<div class="col-md-4">
                <div class="card card-blog">
                    <div class="card-image">
                        <a href="#"> <img class="img" src="${backend_base_url}/media/${review_img}"> </a>
                        <div class="ripple-cont"></div>
                    </div>
                    <div class="table">
                        <p class="card-caption">
                            <a href="#">${title}</a>
                        </p>
                        <p class="card-description">${content}</p>
                        <div class="ftr">
                            <div class="author">
                                <span class="username">${username} 님</span>
                            </div>
                            <div class="stats"> <i class="fa fa-heart"></i>${likes}</div>
                        </div>
                    </div>
                </div>
            </div>`;
        
          if (i % 3 == 0 && i != review_list.length - 1) {
            temp_html_2 = '<div class="review_row">' + temp_html;
          } else if (i % 3 == 0 && i == review_list.length - 1) {
            temp_html_2 = '<div class="review_row">' + temp_html + "</div>";
            $("#review_list").append(temp_html_2);
            temp_html_2 = "";
          } else if (i % 3 == 1 && i != review_list.length - 1) {
            temp_html_2 += temp_html;
          } else if (i % 3 == 1 && i == review_list.length - 1) {
            temp_html_2 = temp_html_2 + temp_html + "</div>";
            $("#review_list").append(temp_html_2);
            temp_html_2 = "";
          } else if (i % 3 == 2) {
            temp_html_2 = temp_html_2 + temp_html + "</div>";
            $("#review_list").append(temp_html_2);
            temp_html_2 = "";
          }
        }
      },
    });
  }