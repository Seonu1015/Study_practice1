package com.example.a08;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;

public class MainActivity extends AppCompatActivity {
    EditText email, password;
    FirebaseAuth mAuth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mAuth = FirebaseAuth.getInstance();

        getSupportActionBar().setTitle("로그인");
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        email = findViewById(R.id.email);
        password = findViewById(R.id.password);

        findViewById(R.id.btnJoin).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String strEmail = email.getText().toString();
                String strPassword = password.getText().toString();

                if(!strEmail.contains("@")) {
                    Toast.makeText(MainActivity.this, "이메일 형식으로 입력하여야 합니다.", Toast.LENGTH_SHORT).show();
                } else if (strPassword.length() < 8) {
                    Toast.makeText(MainActivity.this, "비밀번호는 8자리 이상이어야 합니다.", Toast.LENGTH_SHORT).show();
                } else {
                    mAuth.createUserWithEmailAndPassword(strEmail, strPassword)
                            .addOnCompleteListener(new OnCompleteListener<AuthResult>() {
                                @Override
                                public void onComplete(@NonNull Task<AuthResult> task) {
                                    if(task.isSuccessful()) {
                                        Toast.makeText(MainActivity.this, "가입 성공!!", Toast.LENGTH_SHORT).show();
                                    } else { // 이메일이 중복됐을 때 가입 실패
                                        Toast.makeText(MainActivity.this, "가입 실패...", Toast.LENGTH_SHORT).show();
                                    }
                                }
                            });
                }
            }
        });

        findViewById(R.id.btnLogin).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String strEmail = email.getText().toString();
                String strPassword = password.getText().toString();

                mAuth.signInWithEmailAndPassword(strEmail, strPassword)
                        .addOnCompleteListener(new OnCompleteListener<AuthResult>() {
                            @Override
                            public void onComplete(@NonNull Task<AuthResult> task) {
                                if(task.isSuccessful()) {
                                    Toast.makeText(MainActivity.this, "로그인 성공!!", Toast.LENGTH_SHORT).show();
                                    Intent intent = new Intent(MainActivity.this, ShopActivity.class);
                                    startActivity(intent);
                                } else { // 이메일이나 비밀번호가 틀린 경우
                                    Toast.makeText(MainActivity.this, "로그인 실패...", Toast.LENGTH_SHORT).show();
                                }
                            }
                        });

            }
        });
    } // onCreate

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        if(item.getItemId() == android.R.id.home) {
            finish();
        }
        return super.onOptionsItemSelected(item);
    }
}