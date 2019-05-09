var	offsetpage = 0;
var isloading = false;
var GAME = "League of Legends";



function changegame(game){
	GAME = game;
	$('.row').empty();
	appendData(GAME);
}

function getData(game,cd){
//	const client_id = "nutbxp79x8xv2elokn81q6fyrbjpik"; //developer id
    
    var limit = 27;
	var url = 'https://api.twitch.tv/kraken/streams?client_id=nutbxp79x8xv2elokn81q6fyrbjpik&game=' + game + '&limit='+ limit +'&offset=' + offsetpage;
	isloading = true;
	
	$.ajax({
		url:url ,
		success : function(response) {
		console.log(response);
		cd(null, response);
	}
	})	
}
function appendData(game){
	getData(game,function(err, data){
		var streams =data.streams;
		var $row = $('.row');
		for( var i = 0; i <streams.length; i++){
			$row.append(getColumn(streams[i]));
		}
		offsetpage += 10;
		isloading = false;
		
	});
}
$(document).ready(function(){
	appendData(GAME);
	$(window).scroll(function(){
	if($(window).scrollTop() + $(window).height() > $(document).height()-200){
		//載入程式碼
		if(!isloading){
			
			appendData(GAME);
		}
	}
});
})
	


function getColumn(data){
	return `
	
			<div class="col">
			<a href="${data.channel.url}" target="_blank">
			<div class="preview">
				
				<img src="${data.preview.medium}" alt="preview" onload="this.style.opacity=1">
			</div>
			<div class="botton">
				<div class="avatar">
					<img src="${data.channel.logo}" alt="avatar" />
				</div>
				<div class="info">
					<div class="cname" title="${data.channel.status}">${data.channel.status}</div>
					<div class="ower_name">${data.channel.display_name}</div>
				</div>
			</div>
			</a>
		</div>
		
`
}





