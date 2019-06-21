 const title=document.getElementById('title');
 const desc=document.getElementById('desc');
 const author=document.getElementById('author');
 const submit=document.querySelecter('.btn btn-info');
 const List=document.getElementByClass('List');
 
 

 setInterval(()=>{
  let xhr=new XMLHttpRequest;
  xhr.addEventListener('load',function(){
     var json=JSON.parse(this.responseText);
     for(var i=0;i<json.ideas.length;i++)
     {
        var Title=json.ideas[i].title;
        var Desc=json.ideas[i].idea;
        var count=json.ideas[i].count;
        const item=`
                     <li id="item">
                       <h4 id="title">${Title}</h4>
                       <p id="desc">${Desc}</p>
                       <p id="author"><span style="color: #e81d38;">By</span>: &nbsp; Author</p>
                       <a href="item" title="Love it" class="btn btn-counter" data-count="${count}"><span>&#x2764;</span></a>
                     </li>
                  `;
        var position="beforeend";
        List.insertAdjacentHTML(position,item);
     }
    
  });
  xhr.open('Get','http://localhost:3006/idea',true);
  xhr.send();
},500);



submit.addEventListener("click",function(){
     var data=new FormData();
     data.append('title',`${title.value}`);
     data.append('idea',`${desc.value}`);
     data.append('count',0);
     var http = new XMLHttpRequest();
     http.open('POST','http://localhost:3006/idea', true);
     http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
     http.onreadystatechange = function() {
    if(http.readyState == 4 && http.status == 200) {
        alert(http.responseText);
       }
       console.log(this.responseText);
     }
     http.send(data);
});




$('.btn-counter').on('click', function(event, count) {
  event.preventDefault();
  
  var $this = $(this),
      count = $this.attr('data-count'),
      active = $this.hasClass('active'),
      multiple = $this.hasClass('multiple-count');
    $.fn.noop = $.noop;
  $this.attr('data-count', ! active || multiple ? ++count : --count  )[multiple ? 'noop' : 'toggleClass']('active');
});