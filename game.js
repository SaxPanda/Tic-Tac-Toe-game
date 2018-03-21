//. game.js
$(function(){
    let s=new Audio('Eminem - Without Me Instrumental.mp3');
   		s.play();
		var bFirstPlay = true;
		var nextPlayer = '';
		var board = [['','',''],
					['','',''],
					['','',''] ];
					var nPlays = 0;
					var bWinner = false;

		$('#PvsP').click(function(){
		window.location = 'board.html'; 
		localStorage.setItem('gameType', 'HUMAN');
	})
	$('#PvsC').click(function(){
		window.location = 'board.html'; 
		localStorage.setItem('gameType', 'COMPUTER');
	})
	$('.board div').click(function(){
		if (bFirstPlay) {
			var j = 1 + Math.floor(Math.random()*2);
			 nextPlayer = (j == 1 ? 'X': 'O');
			bFirstPlay = false;
		}
		var idx = $('div').index(this);
		var row = (idx <= 3 ? 0 : (idx <= 6 ? 1 : 2)); 
		var col = idx - ( (row * 3) + 1);

		if (board[row][col].length < 1) {
			$(this).text(nextPlayer);
			
			board[row][col] = nextPlayer;
			nPlays++;
			
			if (!chkWhoWin()){
				if (localStorage.getItem('gameType') == 'COMPUTER') {
					AI(nextPlayer);
					chkWhoWin();
				}
			}
		
		}
	})
	var chkWinner = function(c) {
		var bWinner = false;
		for(col = 0; col < 3; col++)
			if ( (board[0][col]== c) &&
				(board[1][col]== c) &&
				(board[2][col]== c) ) { 
					bWinner = true;
					break;
				}
		for(row = 0; row < 3; row++)
			if ( (board[row][0]== c) &&
				(board[row][1]== c) &&
				(board[row][2]== c) ) { 
					bWinner = true;
					
				}
		if ( (board[0][0] == c) &&
		(board[1][1] == c) &&
		(board[2][2] == c) ) { 
			bWinner = true;
		}
		if ( (board[0][2] == c) &&
		(board[1][1] == c) &&
		(board[2][0] == c) ) { 
			bWinner = true;
		}
		return (bWinner);
	}
	var AI = function(p){
		var play = 0;
		var truePlay = false;
		while (!truePlay){
			play = 1 + Math.floor(Math.random() * 9);

			var row = (play <= 3 ? 0 : (play <= 6 ? 1:2));
			var col = play - ( (row * 3)+ 1);
			if (board[row][col].length ==0 ){
				board[row][col] = p;
				$('div').eq(play).text(p);
				nPlays++;
				truePlay = true;
			}
		}
	}
	var chkWhoWin = function(){
		//setTimeout(function(){
			//bWinner = chkWinner(nextPlayer);
			
			if (chkWinner(nextPlayer)) {
				setTimeout(function(){
				alert('The BIG Winner is ...'+ nextPlayer);
				},1);
				window.location = "board.html";
				return true;
			}
		//}, 1);
		//setTimeout(function(){
			nextPlayer = (nextPlayer == 'X' ? 'O' : 'X');

			if ((nPlays == 9) ) {
				alert('DRAW - Nobody wins!!');
				window.location = "board.html";
				return true;
			}
		//}, 1);

		return false;
	}
})








