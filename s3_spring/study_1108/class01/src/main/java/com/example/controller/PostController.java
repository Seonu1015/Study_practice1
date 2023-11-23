package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PostController {
	@GetMapping("/posts")
	public String list(Model model) {
		model.addAttribute("pageName","posts/list"); // (변수명, 경로)
		return "home";
	}
	
}
