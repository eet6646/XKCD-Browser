

var XKCDBrowser = {

  requestComic: function(cId) {
    cId = typeof cId !== 'undefined' ? cId : 0;

    cId = Number(cId);

    if(isNaN(cId)) return false;

    if(cId == 0) {
      comicUrl = 'http://xkcd.com/info.0.json';
    }else {
      comicUrl = 'http://xkcd.com/'+cId+'/info.0.json';
    }

    var displayComic = function(cObj) {
      $("#cImg").attr("src",cObj['img']);
      $("#cDesc").html(cObj['alt']);
      window.curComicId = cObj['num'];
      if(cId == 0){
        window.maxComicId = cObj['num'];
      }
    }
    $.get(comicUrl, function(data){
      displayComic(data);
    });

  },
  requestNextComic: function() {
    var cId = window.curComicId + 1;
    if(cId > window.maxComicId) return false;

    this.requestComic(cId);
  },
  requestPreviousComic: function() {
    var cId = window.curComicId - 1;
    if(cId < 1) return false;

    this.requestComic(cId);
  },
  requestRandomComic: function() {
    var getRandomInt = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var cId = getRandomInt(1,window.maxComicId);
    this.requestComic(cId);
  }
};

document.addEventListener('DOMContentLoaded', function () {
  XKCDBrowser.requestComic();

  $("#previous").click(function(){
    XKCDBrowser.requestPreviousComic();
  });
  $("#next").click(function(){
    XKCDBrowser.requestNextComic();
  });
  $("#random").click(function(){
    XKCDBrowser.requestRandomComic();
  });
  $("#first").click(function(){
    XKCDBrowser.requestComic(1);
  });
  $("#latest").click(function(){
    XKCDBrowser.requestComic();
  });
});
