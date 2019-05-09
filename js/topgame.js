function getTop(cb){
//	const client_id = "nutbxp79x8xv2elokn81q6fyrbjpik"; //developer id
   
    var limit = 10;
	var url = 'https://api.twitch.tv/kraken/games/top?client_id=nutbxp79x8xv2elokn81q6fyrbjpik&limit='+ limit;
	
	
	$.ajax({
		url:url ,
		success : function(response) {
		console.log(response);
		cb(null, response);
	}
	})	
}

getTop(function (err, data){
	var top =data.top;
	var $Top = $('.topgames');
	for( var i = 0; i <top.length; i++){
		$Top.append(getGames(top[i]));
	}
	
});

function getGames(data){
	return `
	
			<li class="topgeme-item">
				<a href="#" onClick="changegame('${data.game.name}')">
					<img src="${data.game.box.medium}">
					<br>
					<div class="topgametitle">${data.game.localized_name}</div>
					</a>
				</li>
		
`
}

$(".topgametitle").click(function(){
		//清楚上次点击之后，menu添加的样式
		$(".menu").removeClass("menu_click");
		//添加样式
		$(this).addClass("menu_click");
	});