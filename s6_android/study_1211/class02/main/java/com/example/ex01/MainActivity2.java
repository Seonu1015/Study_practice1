package com.example.ex01;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

public class MainActivity2 extends AppCompatActivity {
    int count = 0;
    TextView txtCount, txtFruit;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main2);

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
}