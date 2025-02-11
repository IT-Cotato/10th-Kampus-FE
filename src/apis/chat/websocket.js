// import SockJS from 'sockjs-client';
// import Stomp from 'stompjs';

// const BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const SOCKET_URL = `${BASE_URL}/websocket`;

// let stompClient;

// export const connectSocket = (token, onMessageReceived) => {
//   const socket = new SockJS(SOCKET_URL);
//   stompClient = Stomp.over(socket);

//   stompClient.connect(
//     { Authorization: `Bearer ${token}` }, //인증
//     (frame) => {
//       console.log('서버에 연결됨:', frame);
//       stompClient.subscribe('/topic/messages', (message) => {
//         console.log('메시지 수신:', message.body);
//         // 메시지 처리 로직 추가
//       });
//     },
//     (error) => {
//       console.error('연결 오류:', error);
//     },
//   );
// };

// export const sendMessage = (message) => {
//   if (stompClient) {
//     stompClient.send('/app/send', {}, JSON.stringify(message));
//     console.log('메시지 전송:', message);
//   } else {
//     console.error('소켓이 연결되어 있지 않습니다.');
//   }
// };

// export const disconnectSocket = () => {
//   if (stompClient) {
//     stompClient.disconnect();
//     console.log('소켓 연결 종료');
//   }
// };
