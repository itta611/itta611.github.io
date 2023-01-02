"use strict";
let projectId;
let zip = new JSZip();;
$('#load-btn').click(function() {
  projectId = $('#project-id').val();
  $('#load-btn').text('LOADING...');
  $.ajax({
    url: `https://trampoline.turbowarp.org/proxy/projects/${projectId}`,
    data: "",
    dataType: "json",
    success: function (response) {
      let token = response["project_token"];
      $.ajax({
        url: `https://projects.scratch.mit.edu/${projectId}/?token=${token}`,
        data: "",
        dataType: "text",
        success: function (response) {
          $('#json-editor').val(response);
          $('#json-editor').removeAttr('disabled');
          $('#load-btn').text('LOAD');
          $('#thumbnail').attr('src', `https://uploads.scratch.mit.edu/projects/thumbnails/${projectId}.png`);
        },
        error: function () {
          alert('エラーが発生しました。\nThe error occurred.');
          $('#load-btn').text('LOAD');
        }
      });
    },
    error: function() {
      alert('エラーが発生しました。\nThe error occurred.');
      $('#load-btn').text('LOAD');
    }
  });
});

$('#export').click(function () {
  let folder = zip.folder("project");
  folder.file('project.json', $('#json-editor').val());
  zip.generateAsync({type:"blob"})
  .then(function(content) {
      // see FileSaver.js
      saveAs(content, "project.sb3");
  });
});
