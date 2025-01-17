import WebKit
class ViewController: UIViewController, WKUIDelegate, WKNavigationDelegate {

    // 웹뷰 목록 관리
    var webViews = [WKWebView]()
    var mainWebView: WKWebView! // 메인 WebView
    override func viewDidLoad() {
            super.viewDidLoad()

            // WebView 초기화
            let configuration = WKWebViewConfiguration()
            mainWebView = WKWebView(frame: self.view.bounds, configuration: configuration)
            mainWebView.uiDelegate = self
            mainWebView.navigationDelegate = self

            // WebView 화면에 추가
            self.view.addSubview(mainWebView)
            self.webViews.append(mainWebView)

            // 초기 URL 로드 (테스트용)
            if let url = URL(string: "http://localhost:3000") {
                let request = URLRequest(url: url)
                mainWebView.load(request)
            }
        }
    /// ---------- 팝업 열기 ----------
    /// - 카카오 JavaScript SDK의 로그인 기능은 popup을 이용합니다.
    /// - window.open() 호출 시 별도 팝업 webview가 생성되어야 합니다.
    ///
    func webView(_ webView: WKWebView,
                 createWebViewWith configuration: WKWebViewConfiguration,
                 for navigationAction: WKNavigationAction,
                 windowFeatures: WKWindowFeatures
    ) -> WKWebView? {
        guard let frame = self.webViews.last?.frame else {
            return nil
        }

        // 웹뷰를 생성하여 리턴하면 현재 웹뷰와 parent 관계가 형성됩니다.
        return createWebView(frame: frame, configuration: configuration)
    }

    /// ---------- 팝업 닫기 ----------
    /// - window.close()가 호출되면 앞에서 생성한 팝업 webview를 닫아야 합니다.
    ///
    func webViewDidClose(_ webView: WKWebView) {
        destroyCurrentWebView()
    }

    // 웹뷰 생성 메서드 예제
    func createWebView(frame: CGRect, configuration: WKWebViewConfiguration) -> WKWebView {
        let webView = WKWebView(frame: frame, configuration: configuration)
        
        // set delegate
        webView.uiDelegate = self
        webView.navigationDelegate = self
                
        // 화면에 추가
        self.view.addSubview(webView)

        // 웹뷰 목록에 추가
        self.webViews.append(webView)

        // 그 외 서비스 환경에 최적화된 뷰 설정하기

        
        return webView
    }

    // 웹뷰 삭제 메서드 예제
    func destroyCurrentWebView() {
        // 웹뷰 목록과 화면에서 제거하기
        self.webViews.popLast()?.removeFromSuperview()
    }

}
