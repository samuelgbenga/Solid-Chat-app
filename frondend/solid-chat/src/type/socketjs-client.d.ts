declare module 'sockjs-client/dist/sockjs' {
    // You can import types from the main SockJS client module if they exist
    import { SockJS as OriginalSockJS } from 'sockjs-client';
  
    export default OriginalSockJS;
  }