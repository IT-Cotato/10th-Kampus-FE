package com.cotato.kampus;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    private WebView webView;
    private static final String TAG = "MainActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        webView = findViewById(R.id.webview);  // WebView 아이디로 웹뷰를 찾음

        // 공통 WebView 설정
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
        webView.getSettings().setSupportMultipleWindows(true);
        // WebViewClient 설정 (리디렉션 및 Intent URI 처리)
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Log.d(TAG, request.getUrl().toString());

                // localhost나 127.0.0.1을 자동으로 10.0.2.2로 변경
                String url = request.getUrl().toString();
                url = replaceLocalhostWithIP(url);
                // 변환된 URL을 다시 로드
                view.loadUrl(url);

                // 카카오 로그인이 끝나면 리디렉션 URL로 돌아오는 과정에서 `intent` 처리
                if (request.getUrl().getScheme().equals("intent")) {
                    try {
                        Intent intent = Intent.parseUri(request.getUrl().toString(), Intent.URI_INTENT_SCHEME);

                        // 실행 가능한 앱이 있다면 그 앱을 실행
                        if (intent.resolveActivity(getPackageManager()) != null) {
                            startActivity(intent);
                            Log.d(TAG, "ACTIVITY: " + intent.getPackage());
                            return true;
                        }

                        // Fallback URL 처리 (앱 실행 불가 시)
                        String fallbackUrl = intent.getStringExtra("browser_fallback_url");
                        if (fallbackUrl != null) {
                            view.loadUrl(fallbackUrl);
                            Log.d(TAG, "FALLBACK: " + fallbackUrl);
                            return true;
                        }

                        Log.e(TAG, "Could not parse anything");

                    } catch (Exception e) {
                        Log.e(TAG, "Invalid intent request", e);
                    }
                }

                // 그 외의 URL은 기본 WebView로 로딩
                return false;
            }
        });
        // 초기 URL 로드
        webView.loadUrl("http://10.0.2.2:3000/");
        // 안드로이드 시뮬레이터에선 localhost(127.0.0.1)이 아닌 localhost(10.0.2.2)로 변경해줘야 함
    }
    // localhost나 127.0.0.1을 10.0.2.2로 변환하는 함수
    private String replaceLocalhostWithIP(String url) {
        return url.replace("localhost", "10.0.2.2").replace("127.0.0.1", "10.0.2.2");
    }
}
