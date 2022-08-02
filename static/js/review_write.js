
// 뒤로가기로 페이지 불러왔을때 인풋에 데이터 남아있을 경우
$(document).ready(function(){
	window.onpageshow = function (event){
		if(event.persisted || (window.performance && window.performance.navigation.type == 2)){
			$("#review_title").val("");
			$("#review_content").val("");
    }
  }})


// 여러장의 이미지 선택시 미리보기
// 이미지 정보들을 담을 배열
var sel_files = [];
 
$(document).ready(function() {
    $("#exampleFormControlFile1").on("change", handleImgFileSelect);
}); 

function handleImgFileSelect(e) {

    // 이미지 정보들을 초기화
    sel_files = [];
    $(".imgs_wrap").empty();

    // 선택한 파일들을 array로 변환
    var files = e.target.files;
    var filesArr = Array.prototype.slice.call(files);

    var index = 0;
    // 파일어레이 요소 하나씩 반복
    filesArr.forEach(function(f) {
        // 이미지 파일 아니라면
        if(!f.type.match("image.*")) {
            alert("확장자는 이미지 확장자만 가능합니다.");
            return;
        }

        // 배열 끝에 추가
        sel_files.push(f);

        // FileReader : 비동기적으로 파일의 내용을 읽어들이는데 사용
        var reader = new FileReader();
        // FileReader가 읽기 동작이 성공했을때 .onload
        reader.onload = function(e) {
            // javascript:void(0); 빼니까 클릭하면 지워짐
            // var html = "<a href=\"\" onclick=\"deleteImageAction("+index+")\" id=\"img_id_"+index+"\"><img src=\"" + e.target.result + "\" data-file='"+f.name+"' class='selProductFile' style='width:150px; height:150px;'></a>&nbsp";
            var html = "<a href=\"javascript:void(0);\" onclick=\"deleteImageAction("+index+")\" id=\"img_id_"+index+"\"><img src=\"" + e.target.result + "\" data-file='"+f.name+"' class='selProductFile' title='Click to remove' style='width:150px; height:150px;'></a>&nbsp";

            $(".imgs_wrap").append(html);
            index++;
        }
        // 바이너리 파일을 Base64Encode 문자열로 반환
        reader.readAsDataURL(f);
    });
}


// 선택 파일 삭제
function deleteImageAction(index) {            
    console.log("index : "+index);
    sel_files.splice(index, 1);

    var img_id = "#img_id_"+index;
    $(img_id).remove();

    console.log(sel_files);
} 


// ajax
backend_base_url = "http://127.0.0.1:8000";
frontend_base_url = "http://127.0.0.1:5500";


// 사용자의 여행일정
$(document).ready(function () {
  showUserTrip();
});

// 사용자의 여행일정 가져오기
async function showUserTrip() {
  $.ajax({
    type: "GET",
    url: `${backend_base_url}/review/write/`,
    data: {},
    success: function (response) {
      let trip_list = response["trip_list"];
      for (let i = 0; i < trip_list.length; i++) {
        let trip_id = trip_list[i]["id"];
        let title = trip_list[i]["title"];

        let temp_html = `
          <option value="${trip_id}">${title}</option>
          `;
        
        $("#review_trip").append(temp_html);
      }
    },
  });
}


// review 저장
async function saveReview() {
    const formdata = new FormData();

    const title = document.getElementById("review_title").value;
    const trip_id = document.getElementById("review_trip").value;
    const content = document.getElementById("review_content").value;
    // const image = document.getElementById("exampleFormControlFile1").files;

    formdata.append('title', title)
    formdata.append('trip_id', trip_id)
    formdata.append('content', content)

    // 여러장 이미지 파일 형식으로 폼데이터에 추가
    sel_files.forEach(file => formdata.append('image', file))
  
    $.ajax({
      type: "POST",
      url: `${backend_base_url}/review/`,
      data: formdata,
      cache: false,
      contentType: false,
      processData: false,
      success: function (response) {
        alert("리뷰 작성 완료!")
        window.location.href = 'review.html';
      },
      error: function (error) {
        alert(error.responseText);
      },
    });
  }



// 이미지 한개 미리보기 방법
// document.getElementById("exampleFormControlFile1").onchange = function () {
//     var reader = new FileReader();

//     reader.onload = function (e) {
//         // get loaded data and render thumbnail.
//         document.getElementById("image").src = e.target.result;
//     };

//     // read the image file as a data URL.
//     reader.readAsDataURL(this.files[0]);
// };

// const reader = new FileReader();

// reader.onload = (readerEvent) => {
//     document.querySelector("#image").setAttribute("src", readerEvent.target.result);
//     //파일을 읽는 이벤트가 발생하면 img_section의 src 속성을 readerEvent의 결과물로 대체함
// };

// document.querySelector("#exampleFormControlFile1").addEventListener("change", (changeEvent) => {
//     //upload_file 에 이벤트리스너를 장착

//     const imgFile = changeEvent.target.files[0];
//     reader.readAsDataURL(imgFile);
//     //업로드한 이미지의 URL을 reader에 등록
// })