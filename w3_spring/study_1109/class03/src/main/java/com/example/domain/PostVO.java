package com.example.domain;

import java.util.Date;

public class PostVO extends UserVO {
	private int pid;
	private String title;
	private String body;
	private String writer;
	private Date regdate;

	public int getPid() {
		return pid;
	}

	public void setPid(int pid) {
		this.pid = pid;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public String getWriter() {
		return writer;
	}

	public void setWriter(String writer) {
		this.writer = writer;
	}

	public Date getRegedate() {
		return regdate;
	}

	public void setRegedate(Date regedate) {
		this.regdate = regedate;
	}

	@Override
	public String toString() { // 우클릭 소스 > 제너레이트 toString()
		return "PostVO [pid=" + pid + ", title=" + title + ", body=" + body + ", writer=" + writer + ", regdate="
				+ regdate + "]";
	}

}
