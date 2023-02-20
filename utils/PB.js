import PocketBase from 'pocketbase';

const PB = new PocketBase(process.env.API);
PB.autoCancellation(false)
export default PB