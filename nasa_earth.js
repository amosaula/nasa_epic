var image_cell_template = "<div class='col-sm-3 image-cell'><div class='nasa-image'><img></div><div class='image-caption'></div><div class='image-coords'></div></div>";
var date_tmpl = "begin=YEAR-MONTH-DAY";
var myApiKey = "api_key=YOUR_API_KEY";

var imgUrlB = "https://api.nasa.gov/EPIC/archive/natural/";
var epic_natural_archive_base = "https://api.nasa.gov/EPIC/archive/natural/";
var api_url_query_base = "https://epic.gsfc.nasa.gov/api/natural/date/";

// ==========================================================
// START JS: synchronize the javascript to the DOM loading
// ==========================================================
$(document).ready(function() {

  // ========================================================
  // SECTION 1:  process on click events
  // ========================================================
  $('#get-images-btn').on('click', api_search);

  // process the "future" img element dynamically generated
  $("div").on("click", "img", function(){
    console.log(this.src);
    render_highres(this.src);
  });

  $("div").on("click", "img", function(){
    console.log('img:',this.src);
    // render your high resolution image within the #image-grid id html element
  });

  // ========================================================
  // TASK 1:  build the search AJAX call on NASA EPIC
  // ========================================================
  // Do the actual search in this function
  function api_search(e) {

    // get the value of the input search text box => date
    var date = document.getElementById('search_date').value;

    // build an info object to hold the search term and API key
    var info = {};
    var date_array = date.split('-');
    info.year = date_array[0]+date_array[1]+date_array[2]+date_array[3];
    info.month = date_array[5]+date_array[6];
    info.day = date_array[8]+date_array[9];
    info.api_key = "yE8HkL3V70wEhk8QOMalymKBRugRWpsj25OHdxKp";

    // build the search url and sling it into the URL request HTML element
    var search_url = api_url_query_base + info.year + 
    "-" + info.month + "-" + info.day +"?api_key=" + info.api_key;
    console.log(search_url);
    // sling it!




    // make the jQuery AJAX call!
    $.ajax({
      url: search_url,
      success: function(data) {
        render_images(data,info);
      },
      cache: false
    });
  };
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ========================================================

  // ========================================================
  // TASK 2: perform all image grid rendering operations
  // ========================================================
  function render_images(data,info) {
    // get NASA earth data from search results data
    console.log(data.length);
    var images = [];
    for (var i = 0; i < data.length; i++) {
      // build an array of objects that captures all of the key image data
      var dates = data[i]['date'];
      dates = dates.split("-","/")
        images[i] = {
          'identifier':data[i]['identifier'],
          'centroidCoord':data[i]['centroid_coordinates'],
          'imgDate':dates,
          'imgUrl':imgUrlB+this.imgDate+data[i]['image'] +
            ".png?api_key=" + info.api_key
        }

      // => image url
      // => centroid coordinates to be displayed in the caption area
      // => image date to be displayed in the caption area (under thumbnail)
    }
    console.log(images[2]['imgUrl']);


    // select the image grid and clear out the previous render (if any)
    var earth_dom = $('#image-grid');
    earth_dom.empty();

    // render all images in an iterative loop here!
    

  // ========================================================
  // TASK 3: perform single high resolution rendering
  // ========================================================
  // function to render the high resolution image
  function render_highres(src_url) {
    // use jQuery to select and maniupate the portion of the DOM => #image-grid
    //  to insert your high resolution image
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ========================================================
}});
