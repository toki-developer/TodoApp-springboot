package com.todo.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.todo.app.entity.Todo;
import com.todo.app.mapper.TodoMapper;

@Controller
public class TodoController {

	@Autowired
	TodoMapper todoMapper;

	@RequestMapping(value="/")
	public String index(Model model) {

//		List<Todo> list = todoMapper.selectAll();

		List<Todo> list = todoMapper.selectIncomplete();
		List<Todo> doneList = todoMapper.selectComplete();
		model.addAttribute("todos",list);
		model.addAttribute("doneTodos",doneList);

		return "index";
	}

	@RequestMapping(value="/add")
	@ResponseBody
	public Todo add(Todo todo) {
		todoMapper.add(todo);
		return todo;
	}

	@RequestMapping(value="/update")
	@ResponseBody
	public void update(Todo todo) {
		todoMapper.update(todo);
	}

	@RequestMapping(value="/delete")
	@ResponseBody
	public void delete() {
		todoMapper.delete();
	}

}
