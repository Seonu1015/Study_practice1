package com.example.ex02;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Adapter;
import android.widget.BaseAdapter;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {
    List<ProductVO> array;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        getSupportActionBar().setTitle("연습1");
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        //데이터 생성
        array = new ArrayList<>();
        ProductVO vo = new ProductVO(1,"로지텍 G304", R.drawable.i01, 35000);
        array.add(vo);
        vo = new ProductVO(2,"엘지클릭커 움직이는 마카롱", R.drawable.i02, 8900);
        array.add(vo);
        vo = new ProductVO(3,"제닉스 TITAN GX AIR", R.drawable.i03, 37900);
        array.add(vo);
        vo = new ProductVO(4,"맥스틸 TRON G10 PRO", R.drawable.i04, 32900);
        array.add(vo);

        System.out.println("데이터갯수" + array.size());

        // 어댑터 생성
        MyAdapter adapter = new MyAdapter();

        ListView list = findViewById(R.id.list);
        list.setAdapter(adapter);
    }

    //어댑터 생성
    public class MyAdapter extends BaseAdapter{

        @Override
        public int getCount() {
            return array.size();
        }

        @Override
        public Object getItem(int position) {
            return null;
        }

        @Override
        public long getItemId(int position) {
            return 0;
        }

        @Override
        public View getView(int position, View convertView, ViewGroup parent) {
            RelativeLayout layout = (RelativeLayout) getLayoutInflater().inflate(R.layout.item, parent, false);
            ProductVO vo = array.get(position);
            ImageView photo = layout.findViewById(R.id.photo);
            photo.setImageResource(vo.getPhoto());
            TextView name = layout.findViewById(R.id.name);
            name.setText(vo.getName());
            TextView price = layout.findViewById(R.id.price);
            DecimalFormat df = new DecimalFormat("#,###원");
            price.setText(df.format(vo.getPrice()));

            Button btn = layout.findViewById(R.id.btn);
            btn.setOnClickListener(new View.OnClickListener() {

                @Override
                public void onClick(View v) {
                    Toast.makeText(MainActivity.this, vo.getName() + " 상품을 주문합니다.", Toast.LENGTH_SHORT).show();
                }
            });

            layout.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent intent = new Intent(MainActivity.this, MainActivity3.class);
                    intent.putExtra("name", vo.getName());
                    intent.putExtra("price", vo.getPrice());
                    intent.putExtra("photo", vo.getPhoto());
                    startActivity(intent);
                }
            });
            return layout;
        }
    } // onCreate

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        if(item.getItemId() == android.R.id.home) {
            finish();
        }
        return super.onOptionsItemSelected(item);
    }
} // Activity