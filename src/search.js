$(document).ready(function(){
  $("#search-box").on('input', function(){
    fetchData()
  });
});

function fetchData() {
  $.ajax({
    url: "generated.json",
    dataType : 'json',
    context: document.body,
  }).done(function(response) {
    console.log(response)
  });
}
