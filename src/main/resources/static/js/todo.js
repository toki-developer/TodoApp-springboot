/**
 *
 */
$(function(){

//完了済みの個数取得・表示
  let doneCount = $('#donetodes').children("tr").length;
  $('#done_count').text(doneCount);

//更新処理
$('.todo input').change(function(){
	const todo = $(this).parents('.todo');
	const id = todo.find('input[name="id"]');
	const title = todo.find('input[name="title"]');
	const timeLimit = todo.find('input[name="time_limit"]');
	const isDone = todo.find('input[name="done_flg"]').prop("checked");
	let doneFlg;
	if(isDone == true) {
	  doneFlg = 1;
	}else{
	  doneFlg = 0;
	}

	const params = {
		id : id.val(),
		title : title.val(),
		time_limit : timeLimit.val(),
		done_flg : doneFlg
	}
	$.post("/update",params);

    //完了ボタンを押した際の処理
    doneCount =  $('#done_count').text();

	if($(this).prop('name') == "done_flg"){
	  if(isDone == true){
	    $(todo).appendTo('#donetodes');
	    todo.find('input[name="title"]').css('text-decoration','line-through')
	    todo.find('input[name="time_limit"]').hide();
	    doneCount ++;
	  }else{
	    $(todo).appendTo('#todes');
	    todo.find('input[name="title"]').css('text-decoration','none')
	    todo.find('input[name="time_limit"]').show()
	    doneCount --;
	  }

	  $("#done_count").text(doneCount);
	}


})

//完了済みタスク表示/非表示切り替え
$('.button_for_show').click(function(){
    let showState = $('#done_table').css('display');
    if(showState == "none") {
        $('#done_table').show();
        $(this).css({ transform: ' rotate(225deg)','bottom':'-4px' });
    }else{
        $('#done_table').hide();
        $(this).css({ transform: ' rotate(45deg)','bottom':'4px' });
    }
})

//追加処理
$('#add').click(function() {
    const params = $('#add_form').serializeArray();
    $.post("/add",params).done(function(json){
        const clone = $('#todes tr:first').clone(true);
        clone.find('input[name="id"]').val(json.id);
        clone.find('input[name="title"]').val(json.title);
        clone.find('input[name="time_limit"]').val(json.time_limit);
        $('#todes').append(clone[0]);
    })
})

//削除処理
$('#delete').click(function(){
    $.post("/delete").done(function(){
        $('#donetodes').empty();
        $('#done_count').text(0);
    })
})


})