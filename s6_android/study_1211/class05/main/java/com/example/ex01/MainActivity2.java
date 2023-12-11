package com.example.ex01;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity2 extends AppCompatActivity {
    int count = 0;
    TextView txtCount, txtFruit;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main2);

        getSupportActionBar().setTitle("연습2");
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        getSupportActionBar().setTitle("클릭연습");

        txtCount = findViewById(R.id.count);
        txtFruit = findViewById(R.id.fruit);

        findViewById(R.id.btnin).setOnClickListener(onClick);
        findViewById(R.id.btnde).setOnClickListener(onClick);

        findViewById(R.id.btnin).setOnLongClickListener(onLongClick);
        findViewById(R.id.btnde).setOnLongClickListener(onLongClick);

        findViewById(R.id.btnApple).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                txtFruit.setText("사과");
            }
        });

        findViewById(R.id.btnOrange).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                txtFruit.setText("오렌지");
            }
        });
    }

    View.OnClickListener onClick = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            if(v.getId() == R.id.btnin) {
                count++;
            } else {
                count--;
            }
            txtCount.setText(String.valueOf(count));
        }
    };

    View.OnLongClickListener onLongClick = new View.OnLongClickListener() {
        @Override
        public boolean onLongClick(View view) {
            if(view.getId() == R.id.btnin) {
                count = 100;
            } else {
                count = 0;
            }
            txtCount.setText(String.valueOf(count));
            return true; // 롱클릭만 하고 싶으면 true로 변경 ( false인 경우 롱클릭이랑 그냥 클릭이 같이 실행 )
        }
    };

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.main, menu);
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        if(item.getItemId() == R.id.jjajang) {
            Toast.makeText(this, "짜장면 완전 맛있음", Toast.LENGTH_SHORT).show();
        } else if(item.getItemId() == R.id.jjambbong) {
            Toast.makeText(this, "여기 짬뽕 최고!", Toast.LENGTH_SHORT).show();
        } else if(item.getItemId() == R.id.udong) {
            Toast.makeText(this, "우동 국물이 너무 맛있음", Toast.LENGTH_SHORT).show();
        } else if(item.getItemId() == R.id.mandoo) {
            Toast.makeText(this, "직접 만두처럼 속이 꽉 차있음", Toast.LENGTH_SHORT).show();
        } else if(item.getItemId() == android.R.id.home) {
            finish();
        }
        return super.onOptionsItemSelected(item);
    }


}