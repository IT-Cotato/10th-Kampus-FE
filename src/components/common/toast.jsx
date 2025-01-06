import { ToastContainer } from 'react-toastify';

const Toast = () => {
  return (
    <>
      <ToastContainer
        position="bottom-center" // 알람 위치 지정
        autoClose={2000} // 자동 off 시간
        hideProgressBar={true} // 진행시간바 숨김
        closeOnClick // 클릭으로 알람 닫기
        pauseOnFocusLoss // 화면을 벗어나면 알람 정지
        // draggable // 드래그 가능
        theme="light"
        limit={1} // 알람 개수 제한
        className={`flex items-center w-max`}
      />
    </>
  );
};

export default Toast;
