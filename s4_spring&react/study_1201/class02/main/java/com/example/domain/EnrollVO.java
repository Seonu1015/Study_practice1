package com.example.domain;

public class EnrollVO {
	private String lcode;
	private String scode;

	public String getLcode() {
		return lcode;
	}

	public void setLcode(String lcode) {
		this.lcode = lcode;
	}

	public String getScode() {
		return scode;
	}

	public void setScode(String scode) {
		this.scode = scode;
	}

	@Override
	public String toString() {
		return "EnrollVO [lcode=" + lcode + ", scode=" + scode + "]";
	}

}
