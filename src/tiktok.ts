import { WebcastPushConnection } from "tiktok-live-connector";

// Username of someone who is currently live
let tiktokUsername = "mini.gt";

// Create a new wrapper object and pass the username
let tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);

// Connect to the chat (await can be used as well)
tiktokLiveConnection.connect().then(state => {
    console.info(`Connected to roomId ${state.roomId}`);
}).catch(err => {
    console.error('Failed to connect', err);
})

// Define the events that you want to handle
// In this case we listen to chat messages (comments)
tiktokLiveConnection.on('chat', data => {
    // console.log(data)
    console.log(`${data.uniqueId}: ${data.comment}`);
})

// And here we receive gifts sent to the streamer
tiktokLiveConnection.on('gift', data => {
    console.log(`${data.uniqueId} (userId:${data.userId}) sends ${data.giftId}`);
})

tiktokLiveConnection.on('error', err => {
    console.error('Error!', err);
})

tiktokLiveConnection.on('member', data => {
    console.log(`${data.nickname} joins the stream!`);
})

// tiktokLiveConnection.connect().catch(err => console.log(err));

// tiktokLiveConnection.on('chat', data => {
//     if (data.comment.toLowerCase() === '!dice') {
//         let diceResult = Math.ceil(Math.random() * 6);
//         tiktokLiveConnection.sendMessage(`@${data.uniqueId} you rolled a ${diceResult}`).catch(err => console.error(err));
//     }
// })

// ...and more events described in the documentation below