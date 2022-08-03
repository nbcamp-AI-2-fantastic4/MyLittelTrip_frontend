const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"

// 댓글 조회
async function getComment() {
    $.ajax({
        type: "GET",
        url: `${backend_base_url}/comment/${posttype_id}/${post_id}/`,
        data: {},
        success: function (response) {

        }
    })
}

// 댓글 저장
// user, posttype, post_id, comment, rating
async function postComment() {
    let user = localStorage.getItem("user");
    let posttype = $("#submit_button").attr("value");
    let post_id = $("#submit_button").attr("value");
    let comment = document.getElementById("comment_text").value;
    let rating = document.getElementById("comment_rating").value;

    const data = {
        user: user,
        comment: comment,
        rating: rating,
    };

    $.ajax({
        type: "POST",
        url: `${backend_base_url}/comment/`,
        data: JSON.stringify(data),
        success: function (response) {
            alert(response["message"]);
            window.location.reload();
        },
        error: function (response) {
            alert(response["error"]);
            window.location.reload();
        }
    });
}

// 댓글 수정
// user, comment, rating
async function putComment(comment_id) {
    $.ajax({
        type: "PUT",
        url: `${backend_base_url}/comment/${comment_id}/`,
        data: {},
        success: function (response) {

        }
    })
}

// 댓글 삭제
async function deleteComment(comment_id) {
    $.ajax({
        type: "DELETE",
        url: `${backend_base_url}/comment/${comment_id}/`,
        data: {},
        success: function (response) {

        }
    })
}
