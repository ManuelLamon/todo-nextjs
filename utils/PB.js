import PocketBase from 'pocketbase';

const PB = new PocketBase('http://127.0.0.1:8090');
PB.autoCancellation(false)
export default PB